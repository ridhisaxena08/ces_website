'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getStorage,
  ref,
  list,
  getDownloadURL,
  uploadBytes,
  deleteObject,
  ListResult
} from 'firebase/storage';
import { app } from '@/lib/firebase';
import { Trash2, Upload, Loader2, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const IMAGE_LIMIT = 30;
const PAGE_SIZE = 12;

interface ImageItem {
  url: string;
  path: string;
  loaded: boolean;
  error?: boolean;
  isUploading?: boolean;
}

interface GalleryManagerProps {
  category: string;
}

export function GalleryManager({ category }: GalleryManagerProps) {
  const storage = getStorage(app);

  const [images, setImages] = useState<ImageItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastItem, setLastItem] = useState<any>(null);

  /* ---------------------------------- helpers ---------------------------------- */

  const updateImage = (path: string, updates: Partial<ImageItem>) => {
    setImages(prev =>
      prev.map(img => (img.path === path ? { ...img, ...updates } : img))
    );
  };

  const dedupeByPath = (list: ImageItem[]) => {
    const map = new Map<string, ImageItem>();
    list.forEach(item => map.set(item.path, item));
    return Array.from(map.values());
  };

  /* ----------------------------- lazy image loader ------------------------------ */

  const loadImage = useCallback(
    async (path: string, retry = 0) => {
      try {
        const url = await getDownloadURL(ref(storage, path));
        updateImage(path, { url, loaded: true, error: false });
      } catch (err) {
        if (retry < 2) {
          setTimeout(() => loadImage(path, retry + 1), 1000);
          return;
        }
        updateImage(path, { error: true, loaded: false });
      }
    },
    [storage]
  );

  /* ------------------------------- list images --------------------------------- */

  const loadImages = async (loadMore = false) => {
    try {
      loadMore ? setLoadingMore(true) : setIsLoading(true);

      const storageRef = ref(storage, `gallery/${category}`);
      let result: ListResult;

      if (loadMore && lastItem) {
        result = await list(storageRef, {
          maxResults: PAGE_SIZE,
          startAfter: lastItem
        });
      } else {
        result = await list(storageRef, { maxResults: PAGE_SIZE });
      }

      if (result.items.length === 0) {
        setHasMore(false);
        return;
      }

      if (result.items.length === PAGE_SIZE) {
        setLastItem(result.items[result.items.length - 1]);
      } else {
        setHasMore(false);
      }

      const newItems: ImageItem[] = result.items.map(item => ({
        path: item.fullPath,
        url: '',
        loaded: false,
        error: false
      }));

      setImages(prev =>
        dedupeByPath(loadMore ? [...prev, ...newItems] : newItems)
      );

      // load first 4 immediately
      result.items.slice(0, 4).forEach(item => {
        loadImage(item.fullPath);
      });
    } catch (e) {
      console.error(e);
      toast.error('Failed to load images');
    } finally {
      loadMore ? setLoadingMore(false) : setIsLoading(false);
    }
  };

  /* ---------------------------------- upload ----------------------------------- */

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const existingPaths = new Set(images.map(i => i.path));
    const newFiles = Array.from(files).filter(
      f => !Array.from(existingPaths).some(p => p.includes(f.name))
    );

    if (images.length + newFiles.length > IMAGE_LIMIT) {
      toast.error(`Maximum ${IMAGE_LIMIT} images allowed`);
      return;
    }

    setIsUploading(true);

    const placeholders: ImageItem[] = newFiles.map(file => ({
      path: `gallery/${category}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`,
      url: '',
      loaded: false,
      error: false,
      isUploading: true
    }));

    setImages(prev => [...placeholders, ...prev]);

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      const path = placeholders[i].path;

      try {
        const fileRef = ref(storage, path);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);

        updateImage(path, {
          url,
          loaded: true,
          error: false,
          isUploading: false
        });
      } catch (err) {
        updateImage(path, { error: true, isUploading: false });
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setIsUploading(false);
    e.target.value = '';
    toast.success('Upload completed');
  };

  /* ---------------------------------- delete ----------------------------------- */

  const handleDelete = async (path: string) => {
    if (!confirm('Delete this image?')) return;

    try {
      await deleteObject(ref(storage, path));
      setImages(prev => prev.filter(i => i.path !== path));
      toast.success('Image deleted');
    } catch {
      toast.error('Failed to delete image');
    }
  };

  /* ----------------------------- infinite scroll ------------------------------- */

  const handleScroll = useCallback(() => {
    if (loadingMore || !hasMore) return;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
      loadImages(true);
    }
  }, [loadingMore, hasMore]);

  useEffect(() => {
    loadImages();
  }, [category]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ---------------------------------- render ----------------------------------- */

  if (isLoading) {
    return (
      <div className="flex justify-center h-64 items-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

return (
    <div className="max-h-screen">
      <div className="max-w-screen mx-auto px-0 py-0">
        {/* Header */}
        <div className="flex items-center justify-between pb-8 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
              {category.replace('-', ' ')}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {images.length} {images.length === 1 ? 'image' : 'images'}
            </p>
          </div>

          <label className="cursor-pointer px-6 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              disabled={isUploading}
              onChange={handleUpload}
            />
            {isUploading ? 'Uploading...' : 'Upload Images'}
          </label>
        </div>

        {/* Empty State */}
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-900 font-medium mb-1">No images yet</p>
            <p className="text-sm text-gray-500">Upload your first image to get started</p>
          </div>
        ) : (
          /* Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-8">
            {images.map(img => (
              <div
                key={img.path}
                className="relative group aspect-square bg-gray-50 overflow-hidden"
              >
                {/* Loading State */}
                {!img.loaded && !img.error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <Loader2 className="animate-spin h-5 w-5 text-gray-400" />
                  </div>
                )}

                {/* Error State */}
                {img.error ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <AlertCircle className="h-6 w-6 mb-2" />
                    <button
                      className="text-xs text-gray-600 hover:text-gray-900 underline"
                      onClick={() => loadImage(img.path)}
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  img.url && (
                    <img
                      src={img.url}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      alt=""
                    />
                  )
                )}

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(img.path)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-white"
                  aria-label="Delete image"
                >
                  <Trash2 className="h-4 w-4 text-gray-700" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Load More Indicator */}
        {loadingMore && (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
}

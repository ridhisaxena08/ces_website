import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { useState, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  effect?: 'blur' | 'opacity' | 'black-and-white';
  placeholder?: React.ReactNode;
}

export function LazyImage({
  src,
  alt,
  className = '',
  width = '100%',
  height = '100%',
  effect = 'opacity',
  placeholder,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  // Check if this is a campus page image that should bypass cache
  const isCampusImage = src.toLowerCase().includes('campus') || 
                       src.toLowerCase().includes('campusbuilding') || 
                       src.toLowerCase().includes('campus-building') ||
                       src.toLowerCase().includes('campus/building') ||
                       (typeof window !== 'undefined' && window.location.pathname.toLowerCase().includes('campus'));
  
  // Skip cache for campus images
  const skipCache = isCampusImage;
  
  // Create a stable cache key that changes only when the src changes
  const cacheKey = `image-cache-${btoa(src)}`;
  
  // Try to get the image from cache first (only if not skipping cache)
  const [cachedUrl, setCachedUrl] = useState<string | null>(null);
  
  // Clear any existing cache for campus images on mount
  useEffect(() => {
    if (isCampusImage && typeof window !== 'undefined') {
      try {
        localStorage.removeItem(cacheKey);
      } catch (e) {
        console.warn('Failed to clear image cache', e);
      }
    }
  }, [isCampusImage, cacheKey]);

  // Preload the image in the background
  useEffect(() => {
    if (!src) return;
    
    // For campus images, never use cache
    if (isCampusImage) {
      const img = new Image();
      const timestamp = Date.now();
      const separator = src.includes('?') ? '&' : '?';
      const imageUrl = `${src}${separator}_nc=${timestamp}-${Math.floor(Math.random() * 1000)}`;
      
      img.onload = () => setCachedUrl(imageUrl);
      img.onerror = () => setCachedUrl(src); // Fallback to original src if load fails
      img.src = imageUrl;
      
      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }
    
    // For non-campus images, use the cache if available
    if (cachedUrl) return;
    
    // Try to get from cache first for non-campus images
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setCachedUrl(cached);
        return;
      }
    } catch (e) {
      console.warn('Failed to read from cache', e);
    }
    
    // If no cache, load fresh and cache it
    const img = new Image();
    const timestamp = Date.now();
    const separator = src.includes('?') ? '&' : '?';
    const imageUrl = `${src}${separator}t=${timestamp}`;
    
    img.src = imageUrl;
    
    // When image loads, cache its URL if not skipping cache
    const onLoad = () => {
      if (!skipCache) {
        try {
          // Store the actual URL in localStorage for future use
          localStorage.setItem(cacheKey, imageUrl);
          setCachedUrl(imageUrl);
        } catch (e) {
          // In case of quota exceeded or other errors, just continue
          console.warn('Failed to cache image URL', e);
        }
      } else {
        // If skipping cache, just update the URL without caching
        setCachedUrl(imageUrl);
      }
    };
    
    img.addEventListener('load', onLoad);
    
    return () => {
      img.removeEventListener('load', onLoad);
    };
  }, [src, cacheKey, cachedUrl, skipCache]);
  
  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  // Handle image error
  const handleError = () => {
    setIsError(true);
    setIsLoaded(true);
  };
  
  // Use the cached URL if available, otherwise use the original src
  const imageUrl = cachedUrl || src;

  // If there was an error loading the image, show a placeholder
  if (isError) {
    return (
      <div 
        className={`${className} bg-gray-100 flex items-center justify-center`}
        style={{ width, height }}
      >
        <span className="text-gray-400">Image not available</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Lazy loaded image */}
      <LazyLoadImage
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        effect={effect}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        placeholder={placeholder || (
          <div className="w-full h-full bg-gray-100 animate-pulse"></div>
        )}
      />
      
      {/* Loading indicator (only shows while loading) */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
}

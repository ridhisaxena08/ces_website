import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useCallback } from 'react';

interface ImageViewerProps {
  images: Array<{ id: string; url: string; name?: string }>;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ImageViewer({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ImageViewerProps) {
  const currentImage = images[currentIndex];

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    // Prevent scrolling when viewer is open
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!currentImage) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        aria-label="Close"
      >
        <X className="w-8 h-8" />
      </button>

      <button
        onClick={onPrev}
        className="absolute left-4 text-white hover:text-gray-300 p-2 z-10"
        disabled={currentIndex === 0}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <img
          src={currentImage.url}
          alt={currentImage.name || 'Gallery image'}
          className="max-w-full max-h-[90vh] object-contain"
        />
      </div>

      <button
        onClick={onNext}
        className="absolute right-4 text-white hover:text-gray-300 p-2 z-10"
        disabled={currentIndex === images.length - 1}
        aria-label="Next image"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}

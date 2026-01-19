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
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  // Always bypass cache for all images
  useEffect(() => {
    if (!src) return;
    
    // Create a completely fresh URL with timestamp and random number
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const separator = src.includes('?') ? '&' : '?';
    const newUrl = `${src}${separator}_nc=${timestamp}-${random}`;
    
    setImageUrl(newUrl);
    
    // Clear any cached versions in localStorage
    if (typeof window !== 'undefined') {
      const cacheKey = `image-cache-${btoa(src)}`;
      try {
        localStorage.removeItem(cacheKey);
      } catch (e) {
        console.warn('Failed to clear image cache', e);
      }
    }
  }, [src]);

  // Handle image loading
  useEffect(() => {
    if (!imageUrl) return;
    
    const img = new Image();
    
    const onLoad = () => {
      setIsLoaded(true);
      setIsError(false);
    };
    
    const onError = () => {
      setIsError(true);
      setIsLoaded(true);
      
      // If the cache-busted URL fails, try the original URL as fallback
      if (imageUrl !== src) {
        setImageUrl(src);
      }
    };
    
    img.onload = onLoad;
    img.onerror = onError;
    img.src = imageUrl;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl, src]);

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
    <div className="relative" style={{ width, height }}>
      <LazyLoadImage
        src={imageUrl || src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        width="100%"
        height="100%"
        effect={effect}
        placeholder={placeholder}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsError(true);
          setIsLoaded(true);
        }}
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

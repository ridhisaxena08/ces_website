import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Button } from '@/app/components/Button';

interface Stat {
  value: string;
  label: string;
  targetValue?: number;
}

interface InfoBlockProps {
  title: string;
  description: string;
  image: string;
  imageOnLeft?: boolean;
  stats?: Stat[];
  ctaText?: string;
  onCtaClick?: () => void;
}

export function InfoBlock({ 
  title, 
  description, 
  image, 
  imageOnLeft = false,
  stats: initialStats,
  ctaText,
  onCtaClick
}: InfoBlockProps) {
  const [stats, setStats] = useState<Stat[]>(() => 
    initialStats?.map(stat => ({
      ...stat,
      targetValue: Number(stat.value.replace(/\D/g, '')) || 0
    })) || []
  );
  const [opacity, setOpacity] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        startAnimation();
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
const startAnimation = () => {
  const duration = 2000; // 2 seconds
  const startTime = performance.now();

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    
    setOpacity(easeOut);

    setStats(prevStats => 
      prevStats.map(stat => {
        if (!stat.targetValue) return stat;
        
        const currentValue = Math.min(
          Math.ceil(stat.targetValue * easeOut), 
          stat.targetValue
        );
        
        // Handle different number formats
        let displayValue = currentValue.toString();
        if (stat.value.includes('%')) {
          displayValue = `${currentValue}%`; // Keep the % sign
        } else if (stat.value.endsWith('+')) {
          displayValue = `${currentValue}+`; // Add + at the end
        } else if (stat.targetValue >= 1000) {
          displayValue = `${(currentValue / 1000).toFixed(1)}K`; // Format as K
          if (stat.value.endsWith('+')) {
            displayValue += '+'; // Add + if original had it
          }
        }
        
        return {
          ...stat,
          value: displayValue
        };
      })
    );

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

// Update the initial state to handle special characters
useState<Stat[]>(() => 
  initialStats?.map(stat => {
    // Extract numeric value, handling both % and + signs
    const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
    return {
      ...stat,
      targetValue: isNaN(numericValue) ? 0 : numericValue
    };
  }) || []
);

  return (
    <section className={`py-20 ${imageOnLeft ? 'bg-secondary/30' : 'bg-background'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${imageOnLeft ? 'lg:flex-row-reverse' : ''}`}>
          {/* Image */}
          <div className={`${imageOnLeft ? 'lg:order-1' : 'lg:order-2'} order-1`}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src={image}
                alt={title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className={`${imageOnLeft ? 'lg:order-2' : 'lg:order-1'} order-2`}>
            <h2 className="text-3xl md:text-4xl mb-6">{title}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>
            
            {stats.length > 0 && (
              <div 
                ref={statsRef}
                className="grid grid-cols-2 gap-6 mb-8"
                style={{ opacity, transition: 'opacity 0.5s ease-out' }}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-3xl text-primary mb-2 font-medium">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* CTA Button - Centered below content */}
        {ctaText && (
          <div className="flex justify-center mt-12">
            <Button 
              variant="primary" 
              size="lg"
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
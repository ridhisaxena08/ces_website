import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Button } from '@/app/components/Button';

interface InfoBlockProps {
  title: string;
  description: string;
  image: string;
  imageOnLeft?: boolean;
  stats?: Array<{ value: string; label: string }>;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function InfoBlock({ 
  title, 
  description, 
  image, 
  imageOnLeft = false,
  stats,
  ctaText,
  onCtaClick
}: InfoBlockProps) {
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
            
            {stats && (
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-3xl text-primary mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
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
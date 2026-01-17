import { Button } from '@/app/components/Button';
import heroBackgroundImage from '@/assets/913d3c39d4c7db6726a8aa11fdf554828e5eefc2.png';

interface HeroSectionProps {
  onApplyClick: () => void;
}

export function HeroSection({ onApplyClick }: HeroSectionProps) {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs');
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img
          src={heroBackgroundImage}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
            Igniting Futures: Where Women Lead in Tech and Beyond
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join a community dedicated to academic excellence, innovation, and personal growth. 
            Discover programs designed to shape your future and unlock your potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={onApplyClick}
            >
              Apply Now
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={scrollToPrograms}
            >
              Explore Programs
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
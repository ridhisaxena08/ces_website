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
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
            <div className="bg-primary/80 p-6 rounded-lg">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">IIT BS Degree</h2>
              <p className="text-sm md:text-base mb-6">
                A comprehensive 4-year, full-time, on-campus academic program tailored for students enrolled in IIT BS Degrees. 
                It provides an immersive residential campus environment, well-structured classroom instruction, dedicated mentorship, 
                and scholarship opportunities, led by distinguished faculty from IITs, IISc, NITs, IIITs, and Central Universities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={onApplyClick}
                  className="w-full sm:w-auto"
                >
                  Apply Now
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={scrollToPrograms}
                  className="w-full sm:w-auto"
                >
                  Explore Programs
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-left">
            <h1 className="text-3xl md:text-3xl font-bold">
              Igniting Futures: <br/>
              <span className="text-1xl md:text-2xl font-bold">
                Where Women Lead in Tech and Beyond
              </span>
            </h1>
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
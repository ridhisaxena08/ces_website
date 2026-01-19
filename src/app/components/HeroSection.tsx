import { Button } from '@/app/components/Button';
import { useEffect, useState } from 'react';
import datascience from '@/assets/dss.png';
import ElectronicSystems from '@/assets/ecc.png';
import IITBS from '@/assets/913d3c39d4c7db6726a8aa11fdf554828e5eefc2.png';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  button1Text: string;
  button2Text: string;
  tagline?: string;
}

const slides: Slide[] = [
  {
    id: 0,
    image: IITBS,
    title: 'IIT BS Degree',
    subtitle: 'Comprehensive 4-Year Program',
    description: 'A 4-year, full-time, on-campus program for IIT BS students offering a residential campus experience, structured classes, mentorship, scholarships, and instruction by distinguished faculty from leading institutes.',
    button1Text: 'Apply Now',
    button2Text: 'Explore Programs',
    tagline: 'Igniting Futures: Where Women Lead in Tech and Beyond'
  },
  {
    id: 1,
    image: datascience,
    title: 'BS in Data Science and Applications',
    subtitle: 'Shaping the Future with Data',
    description: 'Acquire expertise in programming, application development, data sciences, and machine learning. Open to candidates from any stream, this program prepares you for high-demand careers in the data-driven economy.',
    button1Text: 'Apply Now',
    button2Text: 'Learn More'
  },
  {
    id: 2,
    image: ElectronicSystems,
    title: 'BS in Electronic Systems',
    subtitle: 'Engineering the Future',
    description: 'Gain fundamental skills to serve industries like Automotive, Consumer Electronics, Space, Mobile, and Medical Electronics. This program includes hands-on lab work at IIT Madras campus for 1-2 weeks every semester.',
    button1Text: 'Apply Now',
    button2Text: 'Program Details'
  }
];

interface HeroSectionProps {
  onApplyClick: () => void;
}

export function HeroSection({ onApplyClick }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs');
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-advance slides every 8 seconds, pause on hover
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 8000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const slide = slides[currentSlide];

  return (
    <section 
      className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden h-[600px] md:h-[700px] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Badge */}
        {slide.tagline && (
          <div className="absolute top-8 right-0 transform translate-x-0 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100">
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white text-base font-semibold px-8 py-3 rounded-l-lg shadow-xl border-l-4 border-yellow-300 animate-pulse">
              {slide.tagline}
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full text-white">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {slide.title}
            </h2>
            
            <p className="text-xl md:text-2xl font-semibold text-white/90">
              {slide.subtitle}
            </p>
            
            <p className="text-base md:text-lg text-white/80 max-w-2xl">
              {slide.description}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                variant="default" 
                size="lg"
                onClick={onApplyClick}
                className="px-6 py-4 text-base font-semibold bg-white text-primary hover:bg-white/90 transition-all"
              >
                {slide.button1Text}
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={scrollToPrograms}
                className="px-6 py-4 text-base font-semibold border-2 border-white text-white hover:bg-white/10 transition-all"
              >
                {slide.button2Text}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Arrows - Top right on mobile, right side on desktop */}
      <div className="absolute top-4 right-4 md:right-4 md:top-1/2 md:-translate-y-1/2 flex flex-row md:flex-col gap-2 z-10">
        <button 
          onClick={prevSlide}
          className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
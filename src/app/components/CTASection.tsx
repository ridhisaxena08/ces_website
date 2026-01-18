import { Button } from '@/app/components/Button';
import { StudentCarousel } from '@/app/components/StudentCarousel';

interface CTASectionProps {
  onApplyClick: () => void;
  onCampusVisitClick: () => void;
}

export function CTASection({ onApplyClick, onCampusVisitClick }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <StudentCarousel />
        
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of students who have transformed their futures through our programs. 
            Take the first step towards excellence today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={onApplyClick}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
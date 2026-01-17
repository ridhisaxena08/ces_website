import { Button } from '@/app/components/Button';
import { Target } from 'lucide-react';

const programs = [
  {
    id: 1,
    title: 'IIT BS Degree',
    description: '(4 Year) Degree From IIT Madras'
  },
  {
    id: 2,
    title: 'BTech (CSE) / BCA.',
    description: '(4 Year) In CSE / AI / ML/ AIDS from RCEW-Jaipur'
  }
];

interface ProgramsListProps {
  onApplyClick: () => void;
}

export function ProgramsList({ onApplyClick }: ProgramsListProps) {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs');
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side - Programs Title */}
          <div className="lg:col-span-4">
            <h2 className="text-4xl md:text-5xl mb-4 text-primary">Programs</h2>
            <p className="text-muted-foreground mb-6">[Dual Degree Opportunity]</p>
            
            <div className="space-y-4">
              <Button 
                variant="primary" 
                size="lg"
                className="bg-[#8B0000] hover:bg-[#6B0000]"
                onClick={scrollToPrograms}
              >
                View Programs
              </Button>
              <Button 
                variant="primary" 
                size="lg"
                className="bg-[#8B0000] hover:bg-[#6B0000] ml-4"
              >
                Fee Structure
              </Button>
            </div>
          </div>
          
          {/* Right Side - Programs List */}
          <div className="lg:col-span-8 space-y-4">
            {programs.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl text-[#8B0000] mb-2">
                    {program.id}. {program.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {program.description}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Apply Now Button */}
            <div className="pt-6">
              <Button 
                variant="primary" 
                size="lg"
                className="w-full sm:w-auto bg-[#8B0000] hover:bg-[#6B0000]"
                onClick={onApplyClick}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import React, { useState } from 'react';
import { GraduationCap, BookOpen, Award, Users, X } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Button } from '@/app/components/Button';
import undergraduateImage from '@/assets/28b64cfdc73d6802ae7a38e4a774525eff6c8df6.png';
import postgraduateImage from '@/assets/74dc0f7305e78772d913437703da520814204c24.png';
import scholarshipImage from '@/assets/aeee36990bd05d4d8e388d9512d690fe8f314931.png';
import researchImage from '@/assets/7b329d37fb942bbac61f4a67afb219919741d643.png';

interface Program {
  icon: any;
  title: string;
  description: string;
  image: string;
  details: string;
  hideImage?: boolean;
}

const programs: Program[] = [
  {
    icon: GraduationCap,
    title: 'Undergraduate Programs',
    description: 'Comprehensive degree programs designed to build strong foundations in your chosen field with expert faculty and modern facilities.',
    image: undergraduateImage,
    details: 'Our undergraduate programs offer a unique dual degree opportunity in partnership with premier IITs and JVWU Jaipur. Students can pursue BTech in Computer Science Engineering or BSc in Data Science, AI, ML, or Statistics while simultaneously earning an IIT BS Degree. This comprehensive 4-year program combines rigorous academic training with hands-on practical experience, preparing students for successful careers in technology and innovation.'
  },
  {
    icon: BookOpen,
    title: 'Postgraduate Programs',
    description: 'Advanced specialized programs with research opportunities, industry partnerships, and pathways to academic and professional excellence.',
    image: postgraduateImage,
    details: 'Our postgraduate programs provide advanced education and research opportunities in cutting-edge fields. Students can pursue specialized certifications in AI/ML/Data Science from top IITs (IIT Roorkee, IIT Kanpur, IIT Guwahati) over 1.5 years. These programs combine theoretical depth with practical application, offering students the chance to work on real-world projects, conduct research, and collaborate with industry experts.'
  },
  {
    icon: Award,
    title: 'Scholarship Programs',
    description: 'Merit-based and need-based scholarships to support talented students in achieving their academic dreams and career goals.',
    image: 'https://images.unsplash.com/photo-1761124739155-2405d90a508d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBnaXJsJTIwc3R1ZGVudCUyMHNjaG9sYXJzaGlwJTIwaGFwcHl8ZW58MXx8fHwxNzY4NTM3Nzg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    details: `We offer comprehensive scholarship programs to support deserving students:

• Merit Scholarships: Up to 50% tuition fee waiver for top academic performers
• Need-based Scholarships: Financial assistance for economically disadvantaged students
• Sports & Cultural Scholarships: Recognition for outstanding achievements
• Government Scholarships: Support for SC/ST/OBC students as per government norms

Fee Structure:
• Total Program Fee: ₹4,50,000 (4 years)
• With Merit Scholarship: As low as ₹2,25,000
• Flexible payment plans available
• Additional scholarships available based on 12th grade marks and entrance exam scores`
  },
  {
    icon: Users,
    title: 'Research & Innovation',
    description: 'State-of-the-art research facilities and programs encouraging innovation, critical thinking, and real-world problem solving.',
    image: researchImage,
    details: 'Our research and innovation programs foster a culture of inquiry and discovery. Students have access to state-of-the-art laboratories, research facilities, and mentorship from experienced faculty. We encourage participation in national and international research conferences, hackathons, and innovation challenges. Our collaborations with IITs and industry partners provide unique opportunities for students to work on cutting-edge projects in AI, machine learning, data science, and emerging technologies.'
  }
];

export function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const openProgramDetails = (program: Program) => {
    setSelectedProgram(program);
  };

  // Close modal when clicking outside content
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeProgramDetails();
    }
  };

  // Prevent body scrolling when modal is open
  React.useEffect(() => {
    if (selectedProgram) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProgram]);

  const closeProgramDetails = () => {
    setSelectedProgram(null);
  };

  return (
    <section className="py-20 bg-background relative" id="programs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">Our Programs</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover a wide range of academic programs tailored to help you achieve your educational and career aspirations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
              >
                {!program.hideImage && (
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent-foreground" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  {program.hideImage && (
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent-foreground" />
                      </div>
                    </div>
                  )}
                  <h3 className="mb-3 text-lg font-semibold">{program.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {program.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openProgramDetails(program)}
                    className="w-full mt-auto"
                  >
                    Explore Program
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={handleBackdropClick}
        >
          <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeProgramDetails}
                className="absolute top-4 right-4 bg-background/80 hover:bg-background rounded-full p-2 z-10"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="relative h-64">
                <ImageWithFallback
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      {React.createElement(selectedProgram.icon, { className: "w-6 h-6 text-accent-foreground" })}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{selectedProgram.title}</h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {selectedProgram.details}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
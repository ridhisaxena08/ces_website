import { GraduationCap, Info } from 'lucide-react';
import { useState } from 'react';

const programs = [
  {
    id: 1,
    title: 'IIT BS Degree',
    subtitle: 'Mentorship Program',
    description: '4 Year Degree from IIT Madras',
    tag: 'Premier',
    details: [
      'BS in Data Science and Applications',
      'BS in Electronic Systems'
    ]
  },
  {
    id: 2,
    title: 'BTech',
    subtitle: 'RCEW Jaipur',
    description: 'CSE, Civil, Electronics, Electrical etc.',
    tag: '4 Years',
    details: [
      'Computer Science & Engineering (AI)',
      'Computer Science & Engineering (ML)',
      'Computer Science & Engineering (AIDS)',
      'Computer Science & Engineering (Core)',
      'Civil Engineering',
      'Electronics Engineering',
      'Electrical Engineering'
    ]
  },
  {
    id: 3,
    title: 'BCA',
    subtitle: 'Bachelor of Computer Applications',
    description: 'Comprehensive programming and software development',
    tag: '3 Years',
    details: [
      'Core Programming',
      'Web Development',
      'Database Management',
      'Software Engineering'
    ]
  },
  {
    id: 4,
    title: 'MTech',
    subtitle: 'Master of Technology',
    description: 'Advanced technical specialization programs',
    tag: '2 Years',
    details: [
      'Computer Science & Engineering',
      'VLSI Design',
      'Power Systems',
      'Structural Engineering'
    ]
  },
  {
    id: 5,
    title: 'MBA',
    subtitle: 'Master of Business Administration',
    description: 'Business leadership and management excellence',
    tag: '2 Years',
    details: [
      'Finance',
      'Marketing',
      'Human Resources',
      'Operations Management'
    ]
  },
  {
    id: 6,
    title: 'MCA',
    subtitle: 'Master of Computer Applications',
    description: 'Advanced computing and IT management',
    tag: '2 Years',
    details: [
      'Advanced Programming',
      'Cloud Computing',
      'Cybersecurity',
      'Data Analytics'
    ]
  },
];

interface ProgramsListProps {
  onApplyClick: () => void;
}

export function ProgramsList({ onApplyClick }: ProgramsListProps) {
  const [activePopup, setActivePopup] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Academic Programs
          </h2>
          <p className="text-gray-600 text-lg">Dual Degree Opportunities Available</p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="relative group bg-white border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setActivePopup(program.id)}
              onMouseLeave={() => setActivePopup(null)}
              onClick={() => setActivePopup(activePopup === program.id ? null : program.id)}
              style={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div 
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300 transform group-hover:scale-110"
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <GraduationCap className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white bg-gradient-to-r from-primary to-[#C41E3A] px-3 py-1 rounded-full shadow-sm">
                    {program.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Info className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {program.title}
              </h3>
              <p className="text-sm font-medium text-primary mb-2">
                {program.subtitle}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {program.description}
              </p>

              {/* Info Popup */}
              <div 
                className={`absolute z-20 left-0 right-0 top-full mt-2 bg-white border-2 border-primary rounded-lg shadow-xl p-5 transition-all duration-300 transform origin-top ${
                  activePopup === program.id 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
                style={{
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-t-2 border-l-2 border-priamry transform rotate-45 transition-colors"></div>
                
                <h4 className="font-semibold text-gray-900 mb-3 text-base flex items-center">
                  <svg className="w-4 h-4 text-priamry mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Available Specializations:
                </h4>
                <ul className="space-y-2">
                  {program.details.map((detail, index) => (
                    <li 
                      key={index} 
                      className="text-sm text-gray-700 flex items-start group/item transition-colors hover:bg-gray-50 p-2 -mx-2 rounded"
                    >
                      <span className="text-priamry mr-2 font-bold">›</span>
                      <span className="group-hover/item:text-priamry transition-colors">{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-100 text-right">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onApplyClick();
                    }}
                    className="text-sm font-medium text-priamry hover:text-[#6B0000] transition-colors flex items-center ml-auto"
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            className="bg-primary hover:bg-[#6B0000] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            onClick={onApplyClick}
          >
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
}
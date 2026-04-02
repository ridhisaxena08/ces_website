import { GraduationCap, Info, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const programs = [
  {
    id: 1,
    slug: 'iit-bs-degree',
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
    slug: 'btech',
    title: 'BTech',
    subtitle: 'RCEW Jaipur',
    description: 'CSE, Civil, Electronics, Electrical etc.',
    tag: '4 Years',
    details: [
      'Computer Science & Engineering (AI)',
      'Computer Science & Engineering (AIDS)',
      'Computer Science & Engineering (Core)',
      'Civil Engineering',
      'Electronics Engineering',
      'Electrical Engineering'
    ]
  },
  {
    id: 3,
    slug: 'bca',
    title: 'BCA',
    subtitle: 'Bachelor of Computer Applications',
    description: 'Comprehensive programming and software development',
    tag: '3 Years',
    details: [
      'Core Programming',
    ]
  },
  {
    id: 4,
    slug: 'mtech',
    title: 'MTech',
    subtitle: 'Master of Technology',
    description: 'Advanced technical specialization programs',
    tag: '2 Years',
    details: [
      'Computer Science & Engineering',
      'Power Systems',
      'Digital Communication',
    ]
  },
  {
    id: 5,
    slug: 'mba',
    title: 'MBA',
    subtitle: 'Master of Business Administration',
    description: 'Business leadership and management excellence',
    tag: '2 Years',
    details: [
      'Finance',
      'Marketing',
      'Human Resources',
    ]
  },
  {
    id: 6,
    slug: 'mca',
    title: 'MCA',
    subtitle: 'Master of Computer Applications',
    description: 'Advanced computing and IT management',
    tag: '2 Years',
    details: [
      'Computer Application',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
              onMouseEnter={() => setActivePopup(program.id)}
              onMouseLeave={() => setActivePopup(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500 transform group-hover:scale-110"
                >
                  <GraduationCap className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white bg-gradient-to-r from-primary to-[#C41E3A] px-3 py-1 rounded-full shadow-sm">
                    {program.tag}
                  </span>
                  {program.tag === 'Premier' && (
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                      Limited Seats
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {program.title}
              </h3>
              <p className="text-sm font-medium text-primary mb-3">
                {program.subtitle}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {program.description}
              </p>

              {/* View Details Button */}
              <Link 
                to={`/course/${program.slug}`}
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-[#6B0000] transition-colors group/button"
                onClick={(e) => e.stopPropagation()}
              >
                View Details
                <ArrowRight className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform" />
              </Link>

              {/* Info Popup */}
              <div 
                className={`absolute z-20 left-0 right-0 top-full mt-2 bg-white border-2 border-primary rounded-lg shadow-xl p-5 transition-all duration-300 transform origin-top ${
                  activePopup === program.id 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-t-2 border-l-2 border-primary transform rotate-45"></div>
                
                <h4 className="font-semibold text-gray-900 mb-3 text-base flex items-center">
                  <svg className="w-4 h-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <span className="text-primary mr-2 font-bold">›</span>
                      <span className="group-hover/item:text-primary transition-colors">{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-100 text-right">
                  <Link 
                    to={`/course/${program.slug}`}
                    className="text-sm font-medium text-primary hover:text-[#6B0000] transition-colors flex items-center ml-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
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
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Award, BookOpen, DollarSign, GraduationCap } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { useState } from 'react';

// Course data structure - this would typically come from an API
const courseData: Record<string, any> = {
  'iit-bs-degree': {
    title: 'IIT BS Degree',
    subtitle: 'Mentorship Program',
    description: '4 Year Degree from IIT Madras',
    duration: '4 Years',
    eligibility: '10+2 with PCM/CS with minimum 60% marks',
    fees: {
      total: '₹4,00,000',
      perYear: '₹1,00,000',
      scholarship: 'Up to 100% based on merit and economic background'
    },
    overview: 'The IIT Bachelor of Science program is designed to provide students with a strong foundation in data science and electronic systems. This program combines theoretical knowledge with practical applications, preparing students for careers in technology and research.',
    seats: 'Limited to 60 seats per specialization',
    dualDegree: 'Option to pursue MTech in the 5th year',
    isPremier: true,
    syllabus: [
      {
        year: 'Year 1',
        subjects: [
          'Mathematics I & II',
          'Physics I & II',
          'Programming Fundamentals',
          'Digital Logic Design',
          'Communication Skills',
          'Environmental Science'
        ]
      },
      {
        year: 'Year 2',
        subjects: [
          'Data Structures & Algorithms',
          'Computer Organization',
          'Database Management Systems',
          'Operating Systems',
          'Probability & Statistics',
          'Web Technologies'
        ]
      },
      {
        year: 'Year 3',
        subjects: [
          'Machine Learning',
          'Cloud Computing',
          'Cybersecurity',
          'Software Engineering',
          'Big Data Analytics',
          'Project Management'
        ]
      },
      {
        year: 'Year 4',
        subjects: [
          'Artificial Intelligence',
          'IoT Systems',
          'Research Methodology',
          'Industry Internship',
          'Capstone Project',
          'Elective Specializations'
        ]
      }
    ]
  },
  'btech': {
    title: 'BTech',
    subtitle: 'RCEW Jaipur',
    description: 'Engineering Excellence Program',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks (40% for reserved categories)',
    fees: {
      total: '₹2,40,000',
      perYear: '₹60,000',
      scholarship: 'Up to 50% based on JEE/REAP score and merit'
    },
    overview: 'The BTech program at RCEW Jaipur offers comprehensive engineering education with specializations in various branches. The curriculum is designed to meet industry standards and includes practical training, internships, and project work.',
    seats: '180 seats per branch',
    dualDegree: 'Integrated MTech option available',
    isPremier: false,
    syllabus: [
      {
        year: 'Year 1',
        subjects: [
          'Engineering Mathematics I',
          'Engineering Physics',
          'Engineering Chemistry',
          'Basic Electrical Engineering',
          'Basic Mechanical Engineering',
          'Programming & Problem Solving'
        ]
      },
      {
        year: 'Year 2',
        subjects: [
          'Engineering Mathematics II',
          'Digital Electronics',
          'Analog Electronics',
          'Data Structures',
          'Thermodynamics',
          'Fluid Mechanics'
        ]
      },
      {
        year: 'Year 3',
        subjects: [
          'Microprocessors',
          'Database Systems',
          'Computer Networks',
          'Theory of Computation',
          'Compiler Design',
          'Technical Communication'
        ]
      },
      {
        year: 'Year 4',
        subjects: [
          'Artificial Intelligence',
          'Machine Learning',
          'Cloud Computing',
          'Major Project',
          'Industrial Training',
          'Elective Courses'
        ]
      }
    ]
  },
  'bca': {
    title: 'BCA',
    subtitle: 'Bachelor of Computer Applications',
    description: 'Comprehensive programming and software development',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 45% marks',
    fees: {
      total: '₹1,35,000',
      perYear: '₹45,000',
      scholarship: 'Up to 30% based on merit'
    },
    overview: 'The BCA program provides a strong foundation in computer applications and software development. Students learn programming languages, database management, web development, and modern technologies.',
    seats: '120 seats',
    dualDegree: 'Option to pursue MCA in the 4th year',
    isPremier: false,
    syllabus: [
      {
        year: 'Year 1',
        subjects: [
          'Fundamentals of Computers',
          'C Programming',
          'Digital Electronics',
          'Mathematics I',
          'Communication Skills',
          'Office Automation'
        ]
      },
      {
        year: 'Year 2',
        subjects: [
          'Data Structures',
          'Java Programming',
          'Web Designing',
          'Database Management',
          'Mathematics II',
          'Operating Systems'
        ]
      },
      {
        year: 'Year 3',
        subjects: [
          'Software Engineering',
          'Python Programming',
          'Mobile Application Development',
          'Cloud Computing',
          'Project Work',
          'Elective Subjects'
        ]
      }
    ]
  },
  'mba': {
    title: 'MBA',
    subtitle: 'Master of Business Administration',
    description: 'Business leadership and management excellence',
    duration: '2 Years',
    eligibility: 'Graduation in any stream with minimum 50% marks',
    fees: {
      total: '₹1,60,000',
      perYear: '₹80,000',
      scholarship: 'Up to 40% based on CAT/MAT score and merit'
    },
    overview: 'The MBA program develops business leadership skills and management expertise. The curriculum covers various aspects of business management, finance, marketing, human resources, and entrepreneurship.',
    seats: '180 seats',
    dualDegree: 'Not applicable',
    isPremier: false,
    syllabus: [
      {
        year: 'Year 1',
        subjects: [
          'Management Principles',
          'Financial Accounting',
          'Managerial Economics',
          'Business Statistics',
          'Marketing Management',
          'Organizational Behavior'
        ]
      },
      {
        year: 'Year 2',
        subjects: [
          'Strategic Management',
          'Financial Management',
          'Human Resource Management',
          'Operations Management',
          'Business Ethics',
          'Summer Internship Project'
        ]
      }
    ]
  },
  'mca': {
    title: 'MCA',
    subtitle: 'Master of Computer Applications',
    description: 'Advanced computing and IT management',
    duration: '2 Years',
    eligibility: 'BCA/BSc Computer Science or graduation with Mathematics',
    fees: {
      total: '₹1,40,000',
      perYear: '₹70,000',
      scholarship: 'Up to 35% based on entrance exam and merit'
    },
    overview: 'The MCA program provides advanced knowledge in computer applications, software development, and IT management. It prepares students for leadership roles in the IT industry.',
    seats: '60 seats',
    dualDegree: 'Not applicable',
    isPremier: false,
    syllabus: [
      {
        year: 'Year 1',
        subjects: [
          'Advanced Programming',
          'Software Engineering',
          'Computer Networks',
          'Database Systems',
          'Web Technologies',
          'Operating Systems'
        ]
      },
      {
        year: 'Year 2',
        subjects: [
          'Cloud Computing',
          'Cybersecurity',
          'Artificial Intelligence',
          'Project Management',
          'Major Project',
          'Elective Specializations'
        ]
      }
    ]
  },
  'mtech': {
    title: 'MTech',
    subtitle: 'Master of Technology',
    description: 'Advanced technical specialization programs',
    duration: '2 Years',
    eligibility: 'BTech in relevant branch with minimum 60% marks',
    fees: {
      total: '₹1,20,000',
      perYear: '₹60,000',
      scholarship: 'Up to 50% based on GATE score and merit'
    },
    overview: 'The MTech program offers specialized education in various engineering disciplines. It focuses on research, advanced technical skills, and innovation in engineering fields.',
    seats: '18 seats per specialization',
    dualDegree: 'Not applicable',
    isPremier: false,
    syllabus: [
      {
        year: 'Year 1',
        subjects: [
          'Advanced Mathematics',
          'Research Methodology',
          'Specialization Core Courses',
          'Technical Electives',
          'Seminar',
          'Lab Work'
        ]
      },
      {
        year: 'Year 2',
        subjects: [
          'Advanced Specialization',
          'Thesis Work',
          'Publications',
          'Industry Project',
          'Comprehensive Viva',
          'Conference Presentations'
        ]
      }
    ]
  }
};

type TabType = 'overview' | 'syllabus' | 'fees' | 'eligibility' | 'scholarship';

export function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  const course = courseData[slug || ''];
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link to="/" className="text-primary hover:text-[#6B0000]">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const tabs: { key: TabType; label: string; icon: any }[] = [
    { key: 'overview', label: 'Overview', icon: BookOpen },
    { key: 'syllabus', label: 'Syllabus', icon: GraduationCap },
    { key: 'fees', label: 'Fees', icon: DollarSign },
    { key: 'eligibility', label: 'Eligibility', icon: Users },
    { key: 'scholarship', label: 'Scholarship', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link 
            to="/#programs" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Programs
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold">{course.title}</h1>
                {course.isPremier && (
                  <span className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Premier Program
                  </span>
                )}
              </div>
              <p className="text-xl text-white/90 mb-2">{course.subtitle}</p>
              <p className="text-white/80">{course.description}</p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-2 text-white/80 mb-2">
                <Clock className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <Users className="w-5 h-5" />
                <span className="font-semibold">{course.seats}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Program Overview</h2>
              <p className="text-gray-600 leading-relaxed">{course.overview}</p>
            </div>
            
            {course.dualDegree !== 'Not applicable' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Dual Degree Option</h3>
                <p className="text-blue-700">{course.dualDegree}</p>
              </div>
            )}
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-2 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Limited Seats Available
              </h3>
              <p className="text-amber-700">{course.seats} - Apply early to secure your admission!</p>
            </div>
          </div>
        )}

        {/* Syllabus Tab */}
        {activeTab === 'syllabus' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Syllabus</h2>
            {course.syllabus.map((year: any, index: number) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{year.year}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {year.subjects.map((subject: string, subjectIndex: number) => (
                    <div key={subjectIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fees Tab */}
        {activeTab === 'fees' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fees Structure</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Fees</h3>
                  <p className="text-3xl font-bold text-primary">{course.fees.total}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Per Year</h3>
                  <p className="text-2xl font-bold text-gray-700">{course.fees.perYear}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Options</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Annual payment</li>
                    <li>• Semester-wise payment</li>
                    <li>• EMI options available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Eligibility Tab */}
        {activeTab === 'eligibility' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Requirements</h3>
                  <p className="text-gray-600">{course.eligibility}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scholarship Tab */}
        {activeTab === 'scholarship' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Scholarship Information</h2>
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-amber-600" />
                <h3 className="text-2xl font-bold text-amber-900">Scholarship Available</h3>
              </div>
              <p className="text-amber-800 text-lg mb-4">{course.fees.scholarship}</p>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-amber-900">Scholarship Criteria:</h4>
                <ul className="text-amber-700 space-y-2">
                  <li>• Merit-based (academic performance)</li>
                  <li>• Economic background</li>
                  <li>• Entrance exam scores (JEE/CAT/MAT/GATE)</li>
                  <li>• Special categories (sports, extracurricular)</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-white/90 mb-8">
              Apply now and take the first step towards a successful career
            </p>
            <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

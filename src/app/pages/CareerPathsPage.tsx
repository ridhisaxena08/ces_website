import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Database, Cpu, Building2, TrendingUp, Award } from 'lucide-react';

const careerPaths = [
  {
    icon: Code,
    title: 'Software Development',
    description: 'Build innovative applications and systems as a software engineer, full-stack developer, or mobile app developer.',
    opportunities: ['Software Engineer', 'Full Stack Developer', 'Mobile App Developer', 'Frontend/Backend Developer'],
    averageSalary: '₹6-15 LPA'
  },
  {
    icon: Database,
    title: 'Data Science & Analytics',
    description: 'Transform data into insights as a data scientist, analyst, or machine learning engineer.',
    opportunities: ['Data Scientist', 'Data Analyst', 'ML Engineer', 'Business Intelligence Analyst'],
    averageSalary: '₹7-18 LPA'
  },
  {
    icon: Cpu,
    title: 'Artificial Intelligence & ML',
    description: 'Shape the future with AI/ML roles in cutting-edge technology companies and research labs.',
    opportunities: ['AI Engineer', 'ML Researcher', 'Computer Vision Engineer', 'NLP Specialist'],
    averageSalary: '₹8-20 LPA'
  },
  {
    icon: Building2,
    title: 'Product Management',
    description: 'Lead product strategy and development in tech companies and startups.',
    opportunities: ['Product Manager', 'Technical Product Manager', 'Product Analyst', 'Product Owner'],
    averageSalary: '₹8-25 LPA'
  },
  {
    icon: TrendingUp,
    title: 'Consulting & Analytics',
    description: 'Solve complex business problems with top consulting firms and analytics companies.',
    opportunities: ['Technology Consultant', 'Business Analyst', 'Strategy Consultant', 'Systems Analyst'],
    averageSalary: '₹7-20 LPA'
  },
  {
    icon: Award,
    title: 'Research & Academia',
    description: 'Pursue advanced research and academic careers in universities and research institutions.',
    opportunities: ['Research Scientist', 'PhD Scholar', 'Academic Researcher', 'Teaching Faculty'],
    averageSalary: '₹5-15 LPA'
  }
];

const topRecruiters = [
  'TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'HCL Technologies',
  'Tech Mahindra', 'IBM', 'Microsoft', 'Amazon', 'Google', 'Flipkart',
  'Paytm', 'Zomato', 'BYJU\'S', 'Deloitte', 'EY', 'KPMG'
];

export function CareerPathsPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center text-accent hover:text-accent-foreground mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-card rounded-xl shadow-lg p-8 sm:p-12">
          <h1 className="text-4xl md:text-5xl mb-4 text-accent">Explore Career Paths</h1>
          <p className="text-muted-foreground text-lg mb-12">Discover diverse opportunities after graduation</p>

          {/* Introduction */}
          <div className="mb-12 bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-xl">
            <h3 className="text-2xl mb-4">Your Future Starts Here</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At Chandrawati Education Society, we prepare you for diverse and rewarding 
              career opportunities in technology, research, and innovation. Our dual degree programs 
              with IIT and JVWU, combined with advanced certifications, open doors to top companies 
              and research institutions worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">₹8-12 LPA</div>
                <div className="text-sm text-muted-foreground">Average Package</div>
              </div>
            </div>
          </div>

          {/* Career Paths Grid */}
          <h3 className="text-2xl mb-6">Career Opportunities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {careerPaths.map((path, index) => {
              const Icon = path.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl mb-1">{path.title}</h4>
                      <p className="text-sm text-primary">{path.averageSalary}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{path.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Roles:</p>
                    <div className="flex flex-wrap gap-2">
                      {path.opportunities.map((opp, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                        >
                          {opp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top Recruiters */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl mb-6 text-center">Our Top Recruiters</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {topRecruiters.map((company, index) => (
                <div
                  key={index}
                  className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200"
                >
                  <span className="font-medium text-gray-700">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

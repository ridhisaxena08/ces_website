import { Building2, MapPin, ArrowRight, ChevronDown, ChevronUp, LampFloor, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function CampusBuildingsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedBuilding, setExpandedBuilding] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const buildings = [
    {
      id: 'academic',
      name: 'Academic Block',
      description: 'The center of academic excellence with modern classrooms, lecture halls, and faculty offices.',
      image: '/src/assets/academic-building.jpg',
      floors: [
        {
          level: 'Ground Floor',
          departments: ['Reception', 'Administration', 'Main Auditorium', 'Cafeteria']
        },
        {
          level: 'First Floor',
          departments: ['Computer Science', 'Information Technology']
        },
        {
          level: 'Second Floor',
          departments: ['Electronics', 'Electrical Engineering']
        },
        {
          level: 'Third Floor',
          departments: ['Mechanical', 'Civil Engineering']
        }
      ]
    },
    {
      id: 'research',
      name: 'Research & Innovation Center',
      description: 'State-of-the-art facilities for cutting-edge research and development across disciplines.',
      image: '/src/assets/research-center.jpg',
      floors: [
        {
          level: 'Ground Floor',
          departments: ['Research Labs', 'Conference Center']
        },
        {
          level: 'First Floor',
          departments: ['Biotechnology', 'Pharmaceutical Research']
        },
        {
          level: 'Second Floor',
          departments: ['AI & Data Science', 'Robotics Lab']
        },
        {
          level: 'Third Floor',
          departments: ['Incubation Center', 'Startup Hub']
        }
      ]
    },
        {
      id: 'admin',
      name: 'Admin Block',
      description: 'Admission Cell, Seminar Halls, Directors Office, TPO Cell, Chairmen Office',
      image: '/src/assets/research-center.jpg',
      floors: [
        {
          level: 'Ground Floor',
          departments: ['Admission Cell', 'Directors Office', 'TPO Cell', 'Chairmen Office']
        },
        {
          level: 'First Floor',
          departments: ['Seminar Halls']
        },
        {
          level: 'Second Floor',
          departments: ['Library','Physics Lab']
        }
      ]
    }
  ];

  const toggleBuilding = (buildingId: string) => {
    setExpandedBuilding(expandedBuilding === buildingId ? null : buildingId);
  };

  // Gallery images with direct paths from assets
  const galleryImages = [
    { id: 1, src: '/src/assets/ElectronicSystems.jpg', alt: 'Campus Building' },
    { id: 2, src: '/src/assets/es.jpg', alt: 'Academic Block' },
    { id: 3, src: '/src/assets/logo.png', alt: 'Campus Logo' },
    { id: 4, src: '/src/assets/2.png', alt: 'Campus View' },
    { id: 5, src: '/src/assets/logo1.png', alt: 'Campus Logo' },
  ];

  const openImage = (imageId: number) => {
    const index = galleryImages.findIndex(img => img.id === imageId);
    setCurrentImageIndex(index);
    setSelectedImage(galleryImages[index].src);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    let newIndex = currentImageIndex;
    if (direction === 'prev') {
      newIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    } else {
      newIndex = (currentImageIndex + 1) % galleryImages.length;
    }
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex].src);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Campus Buildings</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Explore our state-of-the-art academic and research facilities designed to inspire innovation and learning.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'buildings', 'gallery'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-12">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Our Campus Facilities</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our campus features modern, well-equipped buildings designed to foster learning, innovation, and community. 
                  From cutting-edge research facilities to comfortable study spaces, we provide an environment that supports 
                  academic excellence and personal growth.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-primary" />
                    Academic Excellence
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our academic buildings are designed to enhance the learning experience with modern classrooms, 
                    advanced laboratories, and collaborative spaces that encourage innovation and critical thinking.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <ArrowRight className="w-4 h-4 mt-1 mr-2 text-primary flex-shrink-0" />
                      <span>Smart classrooms with the latest teaching technology</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-4 h-4 mt-1 mr-2 text-primary flex-shrink-0" />
                      <span>Specialized labs for hands-on learning</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-4 h-4 mt-1 mr-2 text-primary flex-shrink-0" />
                      <span>Comfortable study lounges and group workspaces</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-primary" />
                    Research & Innovation
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our research facilities provide students and faculty with the tools and spaces needed to push 
                    the boundaries of knowledge and develop innovative solutions to real-world challenges.
                  </p>
                  <div className="space-y-3">
                    {[
                      { name: 'Research Labs', count: '15+' },
                      { name: 'Innovation Centers', count: '5' },
                      { name: 'Collaboration Spaces', count: '10+' },
                      { name: 'Prototyping Labs', count: '3' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-gray-500">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

{/* Gallery Tab */}
{activeTab === 'gallery' && (
  <div className="space-y-8">              
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {galleryImages.map((image) => (
        <div 
          key={image.id} 
          className="group relative overflow-hidden rounded-lg cursor-pointer aspect-square bg-gray-100"
          onClick={() => openImage(image.id)}
        >
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
            <span className="text-white font-medium">View</span>
          </div>
          <img 
            src={image.src} 
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
    
    {/* Rest of the gallery code remains the same */}
    {selectedImage && (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <button 
          onClick={() => setSelectedImage(null)}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X className="w-8 h-8" />
        </button>
        
        <button 
          onClick={() => navigateImage('prev')}
          className="absolute left-4 text-white hover:text-gray-300 p-2"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <div className="max-w-4xl max-h-[90vh] flex items-center justify-center">
          <img 
            src={selectedImage} 
            alt="" 
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
        
        <button 
          onClick={() => navigateImage('next')}
          className="absolute right-4 text-white hover:text-gray-300 p-2"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {galleryImages[currentImageIndex].alt}
          </div>
        </div>
      </div>
    )}
  </div>
)}
          
          {/* Buildings Tab */}
          {activeTab === 'buildings' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Campus Buildings</h2>
              <div className="space-y-6">
                {buildings.map((building) => (
                  <div key={building.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div 
                      className="p-6 cursor-pointer flex justify-between items-center"
                      onClick={() => toggleBuilding(building.id)}
                    >
                      <div>
                        <h3 className="text-xl font-semibold">{building.name}</h3>
                        <p className="text-gray-600 mt-1">{building.description}</p>
                      </div>
                      {expandedBuilding === building.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { 
  Home, 
  Utensils, 
  Shirt, 
  Shield, 
  Wifi, 
  Dumbbell, 
  BookOpen,
  MapPin,
  Users,
  Bed,
  Image as ImageIcon,
  Maximize2
} from 'lucide-react';

export function HostelFacilitiesPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const facilities = [
    {
      icon: <Bed className="w-6 h-6" />,
      title: "Comfortable Rooms",
      description: "Spacious rooms with study tables, wardrobes, and comfortable bedding"
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "High-Speed Internet",
      description: "24/7 high-speed Wi-Fi connectivity throughout the hostel"
    },
    {
      icon: <Utensils className="w-6 h-6" />,
      title: "Dining Facilities",
      description: "Nutritious and hygienic meals served in the common dining hall"
    },
    {
      icon: <Dumbbell className="w-6 h-6" />,
      title: "Fitness Center",
      description: "Well-equipped gym and sports facilities for residents"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Study Rooms",
      description: "Dedicated quiet zones and study rooms for focused learning"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "24/7 Security",
      description: "Round-the-clock security with CCTV surveillance"
    }
  ];

  const rooms = [
    {
      type: 'Single Seater (AC)',
      description: 'Private air-conditioned room with attached bathroom and all modern amenities.',
      features: ['Single bed', 'Study table & chair', 'Wardrobe', 'Bookshelf', 'AC']
    },
    {
      type: 'Single Seater (Non-AC)',
      description: 'Private room with attached bathroom and comfortable living space.',
      features: ['Single bed', 'Study table & chair', 'Wardrobe', 'Bookshelf', 'Ceiling fan']
    },
    {
      type: '2-Seater (AC)',
      description: 'Shared air-conditioned room with attached bathroom, perfect for friends.',
      features: ['Two single beds', 'Study tables & chairs', 'Wardrobes', 'Bookshelves', 'AC']
    },
    {
      type: '2-Seater (Non-AC)',
      description: 'Shared room with attached bathroom and good ventilation.',
      features: ['Two single beds', 'Study tables & chairs', 'Wardrobes', 'Bookshelves', 'Ceiling fans']
    }
  ];

  const galleryImages = [
    { id: 1, alt: 'Hostel Exterior', category: 'Building' },
    { id: 2, alt: 'Single Room', category: 'Rooms' },
    { id: 3, alt: 'Double Room', category: 'Rooms' },
    { id: 4, alt: 'Dining Hall', category: 'Facilities' },
    { id: 5, alt: 'Study Room', category: 'Facilities' },
    { id: 6, alt: 'Gym', category: 'Facilities' },
    { id: 7, alt: 'Common Area', category: 'Facilities' },
    { id: 8, alt: 'Garden', category: 'Outdoor' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hostel Facilities</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Experience comfortable and secure living with modern amenities designed for your academic success.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'rooms', 'gallery'].map((tab) => (
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
                <h2 className="text-2xl font-semibold mb-4">Welcome to Our Hostel</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our hostel is more than just a place to stay—it's a vibrant community where students can live, learn, and grow. 
                  With modern facilities, comfortable accommodations, and a supportive environment, we provide the perfect home away from home.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Home className="w-5 h-5 mr-2 text-primary" />
                    Living Spaces
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our hostel offers a variety of room options to suit different needs and preferences, all designed with student comfort in mind.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></span>
                      <span>Single and double occupancy rooms</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></span>
                      <span>AC and non-AC options available</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></span>
                      <span>Attached and shared bathroom facilities</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    Community & Support
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We foster a supportive community with dedicated staff and various activities to help you adjust to hostel life.
                  </p>
                  <div className="space-y-3">
                    {[
                      { name: 'Wardens & Staff', description: 'Available 24/7 for support' },
                      { name: 'Mentorship', description: 'Senior student mentors' },
                      { name: 'Community Events', description: 'Regular social activities' },
                      { name: 'Counseling', description: 'Professional support services' }
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-800">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Facilities Grid */}
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-6">Our Facilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {facilities.map((facility, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                        {facility.icon}
                      </div>
                      <h4 className="text-lg font-semibold mb-2">{facility.title}</h4>
                      <p className="text-gray-600">{facility.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Rooms Tab */}
          {activeTab === 'rooms' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Room Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.map((room, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold">{room.type}</h3>
                        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {room.type.includes('2-Seater') ? 'Shared' : 'Private'}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{room.description}</p>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Room Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {room.features.map((feature, i) => (
                            <span key={i} className="bg-gray-50 px-3 py-1 rounded-full text-sm text-gray-700">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Photo Gallery</h2>
                <p className="text-gray-600">Take a virtual tour of our hostel facilities and living spaces.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((image) => (
                  <div key={image.id} className="relative group overflow-hidden rounded-lg aspect-square bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                      <Maximize2 className="text-white w-6 h-6 mb-2" />
                      <span className="text-white font-medium">{image.alt}</span>
                      <span className="text-sm text-gray-200">{image.category}</span>
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
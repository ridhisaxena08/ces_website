import { BookOpen, Book, BookMarked, BookText, BookOpenText, Headphones, Wifi, Coffee, Image as ImageIcon, Maximize2, Library, BookUp2, Users, Clock as ClockIcon } from 'lucide-react';
import { useState } from 'react';

export function LibraryAndStudyAreasPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Library & Study Areas</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Discover our state-of-the-art facilities designed to support your academic journey and research needs.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'resources', 'gallery'].map((tab) => (
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
                <h2 className="text-2xl font-semibold mb-4">Welcome to Our Library</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our library is more than just a collection of books—it's a vibrant learning hub designed to inspire and support your academic journey. 
                  With modern facilities, extensive resources, and comfortable study spaces, we provide the perfect environment for both individual study and collaborative work.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Library className="w-5 h-5 mr-2 text-primary" />
                    Our Collection
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Explore our vast collection of over 100,000 books, e-books, and 500+ academic journals covering all major disciplines.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <BookUp2 className="w-4 h-4 mt-1 mr-2 text-primary flex-shrink-0" />
                      <span>Latest academic publications and research materials</span>
                    </li>
                    <li className="flex items-start">
                      <BookOpenText className="w-4 h-4 mt-1 mr-2 text-primary flex-shrink-0" />
                      <span>Digital resources accessible 24/7</span>
                    </li>
                    <li className="flex items-start">
                      <BookMarked className="w-4 h-4 mt-1 mr-2 text-primary flex-shrink-0" />
                      <span>Special collections and archives</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    Study Spaces
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Choose from a variety of study environments to suit your needs, from silent study zones to collaborative workspaces.
                  </p>
                  <div className="space-y-3">
                    {[
                      { name: 'Silent Study Zone', capacity: '50 seats' },
                      { name: 'Group Study Rooms', capacity: '15 rooms' },
                      { name: '24/7 Reading Room', capacity: '30 seats' },
                      { name: 'Computer Lab', capacity: '20 workstations' }
                    ].map((space, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{space.name}</span>
                        <span className="text-sm text-gray-500">{space.capacity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Library Resources</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-xl font-semibold mb-4">Collections</h3>
                    <ul className="space-y-4">
                      {[
                        { icon: BookOpen, text: '100,000+ books and e-books across all disciplines' },
                        { icon: BookMarked, text: '500+ print and online journals' },
                        { icon: BookText, text: 'Special collections and rare books' },
                        { icon: BookOpenText, text: 'Thesis and dissertation collections' },
                        { icon: Headphones, text: 'Audiobooks and multimedia resources' }
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <item.icon className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-gray-600">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-xl font-semibold mb-4">Services</h3>
                    <ul className="space-y-4">
                      {[
                        { icon: Wifi, text: 'High-speed Wi-Fi throughout the library' },
                        { icon: Coffee, text: '24/7 reading room with coffee station' },
                        { icon: Book, text: 'Computer workstations and printing facilities' },
                        { icon: Headphones, text: 'Study room reservations' },
                        { icon: BookOpen, text: 'Research assistance and workshops' }
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <item.icon className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-gray-600">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Photo Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { id: 1, alt: 'Library Interior', category: 'Library' },
                  { id: 2, alt: 'Reading Area', category: 'Study Spaces' },
                  { id: 3, alt: 'Group Study Room', category: 'Study Spaces' },
                  { id: 4, alt: 'Computer Lab', category: 'Facilities' },
                  { id: 5, alt: 'Book Collection', category: 'Library' },
                  { id: 6, alt: 'Quiet Study Zone', category: 'Study Spaces' },
                  { id: 7, alt: 'Library Atrium', category: 'Library' },
                  { id: 8, alt: 'Reading Lounge', category: 'Study Spaces' },
                  { id: 9, alt: 'Research Section', category: 'Library' },
                  { id: 10, alt: 'Study Carrels', category: 'Study Spaces' },
                  { id: 11, alt: 'Library Entrance', category: 'Library' },
                  { id: 12, alt: 'Outdoor Seating', category: 'Study Spaces' }
                ].map((image) => (
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
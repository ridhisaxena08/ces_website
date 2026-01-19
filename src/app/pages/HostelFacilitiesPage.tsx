import { useState, useEffect } from 'react';
import {
  Home,
  Utensils,
  Shield,
  Wifi,
  Dumbbell,
  BookOpen,
  Users,
  Bed,
  Loader2,
} from 'lucide-react';
import { getStorageImages } from '@/lib/firebase';
import { LazyImage } from '@/components/LazyImage';
import { ImageViewer } from '@/components/ImageViewer';

export function HostelFacilitiesPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'gallery'>('overview');
  const [galleryImages, setGalleryImages] = useState<
    { id: string; url: string; name: string; path: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const showLoading = loading && galleryImages.length === 0;

  useEffect(() => {
    const preloadImages = async () => {
      try {
        setLoading(true);
        const images = await getStorageImages('gallery/girls-hostel');
        setGalleryImages(images);

        images.forEach((img) => {
          const image = new Image();
          image.src = img.url;
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load gallery images');
      } finally {
        setLoading(false);
      }
    };

    preloadImages();
  }, []);

  const openImage = (index: number) => setSelectedImageIndex(index);
  const closeViewer = () => setSelectedImageIndex(null);

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1) {
      setSelectedImageIndex((i) => (i as number) + 1);
    }
  };

  const goToPrev = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex((i) => (i as number) - 1);
    }
  };

  const facilities = [
    { icon: <Bed />, title: 'Comfortable Rooms', description: 'Spacious rooms with modern furniture' },
    { icon: <Wifi />, title: 'High-Speed Internet', description: '24/7 Wi-Fi across the hostel' },
    { icon: <Utensils />, title: 'Dining Facilities', description: 'Nutritious & hygienic meals' },
    { icon: <Dumbbell />, title: 'Fitness Center', description: 'Gym & sports facilities' },
    { icon: <BookOpen />, title: 'Study Rooms', description: 'Quiet zones for focused study' },
    { icon: <Shield />, title: '24/7 Security', description: 'CCTV & security staff' },
  ];

  const rooms = [
    {
      type: 'Single Seater (AC)',
      description: 'Private AC room with attached bathroom.',
      features: ['Single bed', 'Study table', 'Wardrobe', 'AC'],
    },
    {
      type: 'Single Seater (Non-AC)',
      description: 'Private room with fan and attached bathroom.',
      features: ['Single bed', 'Study table', 'Wardrobe', 'Fan'],
    },
    {
      type: '2-Seater (AC)',
      description: 'Shared AC room with attached bathroom.',
      features: ['2 beds', '2 study tables', 'AC'],
    },
    {
      type: '2-Seater (Non-AC)',
      description: 'Shared room with good ventilation.',
      features: ['2 beds', '2 study tables', 'Fan'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-3">Hostel Facilities</h1>
          <p className="text-blue-100 max-w-2xl">
            Comfortable, secure, and student-friendly living spaces.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="border-b mb-8 flex gap-8">
          {['overview', 'rooms', 'gallery'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-3 border-b-2 capitalize ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-6">
            {facilities.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-primary mb-3">{f.icon}</div>
                <h4 className="font-semibold mb-1">{f.title}</h4>
                <p className="text-gray-600 text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Rooms */}
        {activeTab === 'rooms' && (
          <div className="grid md:grid-cols-2 gap-6">
            {rooms.map((room, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{room.type}</h3>
                <p className="text-gray-600 mb-3">{room.description}</p>
                <div className="flex flex-wrap gap-2">
                  {room.features.map((f, idx) => (
                    <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gallery */}
        {activeTab === 'gallery' && (
          <>
            {showLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin w-8 h-8 text-primary" />
              </div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((img, i) => (
                  <div
                    key={img.id}
                    className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => openImage(i)}
                  >
                    <LazyImage src={img.url} alt={img.name} className="w-full h-full" />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Image Viewer */}
      {selectedImageIndex !== null && (
        <ImageViewer
          images={galleryImages}
          currentIndex={selectedImageIndex}
          onClose={closeViewer}
          onNext={goToNext}
          onPrev={goToPrev}
        />
      )}
    </div>
  );
}

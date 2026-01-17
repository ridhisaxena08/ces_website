import { BookOpen, Book, BookMarked, BookText, BookOpenText, Headphones, Wifi, Coffee } from 'lucide-react';

export function LibraryAndStudyAreasPage() {
  return (
    <div className="min-h-screen bg-background py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-card p-4 sm:p-8 rounded-lg">
          <h1 className="text-4xl md:text-5xl mb-6 text-accent">Library & Study Areas</h1>
          
          <p className="text-lg mb-8 leading-relaxed text-muted-foreground">
            Our state-of-the-art library and dedicated study spaces provide the perfect environment for academic success. 
            With extensive resources and comfortable study areas, we support your learning journey.
          </p>

          <div className="mb-12">
            <div className="relative h-64 w-full rounded-lg overflow-hidden mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60 flex items-center justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center px-4">
                  Central Library
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Resources</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 mt-0.5 text-accent flex-shrink-0" />
                    <span>100,000+ books and e-books across all disciplines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <BookMarked className="w-5 h-5 mt-0.5 text-accent flex-shrink-0" />
                    <span>500+ print and online journals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <BookText className="w-5 h-5 mt-0.5 text-accent flex-shrink-0" />
                    <span>Special collections and rare books</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <BookOpenText className="w-5 h-5 mt-0.5 text-accent flex-shrink-0" />
                    <span>Thesis and dissertation collections</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Facilities</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Headphones className="w-5 h-5 mt-0.5 text-accent flex-shrink-0" />
                    <span>Silent study zones and group study rooms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Wifi className="w-5 h-5 mt-0.5 text-accent flex-shrink-0" />
                    <span>High-speed Wi-Fi throughout the library</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Coffee className="w-5 h-5 mt-0.5 text-accent flex-shrink-0" />
                    <span>24/7 reading room with coffee station</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Book className="w-5 h-5 mt-0.5 text-accent flex-shrink-0" />
                    <span>Computer workstations and printing facilities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl mb-6">Study Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-accent/5 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl font-semibold mb-3">Silent Study Zone</h3>
                <p className="text-muted-foreground">
                  A peaceful environment for individual study with individual study carrels and soundproof booths.
                </p>
              </div>
              <div className="bg-accent/5 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl font-semibold mb-3">Group Study Rooms</h3>
                <p className="text-muted-foreground">
                  Bookable spaces for group work with whiteboards and presentation screens.
                </p>
              </div>
              <div className="bg-accent/5 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl font-semibold mb-3">24/7 Reading Room</h3>
                <p className="text-muted-foreground">
                  Always-accessible study space for night owls and early birds.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Library Hours</h3>
            <ul className="text-blue-700 space-y-1">
              <li>Monday - Friday: 8:00 AM - 10:00 PM</li>
              <li>Saturday: 9:00 AM - 8:00 PM</li>
              <li>Sunday: 10:00 AM - 6:00 PM</li>
              <li>24/7 Reading Room: Open all hours</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

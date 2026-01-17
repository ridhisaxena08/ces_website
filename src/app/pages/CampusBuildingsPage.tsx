import { Building2, GraduationCap, FlaskConical, Laptop, Microscope, BookOpen, Utensils, Home, Dumbbell, Leaf } from 'lucide-react';

export function CampusBuildingsPage() {
  return (
    <div className="min-h-screen bg-background py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-card p-4 sm:p-8 rounded-lg">
          <h1 className="text-4xl md:text-5xl mb-6 text-accent">Campus Buildings</h1>
          
          <p className="text-lg mb-8 leading-relaxed text-muted-foreground">
            Our expansive campus features modern, well-equipped buildings designed to foster learning, 
            innovation, and community. Explore our state-of-the-art facilities that support academic 
            excellence and student life.
          </p>

          <div className="space-y-12">
            {/* Academic Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold">Academic Block</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  The heart of academic life, featuring modern classrooms, lecture halls, and faculty offices. 
                  Equipped with the latest teaching aids and technology to enhance the learning experience.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Smart Classrooms</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Lecture Theaters</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Faculty Offices</span>
                </div>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                {/* Placeholder for academic block image */}
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <Building2 className="w-16 h-16 text-blue-400" />
                </div>
              </div>
            </div>

            {/* Science & Research Center */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
              <div className="md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FlaskConical className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold">Science & Research Center</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  A hub for innovation and discovery, housing advanced laboratories and research facilities 
                  that support cutting-edge scientific inquiry across disciplines.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Research Labs</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Computer Labs</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Maker Space</span>
                </div>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden md:order-1">
                {/* Placeholder for research center image */}
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <Microscope className="w-16 h-16 text-green-400" />
                </div>
              </div>
            </div>

            {/* Library & Learning Commons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold">Library & Learning Commons</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  More than just books, our library is a dynamic learning space with extensive collections, 
                  study areas, and technology resources to support your academic journey.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Quiet Study Areas</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Group Study Rooms</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Digital Resources</span>
                </div>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                {/* Placeholder for library image */}
                <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-amber-400" />
                </div>
              </div>
            </div>

            {/* Student Center */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
              <div className="md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Home className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold">Student Center</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  The social heart of campus, featuring dining options, student organization spaces, 
                  and areas for relaxation and socializing between classes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Food Court</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Student Lounge</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Event Spaces</span>
                </div>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden md:order-1">
                {/* Placeholder for student center image */}
                <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                  <Utensils className="w-16 h-16 text-red-400" />
                </div>
              </div>
            </div>

            {/* Sports Complex */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Dumbbell className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold">Sports Complex</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  State-of-the-art athletic facilities including a gymnasium, swimming pool, 
                  indoor courts, and outdoor fields to promote physical wellness and team sports.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Gymnasium</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Swimming Pool</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Sports Fields</span>
                </div>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                {/* Placeholder for sports complex image */}
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                  <Dumbbell className="w-16 h-16 text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-green-50 border-l-4 border-green-500 p-6 rounded">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-green-800">Sustainable Campus</h3>
                <p className="text-green-700">
                  Our campus is designed with sustainability in mind, featuring energy-efficient buildings, 
                  solar panels, rainwater harvesting, and extensive green spaces that create an environmentally 
                  conscious learning environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

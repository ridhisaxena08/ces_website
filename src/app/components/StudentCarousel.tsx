import { useEffect, useState } from 'react';
import studentPhoto1 from 'figma:asset/e2bd89caf4e4f90c21ad349cc0f9b8a29ad9c067.png';
import studentPhoto2 from 'figma:asset/0a5621e009bb5e553d2d0032a43d59c56273fac8.png';
import studentPhoto3 from 'figma:asset/e71cafeb75095a04bfa277062729385cbf885e42.png';

const studentImages = [
  studentPhoto1,
  studentPhoto2,
  studentPhoto3
];

export function StudentCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % studentImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-8 h-96 rounded-xl overflow-hidden shadow-2xl">
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {studentImages.map((image, index) => (
          <div
            key={index}
            className="min-w-full h-full relative flex-shrink-0"
          >
            <img
              src={image}
              alt={`Student life at RCEW ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        ))}
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {studentImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
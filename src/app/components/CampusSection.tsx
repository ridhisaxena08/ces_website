import { useNavigate } from 'react-router-dom';
import campusImage1 from '@/assets/5336e6e40575043b0024256ef638117952f8ddc4.png';
import campusImage2 from '@/assets/41f5e2b83ae7c43a6ea32314f481ec685388aa7a.png';
import campusImage3 from '@/assets/14bb54c4f63925249cfc633b250003332e4ba7bc.png';

export function CampusSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">World-Class Campus Facilities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience learning in a state-of-the-art campus designed to inspire innovation and collaboration. 
            Our facilities include modern classrooms, extensive library resources, cutting-edge laboratories, 
            and comfortable spaces for both focused study and creative collaboration.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative overflow-hidden rounded-xl shadow-lg group">
            <img 
              src={campusImage1} 
              alt="RCEW Campus Building View" 
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl">Campus Buildings</h3>
              <p className="text-sm opacity-90">Modern Infrastructure</p>
            </div>
          </div>
          
          <div 
            className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer"
            onClick={() => navigate('/hostel-facilities')}
          >
            <img 
              src={campusImage2} 
              alt="RCEW Girls Hostel" 
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl">Girls Hostel</h3>
              <p className="text-sm opacity-90">Safe & Comfortable Living</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <span className="text-white text-lg font-semibold">Click to View Details</span>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-xl shadow-lg group">
            <img 
              src={campusImage3} 
              alt="RCEW Library & Study Areas" 
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl">Library & Study Areas</h3>
              <p className="text-sm opacity-90">Excellent Learning Environment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
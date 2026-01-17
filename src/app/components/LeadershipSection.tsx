import { Target, Award, BookOpen, Users, Building2, GraduationCap } from 'lucide-react';
import chairmanPhoto from '@/assets/6ec240e1523b1edc178289599ef478c5bff42ede.png';

export function LeadershipSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">Our Leadership</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            Guided by visionary leaders committed to empowering women through quality education
          </p>
        </div>

        {/* About CES - Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-[#8B2C47] to-[#A63356] p-8 text-white">
            <h3 className="text-3xl mb-3">About Chandrawati Education Society</h3>
            <p className="text-white/90 leading-relaxed text-lg">
              Chandrawati Education Society (CES) is a registered body under the Registrar of Societies, 
              Government of NCT of Delhi. Promoted by eminent professionals from Medical, Engineering, Law, 
              Education, and Business backgrounds, CES is committed to excellence in higher education.
            </p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-[#8B2C47] mb-2">1500+</div>
                <div className="text-muted-foreground">Students Served</div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-[#8B2C47] mb-2">5+</div>
                <div className="text-muted-foreground">Institutions</div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-[#8B2C47] mb-2">20+</div>
                <div className="text-muted-foreground">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Quality Policy - Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-[#8B2C47]/10 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-[#8B2C47]" />
            </div>
            <h4 className="text-2xl mb-3 text-[#8B2C47]">Vision</h4>
            <p className="text-muted-foreground leading-relaxed">
              To be a leading institution in Engineering, Management, Pharmacy, and Nursing education by 
              fostering innovation, research, and interdisciplinary learning, and by setting future trends 
              in education and technology for societal development.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-[#8B2C47]/10 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-[#8B2C47]" />
            </div>
            <h4 className="text-2xl mb-3 text-[#8B2C47]">Mission</h4>
            <p className="text-muted-foreground leading-relaxed">
              To develop skilled, ethical, and industry-ready professionals through quality education, 
              strong industry interaction, leadership development, and a global outlook, while contributing 
              positively to society.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-[#8B2C47]/10 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-[#8B2C47]" />
            </div>
            <h4 className="text-2xl mb-3 text-[#8B2C47]">Quality Policy</h4>
            <p className="text-muted-foreground leading-relaxed">
              CES is committed to achieving academic excellence through continuous evaluation, innovative 
              teaching practices, practical learning, and value-based education, ensuring holistic development 
              of students with strong ethical foundations.
            </p>
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#8B2C47]/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-[#8B2C47]" />
            </div>
            <h4 className="text-2xl text-[#8B2C47]">Our Objectives</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8B2C47]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-[#8B2C47] font-bold">1</span>
              </div>
              <p className="text-muted-foreground">To provide quality professional education aligned with industry and societal needs</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8B2C47]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-[#8B2C47] font-bold">2</span>
              </div>
              <p className="text-muted-foreground">To strengthen institute–industry interaction through practical exposure and industrial visits</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8B2C47]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-[#8B2C47] font-bold">3</span>
              </div>
              <p className="text-muted-foreground">To promote overall personality and leadership development among students</p>
            </div>
          </div>
        </div>

        {/* Academic Excellence */}
        <div className="bg-gradient-to-r from-[#8B2C47] to-[#A63356] rounded-2xl shadow-lg p-8 text-white mb-12">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-10 h-10" />
            <h4 className="text-2xl">Academic Excellence</h4>
          </div>
          <p className="leading-relaxed text-lg text-white/95">
            The institutions under Chandrawati Education Society have consistently delivered outstanding 
            academic results and university merit positions. With dedicated faculty and strong management 
            support, CES continues to set benchmarks in academic performance while preparing students to 
            meet global challenges.
          </p>
        </div>

        {/* Institutions Under CES */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#8B2C47]/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[#8B2C47]" />
            </div>
            <h4 className="text-2xl text-[#8B2C47]">Institutions Under CES</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="https://rcew.ac.in" target="_blank" rel="noopener noreferrer" className="border-l-4 border-[#8B2C47] bg-gradient-to-r from-pink-50 to-transparent pl-4 py-3 rounded hover:bg-pink-100 transition-colors">
              <p className="font-medium text-gray-800">Rajasthan College Of Engineering For Women, Jaipur</p>
            </a>
            <a href="https://rietcr.org" target="_blank" rel="noopener noreferrer" className="border-l-4 border-[#8B2C47] bg-gradient-to-r from-pink-50 to-transparent pl-4 py-3 rounded hover:bg-pink-100 transition-colors">
              <p className="font-medium text-gray-800">Rajasthan Institute of Engineering & Technology, Jaipur</p>
            </a>
            <a href="https://rpc.ac.in" target="_blank" rel="noopener noreferrer" className="border-l-4 border-[#8B2C47] bg-gradient-to-r from-pink-50 to-transparent pl-4 py-3 rounded hover:bg-pink-100 transition-colors">
              <p className="font-medium text-gray-800">Rajasthan Pharmacy College, Jaipur</p>
            </a>
            <a href="https://rietcr.org" target="_blank" rel="noopener noreferrer" className="border-l-4 border-[#8B2C47] bg-gradient-to-r from-pink-50 to-transparent pl-4 py-3 rounded hover:bg-pink-100 transition-colors">
              <p className="font-medium text-gray-800">Rajasthan Institute of Engineering & Technology, Chittorgarh</p>
            </a>
            <a href="https://dronacharyapublicschool.com" target="_blank" rel="noopener noreferrer" className="border-l-4 border-[#8B2C47] bg-gradient-to-r from-pink-50 to-transparent pl-4 py-3 rounded hover:bg-pink-100 transition-colors">
              <p className="font-medium text-gray-800">Dronacharya Public School</p>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="border-l-4 border-[#8B2C47] bg-gradient-to-r from-pink-50 to-transparent pl-4 py-3 rounded hover:bg-pink-100 transition-colors">
              <p className="font-medium text-gray-800">Indraprastha Institute Of Nursing, Jaipur</p>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="border-l-4 border-[#8B2C47] bg-gradient-to-r from-pink-50 to-transparent pl-4 py-3 rounded hover:bg-pink-100 transition-colors">
              <p className="font-medium text-gray-800">Maharaja Surajmal Industrial Training Centre, DEEG</p>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="border-l-4 border-[#8B2C47] bg-gradient-to-r from-pink-50 to-transparent pl-4 py-3 rounded hover:bg-pink-100 transition-colors">
              <p className="font-medium text-gray-800">Maharaja Surajmal Industrial Training Centre, KUMHER</p>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="border-l-4 border-[#8B2C47] bg-gradient-to-r from-pink-50 to-transparent pl-4 py-3 rounded hover:bg-pink-100 transition-colors">
              <p className="font-medium text-gray-800">Beena Mahavidhyalaya, Jaipur</p>
            </a>
          </div>
        </div>
        
        {/* Chairman Profile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-96 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                <img 
                  src={chairmanPhoto}
                  alt="Chairman, Chandrawati Education Society" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl mb-1 font-bold">Dr. Jitendra Singh Faujdar</h3>
                <p className="text-lg mb-1">Chairman</p>
                <p className="text-primary">Chandrawati Education Society</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-xl p-8 shadow-lg flex items-center">
            <div>
              <h3 className="text-2xl mb-4 text-primary">Message from the Chairman</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With decades of experience in education and administration, our Chairman has been the 
                driving force behind the society's mission to empower women through quality technical education. 
                His visionary leadership has transformed RCEW into a premier institution, fostering excellence 
                in engineering education and creating pathways for women to excel in technology and innovation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Under his guidance, Chandrawati Education Society has expanded its reach across Rajasthan, 
                establishing multiple institutions that serve over 1500 students. His commitment to academic 
                excellence, industry partnerships, and holistic development has set new benchmarks in professional 
                education, ensuring that our graduates are well-prepared to meet global challenges and contribute 
                meaningfully to society.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
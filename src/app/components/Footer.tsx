import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo2.png';

export function Footer() {
  const importantLinks = [
    'Contact Us',
    'Admin Login'
  ];
  
  // const quickLinks = [
  //   'Disclaimer',
  //   'Terms & Conditions',
  //   'Refund Policy',
  //   'Privacy Policy',
  //   'Placements Notices',
  //   'ImpAdmin',
  //   'Clubs',
  //   'Committee',
  //   'Committee Women'
  // ];
  
  return (
    <footer className="bg-[#0a1929] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* College Info */}
          <div>
            <img src={logo} alt="CES Logo" className="w-18 h-18 flex-shrink-0 align-left" />
            <div className="flex items-start gap-4 mb-6 mt-4">
              <div>
                <h3 className="text-lg mb-2">CHANDRAWATI EDUCATION SOCIETY</h3>
                {/* <p className="text-sm text-white/80 mb-1">A Leading Exclusively Girls Engineering College in Jaipur, Rajasthan</p> */}
                <p className="text-xs text-white/70">Approved by AICTE / Affiliated to RTU / Recognized by Govt. of Raj.</p>
                <div className="inline-block bg-red-700 text-white text-xs px-3 py-1 mt-2 rounded">
                  ESTD. 1999
                </div>
              </div>
            </div>
            
            <p className="text-sm text-white/90 mb-6">
              Established in year 1999 Chandrawati Education Society aims to enable the girl empowerment through technical education which will help students to overcome barriers to reach greater heights.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-white/90" />
                <span className="text-sm text-white/90">C-28 Shakti Apartment, Sector-9, Rohini, New Delhi- 110085</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-white/90" />
                <span className="text-sm text-white/90">admin@rcew.ac.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-white/90" />
                <span className="text-sm text-white/90">director@rcew.ac.in</span>
              </div>
            </div>
          </div>
          

          {/* Important Links */}
          <div>
            <h3 className="text-lg mb-6 border-b border-white/20 pb-2">Important links</h3>
            <ul className="space-y-3">
              {importantLinks.map((link) => (
                <li key={link}>
                  {link === 'Contact Us' ? (
                    <a 
                      href="/contact" 
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/contact';
                      }}
                      className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                      {link}
                    </a>
                  ) : (
                    <Link 
                      to="/admin" 
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          {/* <div>
            <h3 className="text-lg mb-6 border-b border-white/20 pb-2">Quick links</h3>
            <ul className="space-y-3"> */}
              {/* {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))} */}
            {/* </ul>
          </div> */}
          
          {/* Admission Query & Contact */}

          <div className="text-left">
            <h3 className="text-lg mb-6 border-b border-white/20 pb-2">Admission Query</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm mb-1">Mr. Roshan Jain           +91 9001099930</p>

                <p className="text-sm mb-1">Mr. Raghav Dhaker        +91 6367475054</p>
               <p className="text-sm mb-1">Mrs. Sandeepa         +91 9001099917</p>
                <p className="text-sm text-white/80 mb-1">Email: admission@rcew.ac.in</p>

              </div>
            </div>
          </div>
        </div>
        
        {/* Social Media & Copyright */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} Chandrawati Education Society, Jaipur. All rights reserved.
            </p>
            
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/rcewjaipur1?igsh=MWw3c3V4OTRkZHpieA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/director-rcew-0478a234?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
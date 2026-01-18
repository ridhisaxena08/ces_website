import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/app/components/Button';
import logo from '@/assets/logo1.png';

interface NavLink {
  text: string;
  href: string;
  submenu?: Array<{ text: string; href: string }>;
}

interface HeaderProps {
  onApplyClick: () => void;
}

export function Header({ onApplyClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'Programs', href: '/#programs' },
    // { text: 'Academics', href: '/#academics' },
    { text: 'Scholarships', href: '/scholarship' },
    { text: 'Selection Process', href: '/selection-process' },
    { text: 'Career Paths', href: '/career-paths' },
    // { text: 'Results', href: '/#results' },
    { 
      text: 'Campus', 
      href: '#',
      submenu: [
        { text: 'Campus Overview', href: '/#campus' },
        { text: 'Campus Buildings', href: '/campus' },
        { text: 'Library & Study Areas', href: '/library' },
        { text: 'Hostel Facilities', href: '/hostel-facilities' }
      ]
    },
    { text: 'Contact', href: '/contact' },
  ];
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="CES Logo" className="w-12 h-12" />
            <div className="flex flex-col">
              <span className="text-base md:text-xl font-bold text-primary whitespace-nowrap" style={{ fontFamily: 'Georgia, serif' }}>
                Chandrawati Education Society
              </span>
              <span className="text-xs text-muted-foreground">Jaipur</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => (
              link.submenu ? (
                <div key={link.text} className="relative group">
                  <button className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors">
                    {link.text}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      {link.submenu.map((subItem) => (
                        <Link
                          key={subItem.text}
                          to={subItem.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-gray-50"
                        >
                          {subItem.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : link.href.startsWith('/') && !link.href.includes('#') ? (
                <Link
                  key={link.text}
                  to={link.href}
                  className="text-sm text-foreground hover:text-primary transition-colors"
                >
                  {link.text}
                </Link>
              ) : (
                <a
                  key={link.text}
                  href={link.href}
                  className="text-sm text-foreground hover:text-primary transition-colors"
                >
                  {link.text}
                </a>
              )
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              link.submenu ? (
                <div key={link.text} className="flex flex-col">
                  <div className="py-2 text-foreground font-medium">{link.text}</div>
                  <div className="pl-4 space-y-2 border-l-2 border-gray-100 my-1">
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.text}
                        to={subItem.href}
                        className="block py-1.5 text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.text}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : link.href.startsWith('/') && !link.href.includes('#') ? (
                <Link
                  key={link.text}
                  to={link.href}
                  className="py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.text}
                </Link>
              ) : (
                <a
                  key={link.text}
                  href={link.href}
                  className="py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.text}
                </a>
              )
            ))}
            <div className="pt-2">
              <Button 
                variant="primary" 
                className="w-full" 
                onClick={() => {
                  onApplyClick();
                  setMobileMenuOpen(false);
                }}
              >
                Apply Now
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
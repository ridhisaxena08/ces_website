import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/app/components/Button';
import logo from 'figma:asset/3b1c4adb05602675010d19d41b6b9c539c3ca44f.png';

interface HeaderProps {
  onApplyClick: () => void;
}

export function Header({ onApplyClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'Programs', href: '/#programs' },
    { text: 'Academics', href: '/#academics' },
    { text: 'Scholarships', href: '/scholarship' },
    { text: 'Selection Process', href: '/selection-process' },
    { text: 'Career Paths', href: '/career-paths' },
    { text: 'Results', href: '/#results' },
    { text: 'Campus', href: '/#campus' },
    { text: 'Contact', href: '/#contact' },
    { text: 'FAQs', href: '/#faqs' }
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
              link.href.startsWith('/') && !link.href.includes('#') ? (
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
              link.href.startsWith('/') && !link.href.includes('#') ? (
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
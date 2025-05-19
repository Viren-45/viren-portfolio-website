'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if link is active
  const isActive = (path: string) => {
    return pathname === path || (path !== '/' && pathname.startsWith(path));
  };

  // Handle smooth scroll for hash links
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only apply to hash links on the same page
    if (href.includes('#')) {
      e.preventDefault();
      
      // Extract the hash part
      const hashPart = href.split('#')[1];
      
      // If there's a hash part, scroll to it
      if (hashPart) {
        // If we're not on the homepage, navigate to homepage first
        if (pathname !== '/' && href.startsWith('/#')) {
          router.push('/');
          // Wait a bit for the navigation to complete before scrolling
          setTimeout(() => {
            const element = document.getElementById(hashPart);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } else {
          // We're already on the right page, just scroll
          const element = document.getElementById(hashPart);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
        
        // Close mobile menu if open
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-mono text-lg md:text-xl font-semibold hover:opacity-80 transition-opacity">
              <span className="text-gray-500">&lt;/</span>
              <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">Virendra</span>
              <span className="text-gray-500">&gt;</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8 text-gray-700">
              <Link 
                href="/#about" 
                className={`relative px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 ${
                  isActive('/about') ? 'border-b-2 border-black font-medium text-black' : ''
                }`}
                onClick={(e) => handleSmoothScroll(e, '/#about')}
              >
                About
              </Link>
              <Link 
                href="/#projects" 
                className={`relative px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 ${
                  isActive('/projects') ? 'border-b-2 border-black font-medium text-black' : ''
                }`}
                onClick={(e) => handleSmoothScroll(e, '/#projects')}
              >
                Projects
              </Link>
              <Link 
                href="/#certifications" 
                className={`relative px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 ${
                  isActive('/certifications') ? 'border-b-2 border-black font-medium text-black' : ''
                }`}
                onClick={(e) => handleSmoothScroll(e, '/#certifications')}
              >
                Certifications
              </Link>
              {/* <Link 
                href="/blogs" 
                className={`relative px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 ${
                  isActive('/blogs') ? 'border-b-2 border-black font-medium text-black' : ''
                }`}
              >
                Blogs
              </Link> */}
              <Link 
                href="/contact" 
                className={`relative px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 ${
                  isActive('/contact') ? 'border-b-2 border-black font-medium text-black' : ''
                }`}
                onClick={(e) => handleSmoothScroll(e, '/#contact')}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white border-t border-gray-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            href="/#about" 
            className={`block px-3 py-2 rounded-md hover:bg-gray-100 ${
              isActive('/about') ? 'border-l-2 border-black pl-2 text-black font-medium' : 'text-gray-700'
            }`}
            onClick={(e) => {
              handleSmoothScroll(e, '/#about');
              setIsMenuOpen(false);
            }}
          >
            About
          </Link>
          <Link 
            href="/projects" 
            className={`block px-3 py-2 rounded-md hover:bg-gray-100 ${
              isActive('/projects') ? 'border-l-2 border-black pl-2 text-black font-medium' : 'text-gray-700'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>
          <Link 
            href="/certifications" 
            className={`block px-3 py-2 rounded-md hover:bg-gray-100 ${
              isActive('/certifications') ? 'border-l-2 border-black pl-2 text-black font-medium' : 'text-gray-700'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Certifications
          </Link>
          {/* <Link 
            href="/blogs" 
            className={`block px-3 py-2 rounded-md hover:bg-gray-100 ${
              isActive('/blogs') ? 'border-l-2 border-black pl-2 text-black font-medium' : 'text-gray-700'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Blogs
          </Link> */}
          <Link 
            href="/#contact" 
            className={`block px-3 py-2 rounded-md hover:bg-gray-100 ${
              isActive('/contact') ? 'border-l-2 border-black pl-2 text-black font-medium' : 'text-gray-700'
            }`}
            onClick={(e) => {
              handleSmoothScroll(e, '/#contact');
              setIsMenuOpen(false);
            }}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
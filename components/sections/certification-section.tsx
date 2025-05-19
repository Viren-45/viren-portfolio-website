// components/sections/certification-section.tsx
'use client';

import { useState, useEffect } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import CertificationCardCarousel from '../certification/certification-card-carousel';
import { CertificationCardData } from '@/lib/adapters/certification-adapter';

interface CertificationSectionProps {
  certifications: CertificationCardData[];
}

export default function CertificationSection({ certifications }: CertificationSectionProps) {
  const [activeIndex, setActiveIndex] = useState(Math.min(2, certifications.length - 1)); // Start with middle card as active
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const maxIndex = certifications.length - 1;
  
  // Function to go to the next slide
  const nextSlide = () => {
    setActiveIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };
  
  // Function to go to the previous slide
  const prevSlide = () => {
    setActiveIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };
  
  // Auto play functionality
  useEffect(() => {
    if (isPaused || certifications.length <= 1) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds
    
    return () => clearInterval(interval);
  }, [isPaused, activeIndex, certifications.length]);
  
  // Handle touch events for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50; // Minimum swipe distance
    
    if (isSignificantSwipe) {
      if (distance > 0) {
        // Swipe left, go next
        nextSlide();
      } else {
        // Swipe right, go previous
        prevSlide();
      }
    }
    
    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  // If no certifications, return empty section with message
  if (certifications.length === 0) {
    return (
      <section className="py-20 bg-gray-50" id="certifications">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Certifications
          </h2>
          <div className="w-30 h-1.5 bg-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Certifications will be added soon. Check back later!
          </p>
        </div>
      </section>
    );
  }
  
  // Helper function to calculate the position and transform for each card
  const getCardStyle = (index: number) => {
    // Calculate the relative index (distance from active index)
    const items = certifications.length;
    let relativeIndex = index - activeIndex;
    
    // Handle wrapping for circular carousel
    if (relativeIndex < -2) {
      relativeIndex += items;
    } else if (relativeIndex > 2) {
      relativeIndex -= items;
    }
    
    // Calculate z-index - higher for cards closer to the center
    const zIndex = 20 - Math.abs(relativeIndex) * 5;
    
    // Different transformations based on relative position
    let transform = '';
    let opacity = 1;
    let scale = 1;
    
    if (relativeIndex === 0) {
      // Active card (center)
      transform = 'translateX(0%) translateZ(60px) rotateY(0)';
      opacity = 1;
      scale = 1;
    } else if (relativeIndex === 1) {
      // Card to the right of center
      transform = 'translateX(85%) translateZ(20px) rotateY(-5deg)';
      opacity = 0.9;
      scale = 0.85;
    } else if (relativeIndex === -1) {
      // Card to the left of center
      transform = 'translateX(-85%) translateZ(20px) rotateY(5deg)';
      opacity = 0.9;
      scale = 0.85;
    } else if (relativeIndex === 2) {
      // Card far right
      transform = 'translateX(160%) translateZ(-20px) rotateY(-10deg)';
      opacity = 0.7;
      scale = 0.7;
    } else if (relativeIndex === -2) {
      // Card far left
      transform = 'translateX(-160%) translateZ(-20px) rotateY(10deg)';
      opacity = 0.7;
      scale = 0.7;
    } else {
      // Hide other cards
      opacity = 0;
      transform = 'translateX(0) translateZ(-200px)';
      scale = 0.5;
    }
    
    return {
      transform,
      opacity,
      zIndex,
      scale
    };
  };
  
  // For single certification, show without carousel
  if (certifications.length === 1) {
    return (
      <section id="certifications" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              My Certification
            </h2>
            <div className="w-30 h-1.5 bg-indigo-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Professional certification that validates my expertise and commitment to continuous learning in the field of web development and design.
            </p>
          </div>
          
          {/* Single certification card */}
          <div className="max-w-md mx-auto">
            <CertificationCardCarousel certification={certifications[0]} />
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="certifications" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Certifications
          </h2>
          <div className="w-30 h-1.5 bg-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Professional certifications that validate my expertise and commitment to continuous learning in the field of web development and design.
          </p>
        </div>
        
        {/* 3D Carousel container */}
        <div className="relative max-w-6xl mx-auto perspective">
          {/* 3D Carousel stage */}
          <div 
            className="h-[550px] md:h-[500px] perspective-1200 relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* 3D scene container */}
            <div className="w-full h-full relative preserve-3d flex items-center justify-center">
              {certifications.map((certification, index) => {
                const style = getCardStyle(index);
                
                return (
                  <div 
                    key={certification.id}
                    className="absolute w-full max-w-[400px] transition-all duration-700 cursor-pointer"
                    style={{
                      transform: style.transform,
                      opacity: style.opacity,
                      zIndex: style.zIndex,
                      scale: `${style.scale}`
                    }}
                    onClick={() => {
                      // On card click, make it the active card
                      if (index !== activeIndex) {
                        setActiveIndex(index);
                      }
                    }}
                  >
                    <CertificationCardCarousel certification={certification} />
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* 3D effect shadow */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-6 bg-black/10 blur-xl rounded-full hidden md:block"></div>
          
          {/* Carousel indicators/dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {certifications.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-indigo-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* View All Certificates button */}
          <div className="flex justify-center mt-10">
          <Link 
            href="/certifications" 
            className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            View All Certificates
            <ExternalLink size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
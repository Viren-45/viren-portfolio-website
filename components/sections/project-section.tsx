// components/sections/project-section.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import ProjectCard from '@/components/projects/project-card';
import { adaptDatabaseProjects, ProjectCardData } from '@/lib/adapters/project-adapter';

// This component will take database-fetched projects as input
export default function ProjectsSection({ initialProjects }: { initialProjects: ProjectCardData[] }) {
  const [activeScreen, setActiveScreen] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState<ProjectCardData[]>([]);
  const [projects] = useState<ProjectCardData[]>(initialProjects);
  
  // Set fixed number of cards per screen based on screen size
  const [cardsPerScreen, setCardsPerScreen] = useState(3);
  
  // Setup responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerScreen(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerScreen(2);
      } else {
        setCardsPerScreen(3);
      }
    };
    
    handleResize(); // Initialize on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Total number of screens needed
  const totalScreens = Math.ceil(projects.length / cardsPerScreen);
  
  // Update visible projects when activeScreen changes
  useEffect(() => {
    const startIdx = activeScreen * cardsPerScreen;
    const endIdx = Math.min(startIdx + cardsPerScreen, projects.length);
    setVisibleProjects(projects.slice(startIdx, endIdx));
  }, [activeScreen, cardsPerScreen, projects]);
  
  // Navigate to previous screen
  const goToPrevious = () => {
    if (isAnimating || activeScreen <= 0) return;
    
    setIsAnimating(true);
    
    const container = document.querySelector('.carousel-container') as HTMLElement;
    if (container) {
      // Slide to the right (previous)
      container.style.transform = 'translateX(100%)';
      container.style.opacity = '0';
      
      setTimeout(() => {
        setActiveScreen(prev => prev - 1);
        // Reset position without animation
        container.style.transition = 'none';
        container.style.transform = 'translateX(-100%)';
        container.style.opacity = '0';
        
        // Force reflow
        void container.offsetWidth;
        
        // Slide back in from left
        container.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
        container.style.transform = 'translateX(0)';
        container.style.opacity = '1';
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }, 500);
    } else {
      setActiveScreen(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };
  
  // Navigate to next screen
  const goToNext = () => {
    if (isAnimating || activeScreen >= totalScreens - 1) return;
    
    setIsAnimating(true);
    
    const container = document.querySelector('.carousel-container') as HTMLElement;
    if (container) {
      // Slide to the left (next)
      container.style.transform = 'translateX(-100%)';
      container.style.opacity = '0';
      
      setTimeout(() => {
        setActiveScreen(prev => prev + 1);
        // Reset position without animation
        container.style.transition = 'none';
        container.style.transform = 'translateX(100%)';
        container.style.opacity = '0';
        
        // Force reflow
        void container.offsetWidth;
        
        // Slide back in from right
        container.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
        container.style.transform = 'translateX(0)';
        container.style.opacity = '1';
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }, 500);
    } else {
      setActiveScreen(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <section id="projects" className="py-16 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Projects</h2>
          <div className="w-16 h-1.5 bg-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Here are some of the projects I've worked on, showcasing my skills and experience in web development.
          </p>
        </div>
        
        {/* Simple Project Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Left Arrow */}
          {activeScreen > 0 && (
            <button 
              onClick={goToPrevious}
              disabled={isAnimating}
              className="absolute left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md z-10 flex items-center justify-center text-gray-700 hover:text-indigo-600"
              aria-label="Previous projects"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div className="carousel-container transition-all duration-500 ease-in-out">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {visibleProjects.map(project => (
                  <div key={project.id} className="flex justify-center">
                    <ProjectCard project={project} isActive={true} />
                  </div>
                ))}
                
                {/* Add empty placeholders for consistent sizing */}
                {visibleProjects.length < cardsPerScreen && Array.from({ length: cardsPerScreen - visibleProjects.length }).map((_, index) => (
                  <div key={`placeholder-${index}`} className="flex justify-center opacity-0">
                    <div style={{ width: '450px', height: '420px' }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Arrow */}
          {activeScreen < totalScreens - 1 && (
            <button 
              onClick={goToNext}
              disabled={isAnimating}
              className="absolute right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md z-10 flex items-center justify-center text-gray-700 hover:text-indigo-600"
              aria-label="Next projects"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
        
        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalScreens }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating && index !== activeScreen) {
                  setIsAnimating(true);
                  
                  // Determine slide direction
                  const direction = index > activeScreen ? 'next' : 'prev';
                  const container = document.querySelector('.carousel-container') as HTMLElement;
                  
                  if (container) {
                    // Slide out in the appropriate direction
                    container.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
                    container.style.opacity = '0';
                    
                    setTimeout(() => {
                      setActiveScreen(index);
                      // Reset position without animation
                      container.style.transition = 'none';
                      container.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
                      
                      // Force reflow
                      void container.offsetWidth;
                      
                      // Slide back in
                      container.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
                      container.style.transform = 'translateX(0)';
                      container.style.opacity = '1';
                      
                      setTimeout(() => {
                        setIsAnimating(false);
                      }, 500);
                    }, 500);
                  } else {
                    setActiveScreen(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }
              }}
              className={`rounded-full transition-all ${
                activeScreen === index
                  ? 'bg-indigo-600 w-8 h-2' 
                  : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
              }`}
              aria-label={`Go to project set ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>
        
        {/* View All Projects Button */}
        <div className="mt-16 text-center">
          <Link 
            href="/projects" 
            className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            View All Projects
            <ExternalLink size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
'use client';

import { ArrowDown, Mail } from 'lucide-react';
import Link from 'next/link';
import TechStack from '@/components/tech-stack/tech-stack';
import { useState, useEffect } from 'react';

export default function HomeSection() {
  // State for the typing effect
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // Array of roles to display in the typing animation
  const roles = [
    'Junior Web Developer',
    'React Developer',
    'JavaScript Engineer',
    'MERN Stack Developer',
    'Cybersecurity Analyst'
  ];
  
  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[loopNum % roles.length];
    
    const handleTyping = () => {
      setDisplayText(currentRole.substring(0, isDeleting 
        ? displayText.length - 1 
        : displayText.length + 1
      ));
      
      // Set typing speed based on current action
      setTypingSpeed(isDeleting ? 80 : 150);
      
      // If completed typing the word
      if (!isDeleting && displayText === currentRole) {
        // Pause at the end of typing a complete word
        setTimeout(() => setIsDeleting(true), 1500);
      } 
      // If deleted the word
      else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, roles, typingSpeed]);
  
  return (
    <section className="min-h-[90vh] flex items-center justify-center">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0 1px,transparent 1px)] bg-[size:20px_20px] opacity-30 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Header with typing animation */}
          <div className="space-y-5">
            <div className="inline-block px-4 py-2 bg-indigo-50 rounded-full">
              <p className="text-indigo-600 font-medium">Welcome to my portfolio</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
              Crafting Digital <span className="text-indigo-600">Experiences</span>
            </h1>
            <div className="h-16 flex items-center justify-center">
              <h2 className="text-2xl md:text-3xl text-gray-700 font-light inline-flex items-center">
                I am a <span className="text-indigo-600 font-medium ml-2 border-r-2 border-indigo-600 pr-1">{displayText}</span>
              </h2>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            I build exceptional digital experiences with modern technologies.
            Specializing in creating responsive, user-friendly applications
            that solve real-world problems.
          </p>
          
          {/* Tech stack */}
          <div className="py-4">
            <TechStack />
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/projects" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md w-full sm:w-auto justify-center font-medium"
            >
              Explore My Work
              <ArrowDown size={18} />
            </Link>
            
            <Link 
              href="/contact" 
              className="bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-200 px-8 py-4 rounded-lg flex items-center gap-2 transition-all duration-300 w-full sm:w-auto justify-center font-medium"
            >
              Let's Connect
              <Mail size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
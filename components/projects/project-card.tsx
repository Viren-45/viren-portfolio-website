// components/projects/project-card.tsx
'use client';
import { useState } from 'react';
import { Github, ExternalLink, Star, Circle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectCardData } from '@/lib/adapters/project-adapter';

interface ProjectCardProps {
  project: ProjectCardData;
  isActive: boolean;
}

export default function ProjectCard({ project, isActive }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format domain for browser bar
  const getDomain = (url: string | null) => {
    if (!url) return 'localhost:3000/projects/' + project.id;
    try {
      const domain = new URL(url).hostname;
      return domain;
    } catch {
      return url;
    }
  };
  
  return (
    <div 
      className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 group hover:shadow-xl"
      style={{ width: '100%', height: '420px', maxWidth: '450px' }} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Browser-like Header */}
      <div className="bg-gray-100 px-4 py-2 flex items-center justify-between border-b border-gray-200">
        {/* Browser Controls */}
        <div className="flex items-center gap-1.5">
          <Circle size={10} className="text-red-500 fill-red-500" />
          <Circle size={10} className="text-yellow-400 fill-yellow-400" />
          <Circle size={10} className="text-green-500 fill-green-500" />
        </div>
        
        {/* Browser URL */}
        <div className="flex-1 mx-3">
          <div className="bg-white text-gray-500 text-xs px-3 py-1 rounded-full truncate text-center">
            {getDomain(project.url)}
          </div>
        </div>
        
        {/* Browser Menu */}
        <div className="w-4"></div>
      </div>
    
      {/* Featured Badge - Always visible */}
      {project.featured && (
        <div className="absolute top-12 right-3 z-10">
          <span className="bg-indigo-600/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1 font-medium shadow-md">
            <Star size={12} className="fill-white" /> Featured
          </span>
        </div>
      )}
      
      {/* Project Image - Edge to Edge */}
      <div className="absolute top-[40px] bottom-0 left-0 right-0">
        <div className="relative w-full h-full">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            onError={(e) => {
              // @ts-ignore - currentTarget.onerror exists but TypeScript doesn't recognize it
              e.currentTarget.onerror = null; 
              e.currentTarget.src = `https://placehold.co/600x400/e2e8f0/a1a1aa?text=${encodeURIComponent(project.title)}`;
            }}
          />
        </div>
      </div>
      
      {/* Gradient Overlay - Always visible but darker on hover */}
      <div 
        className="absolute top-[40px] bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90"
      ></div>
      
      {/* Project Info - Slides up on hover */}
      <div 
        className={`absolute inset-x-0 bottom-0 p-6 transform transition-transform duration-300 ease-in-out ${
          isHovered ? 'translate-y-0' : 'translate-y-[calc(100%-90px)]'
        }`}
      >
        {/* Title - Always visible */}
        <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-md">{project.title}</h3>
        
        {/* Description - Only visible on hover */}
        <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-100 text-sm mb-5 line-clamp-3">{project.description}</p>
          
          {/* Technology Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techs.map((tech, index) => (
              <span 
                key={index}
                className={`${tech.color} text-white text-xs px-2.5 py-1 rounded-md shadow-sm`}
              >
                {tech.name}
              </span>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.url ? (
              <Link 
                href={project.url}
                target="_blank"
                className="flex-1 flex items-center justify-center gap-1 text-sm font-medium bg-white hover:bg-gray-100 text-gray-800 py-2.5 px-4 rounded-md transition-colors"
              >
                <ExternalLink size={14} /> Live Demo
              </Link>
            ) : (
              <span className="flex-1 flex items-center justify-center gap-1 text-sm font-medium bg-white/30 text-white/70 py-2.5 px-4 rounded-md backdrop-blur-sm cursor-not-allowed">
                <ExternalLink size={14} /> Demo Unavailable
              </span>
            )}
            
            {project.repo ? (
              <Link 
                href={project.repo}
                target="_blank"
                className="flex-1 flex items-center justify-center gap-1 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-md transition-colors"
              >
                <Github size={14} /> View Code
              </Link>
            ) : (
              <span className="flex-1 flex items-center justify-center gap-1 text-sm font-medium bg-indigo-600/40 text-white/70 py-2.5 px-4 rounded-md backdrop-blur-sm cursor-not-allowed">
                <Github size={14} /> Private Repo
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
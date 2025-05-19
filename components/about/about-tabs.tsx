'use client';
import { useState } from 'react';
import { User, Building, Briefcase, Download, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import Link from 'next/link';

// Define the type for tab IDs
type TabType = 'about' | 'culixo' | 'experience';

// Define type for experience IDs
type ExperienceId = 'coding' | 'pizzahut' | 'tdbank' | null;

// Experience interface
interface Experience {
  id: ExperienceId;
  role: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
  transferableSkills: string[];
}

// Create a single unified component like TechStack
export default function AboutTabs() {
  // State for active tab and experience
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [expandedExperience, setExpandedExperience] = useState<ExperienceId>(null);

  // Handler function for tab change (exactly like handleCategoryChange in TechStack)
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Toggle experience accordion
  const toggleExperience = (id: ExperienceId) => {
    setExpandedExperience(expandedExperience === id ? null : id);
  };

  // Experience data with proper typing
  const experiences: Experience[] = [
    {
      id: 'tdbank',
      role: 'Customer Service Representative',
      company: 'TD Bank',
      period: 'Nov 2023 - Present',
      description: 'Provided comprehensive customer service in a professional banking environment.',
      responsibilities: [
        'Processed customer transactions and account inquiries with high accuracy',
        'Resolved customer issues related to banking products and services',
        'Maintained strict confidentiality and security protocols for financial information',
        'Recommended appropriate banking products based on customer needs',
        'Utilized multiple banking software platforms to serve customers efficiently'
      ],
      transferableSkills: [
        'Clear and professional communication',
        'Detail-oriented with high accuracy standards',
        'Ability to learn and navigate complex software systems',
        'Data privacy and security awareness',
        'Problem-solving and analytical thinking'
      ]
    },
    {
      id: 'coding',
      role: 'Frontend Engineering Intern',
      company: '8 Time Coding',
      period: 'Jan 2024 - April 2024',
      description: 'Developed responsive web interfaces and features using modern frontend technologies in a collaborative development environment.',
      responsibilities: [
        'Designed, developed, and maintained scalable and reliable frontend and backend systems at 8 Time Coding',
        'Collaborated with cross-functional teams to comprehensively understand project requirements',
        'Implemented and optimized database structures and queries to enhance system performance',
        'Wrote efficient, maintainable, and testable code to ensure high-quality deliverables',
        'Troubleshooted, debugged, and resolved technical issues promptly to minimize downtime and ensure seamless operation'
      ],
      transferableSkills: [
        'Analytical thinking & problem-solving',
        'Adaptability & quick learning',
        'Systematic troubleshooting',
        'Team collaboration',
        'Clear and structured communication'
      ]
    },
    {
      id: 'pizzahut',
      role: 'Assistant Manager',
      company: 'Pizza Hut',
      period: 'Dec 2021 - April 2023',
      description: 'Oversaw restaurant operations and team performance to ensure quality service and food preparation.',
      responsibilities: [
        'Managed daily operations including inventory control, staff scheduling, and cash handling, maintaining accuracy in all transactions',
        'Increased customer satisfaction scores by 15% through implementing enhanced service standards and addressing customer feedback',
        'Monitored and maintained food safety and quality control standards in compliance with health regulations',
        'Assisted in hiring, onboarding, and training new team members to maintain consistent service standards',
      ],
      transferableSkills: [
        'Project management and prioritization',
        'Financial accountability and attention to detail',
        'Crisis management and quick decision-making',
        'Cross-functional team coordination',
        'Training and mentorship capabilities'
      ]
    },
  ];

  // Tab content object (using the pattern from your working example)
  const tabContent = {
    'about': (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Hello! I'm Virendra, an aspiring Full Stack Developer with a passion for building modern web applications that solve real-world problems. I specialize in JavaScript-based technologies like React, Node.js, and Next.js.
        </p>
        <p className="text-gray-700 leading-relaxed">
          My journey in web development began with a curiosity about how websites work, which led me to explore HTML, CSS, and JavaScript. Since then, I've expanded my knowledge to include modern frameworks and libraries that enable me to create responsive, user-friendly applications.
        </p>
        <p className="text-gray-700 leading-relaxed">
          I'm constantly learning and improving my skills through personal projects, online courses, and community involvement. My goal is to join a team where I can contribute my skills while continuing to grow as a developer.
        </p>
        <div className="pt-4">
          <Link 
            href="/resume.pdf" 
            target="_blank"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg transition-colors shadow-md"
          >
            <Download size={18} />
            Download Resume
          </Link>
        </div>
      </div>
    ),
    'culixo': (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Culixo</h3>
            <p className="text-indigo-600 font-medium mb-4">
              A community-driven recipe sharing platform
            </p>
            <div className="space-y-4 text-gray-700">
              <p>
                Culixo is a startup I'm currently developing that aims to revolutionize how people share and discover recipes online. The platform creates a vibrant community where cooking enthusiasts can connect, share their culinary creations, and discover new dishes from around the world.
              </p>
              <p>
                As the technical founder, I'm responsible for developing the entire platform from conceptualization to implementation. This project has been an incredible opportunity to apply my full-stack development skills in a real-world entrepreneurial context.
              </p>
              <p>
                The platform is currently under development with core features including user recipe uploads, social interaction, advanced recipe search, and personalized recommendations based on user preferences.
              </p>
            </div>
            
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Technology Stack
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'AWS'].map((tech, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100 flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
            <div className="relative w-full h-64">
              {/* Replace this placeholder with actual image */}
              <img 
                src="/images/culixo-screenshot.png" 
                alt="Culixo platform screenshot" 
                className="object-cover w-full h-full"
                // If the image fails to load, show a fallback
                onError={(e) => {
                  e.currentTarget.onerror = null; // Prevents infinite callback loop
                  e.currentTarget.style.display = 'none'; // Hide the img element
                  e.currentTarget.parentElement?.querySelector('.fallback')?.classList.remove('hidden');
                }}
              />
              {/* Fallback display if image doesn't load */}
              <div className="fallback hidden absolute inset-0 flex items-center justify-center bg-gray-100">
                <p className="text-gray-500 text-sm">Culixo platform screenshot</p>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Project Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Overall Progress</span>
                  <span className="text-indigo-600 font-medium">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <p className="text-gray-700 mt-2 text-sm">
                  Currently focusing on user authentication, recipe upload functionality, and core database architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">What I've Learned</h3>
          <p className="text-gray-700 mb-4">
            Building Culixo has been an incredible learning journey. Beyond technical skills, I've gained valuable experience in:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Product planning and roadmap development",
              "User experience design and usability testing",
              "Database schema optimization for scalability",
              "Performance optimization for better user experience",
              "Security best practices for user data protection",
              "Project management and feature prioritization"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    'experience': (
      <div className="space-y-6">
        <p className="text-gray-700 mb-6">
          While I'm transitioning into a tech career, my previous professional experience has equipped me with valuable transferable skills that enhance my capabilities as a developer.
        </p>
        
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggleExperience(exp.id)} 
                className={`w-full flex justify-between items-center p-4 text-left ${
                  expandedExperience === exp.id ? 'bg-indigo-50' : 'bg-white'
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>{exp.company}</span>
                    <span className="text-gray-400">•</span>
                    <span className="flex items-center gap-1 text-sm">
                      <Calendar size={14} />
                      {exp.period}
                    </span>
                  </div>
                </div>
                {expandedExperience === exp.id ? 
                  <ChevronUp size={20} className="text-indigo-600" /> : 
                  <ChevronDown size={20} className="text-gray-400" />
                }
              </button>
              
              {expandedExperience === exp.id && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  <p className="text-gray-700 mb-4">{exp.description}</p>
                  
                  <h4 className="font-medium text-gray-900 mb-2">Key Responsibilities:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                    {exp.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  
                  <h4 className="font-medium text-gray-900 mb-2">Transferable Skills:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                    {exp.transferableSkills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-md">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-gray-200/50">
      {/* Tab Navigation - Centered and with border bottom */}
      <div className="flex flex-wrap justify-center border-b border-gray-200">
        <button
          onClick={() => handleTabChange('about')}
          className={`px-4 py-3 text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeTab === 'about'
              ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
              : 'text-gray-600 hover:text-indigo-500 hover:bg-gray-50'
          }`}
        >
          <User size={16} /> About Me
        </button>

        <button
          onClick={() => handleTabChange('culixo')}
          className={`px-4 py-3 text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeTab === 'culixo'
              ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
              : 'text-gray-600 hover:text-indigo-500 hover:bg-gray-50'
          }`}
        >
          <Building size={16} /> My Startup
        </button>

        <button
          onClick={() => handleTabChange('experience')}
          className={`px-4 py-3 text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeTab === 'experience'
              ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
              : 'text-gray-600 hover:text-indigo-500 hover:bg-gray-50'
          }`}
        >
          <Briefcase size={16} /> Experience
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8 transition-all duration-300">
        {tabContent[activeTab]}
      </div>
    </div>
  );
}
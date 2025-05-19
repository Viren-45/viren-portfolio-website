'use client';
import { Terminal, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

// Define types for our tech stack data
type TechItem = {
  name: string;
  iconClass: string;
};

type TechStackDataType = {
  languages: TechItem[];
  frameworks: TechItem[];
  databases: TechItem[];
  tools: TechItem[];
};

// Tech stack data organized by category
const techStackData: TechStackDataType = {
  languages: [
    { name: "JavaScript", iconClass: "devicon-javascript-plain colored" },
    { name: "TypeScript", iconClass: "devicon-typescript-plain colored" },
    { name: "Python", iconClass: "devicon-python-plain colored" },
    { name: "Java", iconClass: "devicon-java-plain colored" },
    { name: "HTML5", iconClass: "devicon-html5-plain colored" },
    { name: "CSS3", iconClass: "devicon-css3-plain colored" },
    { name: "PHP", iconClass: "devicon-php-plain colored" },
    { name: "C#", iconClass: "devicon-csharp-plain colored" }
  ],
  frameworks: [
    { name: "React", iconClass: "devicon-react-original colored" },
    { name: "Next.js", iconClass: "devicon-nextjs-plain colored" },
    { name: "Node.js", iconClass: "devicon-nodejs-plain colored" },
    { name: "Express", iconClass: "devicon-express-original" },
    { name: "Angular", iconClass: "devicon-angularjs-plain colored" },
    { name: ".NET", iconClass: "devicon-dot-net-plain colored" },
    { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-plain colored" }
  ],
  databases: [
    { name: "MongoDB", iconClass: "devicon-mongodb-plain colored" },
    { name: "MySQL", iconClass: "devicon-mysql-plain colored" },
    { name: "PostgreSQL", iconClass: "devicon-postgresql-plain colored" },
    { name: "MS SQL Server", iconClass: "devicon-microsoftsqlserver-plain colored" },
    { name: "Oracle", iconClass: "devicon-oracle-plain colored" }
  ],
  tools: [
    { name: "Git", iconClass: "devicon-git-plain colored" },
    { name: "GitHub", iconClass: "devicon-github-original colored" },
    { name: "VS Code", iconClass: "devicon-vscode-plain colored" },
    { name: "Vercel", iconClass: "devicon-vercel-original-wordmark colored" },
    { name: "Docker", iconClass: "devicon-docker-plain colored" },
    { name: "Figma", iconClass: "devicon-figma-plain colored" },
    { name: "AWS", iconClass: "devicon-amazonwebservices-plain-wordmark colored" }
  ]
};

// Type for the available categories
type CategoryType = keyof typeof techStackData;

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("languages");
  const [deviconLoaded, setDeviconLoaded] = useState(false);

  // Load devicon CSS
  useEffect(() => {
    if (!document.getElementById('devicon-css')) {
      const link = document.createElement('link');
      link.id = 'devicon-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
      link.onload = () => setDeviconLoaded(true);
      document.head.appendChild(link);
    } else {
      setDeviconLoaded(true);
    }
  }, []);

  // Function to handle category change
  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
  };

  return (
    <div className="py-8 px-6 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200/50 shadow-lg overflow-hidden">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Terminal size={16} className="text-indigo-500" />
        <span className="text-gray-700 text-sm font-medium">My Tech Stack</span>
      </div>
      
      {/* Category tabs - centered */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {(Object.keys(techStackData) as CategoryType[]).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 text-sm rounded-md transition-all duration-300 ${
              activeCategory === category
                ? "bg-indigo-100 text-indigo-700 font-medium shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-indigo-600 hover:cursor-pointer"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
            {activeCategory === category && <ChevronRight className="inline ml-1" size={14} />}
          </button>
        ))}
      </div>

      {/* Scrolling tech icons */}
      <div className="relative w-full overflow-hidden py-4">
        <div className="flex animate-scroll whitespace-nowrap">
          <div className="flex gap-8 items-center mx-4">
            {/* First set of icons */}
            <div className="flex items-center gap-8">
              {techStackData[activeCategory].map((tech, index) => (
                <div key={`tech-1-${index}`} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 flex items-center justify-center bg-white/80 rounded-xl border border-gray-100 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-white">
                    <i className={`${tech.iconClass} text-3xl`}></i>
                  </div>
                  <span className="text-xs font-medium text-gray-700">{tech.name}</span>
                </div>
              ))}
            </div>
            
            {/* Duplicate for seamless scrolling */}
            <div className="flex items-center gap-8">
              {techStackData[activeCategory].map((tech, index) => (
                <div key={`tech-2-${index}`} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 flex items-center justify-center bg-white/80 rounded-xl border border-gray-100 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-white">
                    <i className={`${tech.iconClass} text-3xl`}></i>
                  </div>
                  <span className="text-xs font-medium text-gray-700">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add custom styles for the animation */}
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
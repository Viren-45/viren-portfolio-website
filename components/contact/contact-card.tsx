import React from 'react';

interface ContactCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
}

export default function ContactCard({ title, description, icon, colorClass }: ContactCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Icon */}
        <div className={`p-3 rounded-lg w-fit mb-5 ${colorClass}`}>
          {icon}
        </div>
        
        {/* Content */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
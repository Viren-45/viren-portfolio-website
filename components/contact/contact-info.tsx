import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ContactInfoItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  link: string;
}

interface ContactInfoProps {
  contactInfo: ContactInfoItem[];
}

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
  return (
    <div className="space-y-6">
      {contactInfo.map((item, index) => (
        <div key={index} className="flex items-start">
          <div className="flex-shrink-0 mt-1">{item.icon}</div>
          <div className="">
            <p className="text-sm text-indigo-200">{item.label}</p>
            <a 
              href={item.link}
              className="text-white hover:text-indigo-200 transition-colors duration-300"
              target={item.link.startsWith('http') ? '_blank' : undefined}
              rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {item.value}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
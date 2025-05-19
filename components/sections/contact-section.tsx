'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  MessageSquare, 
  FileCode2, 
  GraduationCap
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import ContactForm from '@/components/contact/contact-form';
import ContactInfo from '@/components/contact/contact-info';
import SocialLinks from '@/components/contact/social-links';
import ContactCard from '@/components/contact/contact-card';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  
  // Initialize EmailJS when the component mounts
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;
    emailjs.init(publicKey);
  }, []);
  
  // Mock data for contact cards
  const contactCards = [
    {
      id: 'freelance',
      title: 'Freelance Projects',
      description: 'Have a project in mind? Let\'s discuss how I can help bring your ideas to life.',
      icon: <FileCode2 size={24} />,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      id: 'general',
      title: 'General Inquiries',
      description: 'Questions about my services or work experience? Feel free to reach out.',
      icon: <MessageSquare size={24} />,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 'mentorship',
      title: 'Mentorship',
      description: 'Looking for guidance in web development? I am happy to share my knowledge.',
      icon: <GraduationCap size={24} />,
      color: 'bg-teal-50 text-teal-600'
    }
  ];
  
  // Contact information
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-indigo-600" />,
      label: 'Email',
      value: '2000viren@gmail.com',
      link: 'mailto:2000viren@gmail.com'
    },
    {
      icon: <Phone className="h-6 w-6 text-indigo-600" />,
      label: 'Phone',
      value: '+1 (647) 878-2051',
      link: 'tel:+16478782051'
    },
    {
      icon: <MapPin className="h-6 w-6 text-indigo-600" />,
      label: 'Location',
      value: 'Ottawa, ON',
      link: 'https://maps.google.com/?q=Ottawa,ON'
    }
  ];

  const handleFormSubmit = async (formData: any) => {
    // This is where you would send the form data to your backend/API
    console.log('Form data submitted:', formData);
    
    // Set submitted state to true to show success message
    setSubmitted(true);
    
    // Reset form after some time
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
    
    return formData; // Return the data to clear the form in the child component
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 bg-indigo-50 rounded-full mb-4">
            <p className="text-indigo-600 font-medium flex items-center justify-center">
              <Mail className="mr-2" size={18} />
              Let's Connect
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get In <span className="text-indigo-600">Touch</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Have a project in mind or want to discuss potential opportunities? I'm just a message away.
          </p>
        </div>
        
        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactCards.map(card => (
            <ContactCard 
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              colorClass={card.color}
            />
          ))}
        </div>
        
        {/* Contact content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-5">
            {/* Contact info sidebar */}
            <div className="md:col-span-2 bg-indigo-600 text-white p-8 md:p-10 relative">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white opacity-10 transform translate-x-8 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white opacity-10 transform -translate-x-20 translate-y-10"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="mb-8 text-indigo-100">
                  Feel free to reach out through any of these channels. I'm always open to discussing new projects and opportunities.
                </p>
                
                {/* Contact details */}
                <div className="space-y-6 mb-10">
                  <ContactInfo contactInfo={contactInfo} />
                </div>
                
                {/* Social links */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
                  <SocialLinks />
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="md:col-span-3 p-8 md:p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Me a Message</h3>
              
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h4>
                  <p className="text-gray-600 max-w-md">
                    Thanks for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <ContactForm onSubmit={handleFormSubmit} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Github, Linkedin, Twitter, Instagram, Codepen } from 'lucide-react';

export default function SocialLinks() {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github size={20} />,
      url: 'https://github.com/Viren-45',
      ariaLabel: 'GitHub Profile'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      url: 'https://linkedin.com/in/virendra-purohit',
      ariaLabel: 'LinkedIn Profile'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={20} />,
      url: 'https://twitter.com/viren_45',
      ariaLabel: 'Twitter Profile'
    },
  ];

  return (
    <div className="flex space-x-3">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.ariaLabel}
          className="bg-indigo-700 hover:bg-indigo-800 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group"
        >
          <span className="text-white group-hover:scale-110 transition-transform duration-300">
            {link.icon}
          </span>
        </a>
      ))}
    </div>
  );
}
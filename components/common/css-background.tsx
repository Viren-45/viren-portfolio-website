// components/backgrounds/CSSBackground.tsx
"use client";

import { cn } from '@/lib/utils';

const CSSBackground = () => {
  return (
    <>
      {/* Main background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030305]">
        {/* Grid perspective background */}
        <div 
          className="absolute w-full h-[200%] opacity-60 transition-all duration-300"
          style={{
            transform: 'perspective(1000px) rotateX(60deg) translateY(-50%) translateZ(0)',
            backgroundImage:
              'linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 2px), linear-gradient(rgba(255,255,255,0.1) 1px, transparent 2px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient light effects */}
        <div className="absolute -top-20 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl bg-primary-20 opacity-50" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl bg-blue-500/20 opacity-50" />
      </div>

      {/* Navbar gradient */}
      <div className="fixed top-0 left-0 right-0 h-24 z-0 pointer-events-none transition-all duration-300 bg-gradient-to-b from-background via-background/90 to-transparent" />

      {/* Footer gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-24 z-0 pointer-events-none transition-all duration-300 bg-gradient-to-t from-background to-transparent" />
    </>
  );
};

export default CSSBackground;

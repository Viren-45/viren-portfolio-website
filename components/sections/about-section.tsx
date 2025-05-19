'use client';
import AboutTabs from '@/components/about/about-tabs';

export default function AboutSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Heading - Moved from AboutTabs */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Aspiring developer with a passion for creating exceptional web experiences and solving real-world problems.
            </p>
          </div>
          
          {/* AboutTabs component */}
          <AboutTabs />
        </div>
      </div>
    </section>
  );
}
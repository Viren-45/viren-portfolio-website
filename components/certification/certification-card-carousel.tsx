// components/certification/certification-card-carousel.tsx
'use client';

import { Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CertificationCardData } from '@/lib/adapters/certification-adapter';
import { useState } from 'react';

interface CertificationCardCarouselProps {
  certification: CertificationCardData;
}

const CertificationCardCarousel = ({ certification }: CertificationCardCarouselProps) => {
  const {
    title,
    provider,
    issueDate,
    credentialUrl,
    imageUrl,
    badgeColor
  } = certification;

  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Format date to be more readable
  const formattedDate = new Date(issueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-full transform hover:shadow-lg transition-all duration-300">
        {/* Certificate Image - Full Width and Square */}
        <div className="relative w-full aspect-[4/3] bg-indigo-200/20">
          {imageUrl && !imageError ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={imageUrl}
                alt={`${title} certificate`}
                fill
                className="object-contain p-4"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => setImageError(true)}
                onLoad={() => setImageLoading(false)}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div 
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                style={{ backgroundColor: badgeColor }}
              >
                <span className="text-white text-2xl font-bold">
                  {provider.charAt(0)}
                </span>
              </div>
              <p className="text-gray-500">Certificate image not available</p>
            </div>
          )}
          
          {/* Provider Badge */}
          <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 shadow-md">
            <span className="text-sm font-medium" style={{ color: badgeColor }}>{provider}</span>
          </div>
        </div>
        
        {/* Certificate Details */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{title}</h3>
          
          <div className="flex items-center text-gray-600 mb-4">
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            <span>{formattedDate}</span>
          </div>
          
          {/* Credential Link */}
          {credentialUrl && (
            <Link 
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
            >
              View Credential
              <ExternalLink size={16} className="ml-1 flex-shrink-0" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationCardCarousel;
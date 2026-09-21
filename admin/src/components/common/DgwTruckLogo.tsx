import React from 'react';

interface DgwTruckLogoProps {
  className?: string;
  alt?: string;
}

export const DgwTruckLogo: React.FC<DgwTruckLogoProps> = ({ 
  className = 'h-9 w-auto',
  alt = 'DGW Solutions LLC'
}) => {
  return (
    <div className="relative flex items-center justify-center shrink-0">
      <img 
        src="/dgw-logo.png" 
        alt={alt}
        width={1024}
        height={512}
        className={`object-contain ${className}`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

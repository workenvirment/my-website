import React from 'react';

interface DgwLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const DgwLogo: React.FC<DgwLogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const heightClass = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11 md:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-16 sm:h-20'
  }[size];

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src="/images/dgw-logo.png"
        alt="DGW Solutions LLC"
        width={1024}
        height={512}
        className={`${heightClass} w-auto object-contain transition-transform duration-200`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

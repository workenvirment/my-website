import React from 'react';

interface DgwTruckLogoProps {
  className?: string;
}

export const DgwTruckLogo: React.FC<DgwTruckLogoProps> = ({ 
  className = 'w-10 h-10'
}) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg 
        viewBox="0 0 120 70" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
      >
        {/* Speed streak lines behind the truck */}
        <path d="M 5 18 L 35 18" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <path d="M 2 26 L 40 26" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
        <path d="M 8 34 L 38 34" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <path d="M 12 42 L 42 42" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        
        {/* Trailer body */}
        <rect x="38" y="14" width="38" height="34" rx="2" fill="#1E40AF" stroke="#60A5FA" strokeWidth="1.5" />
        <line x1="44" y1="18" x2="44" y2="44" stroke="#3B82F6" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="56" y1="18" x2="56" y2="44" stroke="#3B82F6" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="68" y1="18" x2="68" y2="44" stroke="#3B82F6" strokeWidth="1" strokeDasharray="2 2" />

        {/* Semi Cab Body */}
        <path 
          d="M 76 26 L 86 26 L 94 36 L 102 38 L 104 48 L 76 48 Z" 
          fill="#3B82F6" 
          stroke="#93C5FD" 
          strokeWidth="1.5" 
        />

        {/* Windshield */}
        <path 
          d="M 87 28 L 93 36 L 82 36 L 82 28 Z" 
          fill="#E0F2FE" 
          opacity="0.9" 
        />

        {/* Front Grill & Bumper */}
        <rect x="101" y="40" width="3" height="8" rx="1" fill="#93C5FD" />
        <rect x="100" y="47" width="6" height="3" rx="1" fill="#60A5FA" />
        {/* Headlight */}
        <circle cx="102" cy="42" r="1.5" fill="#FEF08A" />

        {/* Exhaust Stack */}
        <rect x="78" y="8" width="2.5" height="18" rx="1" fill="#93C5FD" />
        <path d="M 77 8 L 81 8" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />

        {/* Aerodynamic Cab Roof Fairing */}
        <path d="M 76 26 Q 82 18 86 26 Z" fill="#60A5FA" stroke="#93C5FD" strokeWidth="1" />

        {/* Chassis undercarriage line */}
        <line x1="40" y1="48" x2="102" y2="48" stroke="#1E293B" strokeWidth="3" />

        {/* Rear Wheels */}
        <circle cx="48" cy="50" r="6" fill="#0F172A" stroke="#60A5FA" strokeWidth="2" />
        <circle cx="48" cy="50" r="2.5" fill="#93C5FD" />
        
        <circle cx="62" cy="50" r="6" fill="#0F172A" stroke="#60A5FA" strokeWidth="2" />
        <circle cx="62" cy="50" r="2.5" fill="#93C5FD" />

        {/* Front Wheels */}
        <circle cx="92" cy="50" r="6" fill="#0F172A" stroke="#60A5FA" strokeWidth="2" />
        <circle cx="92" cy="50" r="2.5" fill="#93C5FD" />
      </svg>
    </div>
  );
};

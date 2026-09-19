import React from 'react';

interface DgwLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const DgwLogo: React.FC<DgwLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      {/* Dynamic Swoosh Semi-Truck Icon Graphic matching new design */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 130 75"
          className={
            size === 'sm' 
              ? 'w-11 h-7' 
              : size === 'lg' 
              ? 'w-20 h-13' 
              : 'w-15 h-9 sm:w-17 sm:h-10'
          }
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dgwSwooshGrad2" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#0369A1" />
              <stop offset="40%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="dgwTruckBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1D4ED8" />
              <stop offset="60%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>
            <linearGradient id="dgwRoadDark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>

          {/* Curved Asphalt Highway Ribbon Swoosh */}
          <path
            d="M 6 60 C 35 60 55 48 95 38 C 115 33 125 35 128 38"
            stroke="url(#dgwRoadDark)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 14 65 C 40 65 65 52 105 43"
            stroke="url(#dgwSwooshGrad2)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 25 70 C 50 70 75 58 112 50"
            stroke="#60A5FA"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Speed Velocity Streaks */}
          <line x1="10" y1="40" x2="26" y2="40" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="5" y1="46" x2="22" y2="46" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="12" y1="52" x2="30" y2="52" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />

          {/* Detailed Blue Class 8 Semi-Truck Cab & Silver Trailer */}
          <g>
            {/* Silver Trailer */}
            <rect x="36" y="16" width="40" height="26" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
            <line x1="42" y1="18" x2="42" y2="40" stroke="#CBD5E1" strokeWidth="1" />
            <line x1="50" y1="18" x2="50" y2="40" stroke="#CBD5E1" strokeWidth="1" />
            <line x1="58" y1="18" x2="58" y2="40" stroke="#CBD5E1" strokeWidth="1" />
            <line x1="66" y1="18" x2="66" y2="40" stroke="#CBD5E1" strokeWidth="1" />

            {/* Blue Metallic Cab */}
            <path
              d="M 76 22 L 92 22 L 103 33 L 103 42 L 76 42 Z"
              fill="url(#dgwTruckBlueGrad)"
              stroke="#1E40AF"
              strokeWidth="0.8"
            />
            {/* Aero Roof Fairing */}
            <path
              d="M 76 18 C 82 18 89 20 92 22 L 76 22 Z"
              fill="#2563EB"
            />
            {/* Windshield */}
            <path
              d="M 80 24 L 91 24 L 98 33 L 80 33 Z"
              fill="#7DD3FC"
              opacity="0.9"
            />
            {/* Chrome Front Grille & Bumper */}
            <rect x="101" y="33" width="3" height="9" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.5" rx="0.5" />
            <line x1="102" y1="35" x2="104" y2="35" stroke="#64748B" strokeWidth="0.5" />
            <line x1="102" y1="38" x2="104" y2="38" stroke="#64748B" strokeWidth="0.5" />
            <line x1="102" y1="40" x2="104" y2="40" stroke="#64748B" strokeWidth="0.5" />
            
            {/* Glowing Headlight */}
            <circle cx="102" cy="38" r="1.5" fill="#FDE047" />

            {/* Wheels */}
            <circle cx="45" cy="44" r="5" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="45" cy="44" r="2" fill="#64748B" />
            <circle cx="55" cy="44" r="5" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="55" cy="44" r="2" fill="#64748B" />
            <circle cx="95" cy="44" r="5" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="95" cy="44" r="2" fill="#64748B" />
          </g>
        </svg>
      </div>

      {/* Brand Text Stack matching reference */}
      <div className="flex items-center gap-3">
        {/* Main DGW + SOLUTION LLC */}
        <div className="flex flex-col leading-none">
          <span className="font-display font-black text-2xl sm:text-[26px] tracking-tight text-[#1D4ED8]">
            DGW
          </span>
          <span className="font-display font-black text-[9px] sm:text-[10px] tracking-widest text-[#1E3A8A] uppercase mt-0.5">
            SOLUTION LLC
          </span>
        </div>

        {/* Vertical Divider & Subtitle */}
        {showSubtitle && (
          <div className="hidden xl:flex flex-col border-l border-slate-300 pl-3 leading-tight">
            <span className="font-sans text-[11px] tracking-wider text-slate-800 font-black uppercase">
              DISPATCHING GLOBAL
            </span>
            <span className="font-sans text-[11px] tracking-wider text-slate-800 font-black uppercase">
              WORLD
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

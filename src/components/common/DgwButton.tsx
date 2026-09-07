import React, { useRef, useState } from 'react';

export interface DgwButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  enableMagnetic?: boolean;
  enableLightSweep?: boolean;
}

export const DgwButton: React.FC<DgwButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  enableMagnetic = true,
  enableLightSweep = true,
  onClick,
  disabled,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Subtle magnetic cursor pull
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!enableMagnetic || disabled) return;
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    // Subtle damping (max 4px movement)
    setOffset({
      x: Math.max(-4, Math.min(4, x * 0.15)),
      y: Math.max(-4, Math.min(4, y * 0.15))
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  // Base sizing classes
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-5 py-2.5 text-xs sm:text-sm rounded-2xl gap-2',
    lg: 'px-7 py-3.5 text-sm sm:text-base rounded-2xl gap-2.5 font-bold'
  }[size];

  // Variant color definitions tuned for crisp light theme
  const variantClasses = {
    // Primary: Authoritative dark slate with amber hover glow
    primary:
      'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 shadow-md hover:shadow-xl hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]',
    // Secondary: Clean white with subtle slate border
    secondary:
      'bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-950 border border-slate-300 hover:border-slate-400 shadow-xs hover:shadow-md',
    // Accent: High-visibility Warm Amber / Gold
    accent:
      'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-slate-950 font-black border border-amber-400 shadow-md hover:shadow-[0_0_24px_rgba(245,158,11,0.4)] hover:brightness-105',
    // Glass: Frosted light glassmorphism
    glass:
      'bg-white/80 hover:bg-white text-slate-800 hover:text-slate-950 border border-slate-200/90 backdrop-blur-xl hover:border-amber-500/50 shadow-xs hover:shadow-md',
    // Outline: Clean steel outline
    outline:
      'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400'
  }[variant];

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
      }}
      className={`relative inline-flex items-center justify-center font-display font-bold tracking-wide select-none cursor-pointer overflow-hidden transition-all duration-300 active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed group ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {/* Light Sweep Shimmer Effect on Hover */}
      {enableLightSweep && (
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          aria-hidden="true"
        />
      )}

      {/* Button Content with Left / Right Icon */}
      {icon && iconPosition === 'left' && (
        <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>
      )}

      <span className="relative z-10 truncate">{children}</span>

      {icon && iconPosition === 'right' && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:scale-110">
          {icon}
        </span>
      )}
    </button>
  );
};

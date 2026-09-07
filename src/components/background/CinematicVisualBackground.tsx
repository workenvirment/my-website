import React, { useState, useEffect, useRef } from 'react';
import { MovingTruckCanvas } from './MovingTruckCanvas';
import { LogisticsParticleCanvas } from './LogisticsParticleCanvas';

export interface CinematicVisualBackgroundProps {
  currentPath?: string;
  intensity?: 'subtle' | 'standard' | 'vivid';
  isPaused?: boolean;
}

interface PhotoSlide {
  id: string;
  name: string;
  imageUrl: string;
  altText: string;
  accentColor: string;
  location: string;
}

const TRUCK_PHOTO_GALLERY: PhotoSlide[] = [
  {
    id: 'fleet-sunset-row',
    name: 'Commercial Freight Fleet Yard at Dusk',
    imageUrl: '/images/fleet_sunset_row.jpg',
    altText: 'Class 8 semi-truck fleet staged in a neat row at trucking terminal at golden hour sunset',
    accentColor: '#F59E0B',
    location: 'Official Commercial Fleet Yard • Denver HQ Network'
  },
  {
    id: 'night-highway-truck',
    name: 'Night Highway Transcontinental Logistics',
    imageUrl: '/images/night_highway_truck.jpg',
    altText: 'Modern Class 8 semi-truck sleeper rig driving on open mountain highway under starry night sky',
    accentColor: '#38BDF8',
    location: 'I-70 Transcontinental Corridor • Continuous 24/7 Operations'
  },
  {
    id: 'tanker-refinery',
    name: 'Refinery Bulk Liquid Hazmat Corridor',
    imageUrl: '/images/tanker_night_refinery.jpg',
    altText: 'Dual stainless steel liquid bulk tanker rig at commercial refinery terminal',
    accentColor: '#06B6D4',
    location: 'Specialized Industrial Bulk Liquid Hauling'
  },
  {
    id: 'distribution-hub',
    name: 'Distribution Fulfillment Hub & Staged Freight',
    imageUrl: '/images/cargo_warehouse_hub.jpg',
    altText: 'Modern commercial distribution logistics center with staged freight',
    accentColor: '#10B981',
    location: 'Denver Headquarters Distribution Hub • 9057 E 50th Ave'
  }
];

export const CinematicVisualBackground: React.FC<CinematicVisualBackgroundProps> = ({
  intensity = 'standard',
  isPaused = false
}) => {
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [windowDimensions, setWindowDimensions] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  const animPosRef = useRef<{ currentX: number; currentY: number; targetX: number; targetY: number }>({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0
  });

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth mouse parallax lerp engine
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const xNorm = (e.clientX / window.innerWidth) - 0.5;
      const yNorm = (e.clientY / window.innerHeight) - 0.5;
      animPosRef.current.targetX = xNorm;
      animPosRef.current.targetY = yNorm;
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const updateParallax = () => {
      const pos = animPosRef.current;
      pos.currentX += (pos.targetX - pos.currentX) * 0.05;
      pos.currentY += (pos.targetY - pos.currentY) * 0.05;

      const bgElement = document.getElementById('dgw-parallax-bg-layer');
      if (bgElement && !isPaused) {
        const moveX = pos.currentX * 18;
        const moveY = pos.currentY * 12;
        bgElement.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) scale(1.05)`;
      }

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  // Dynamic Photo Rotation (every 18 seconds smoothly crossfades)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % TRUCK_PHOTO_GALLERY.length);
    }, 18000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const isMobile = windowDimensions.width < 768;

  return (
    <div 
      id="dgw-visual-background-root"
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-slate-100"
    >
      
      {/* LAYER 1: High-Resolution Parallax Photography Backdrop with Smooth Crossfading */}
      <div
        id="dgw-parallax-bg-layer"
        className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] transition-transform duration-700 ease-out will-change-transform z-0"
      >
        {TRUCK_PHOTO_GALLERY.map((slide, idx) => (
          <img
            key={slide.id}
            src={slide.imageUrl}
            alt={slide.altText}
            className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-105 contrast-105 transition-opacity duration-1500 ease-in-out ${
              photoIndex === idx ? 'opacity-40' : 'opacity-0 pointer-events-none'
            }`}
            loading="eager"
          />
        ))}
      </div>

      {/* LAYER 2: Soft Light Fog Tint Overlay behind Moving Truck */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-slate-50/85 via-slate-50/70 to-slate-50/80 transition-opacity duration-700 z-1" 
      />

      {/* LAYER 3: Animated Highway & Moving Semi-Truck Scene (Dynamic 7-Truck Cycling Engine) */}
      <div className="absolute inset-0 z-2">
        <MovingTruckCanvas 
          reducedMotion={isPaused || isMobile} 
          intensity={intensity} 
        />
      </div>

      {/* LAYER 4: Live GPS Telematics Route Arcs & Atmospheric Dust Canvas */}
      <div className="absolute inset-0 z-3">
        <LogisticsParticleCanvas 
          intensity={intensity} 
          reducedMotion={isPaused || isMobile} 
        />
      </div>

      {/* LAYER 5: Interactive Mouse Spotlight Following Cursor */}
      {!isPaused && !isMobile && (
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 z-4"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.1), transparent 70%)`
          }}
        />
      )}

      {/* LAYER 6: Multi-Tier Intelligent Vignette System for Content Readability */}
      
      {/* Top Header Light Vignette */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-50/95 via-slate-50/80 to-transparent z-5" />

      {/* Side Framing Gradients for Ultra-Wide Displays */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50/90 to-transparent z-5" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50/90 to-transparent z-5" />

      {/* Bottom Footer Light Blend */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-100/90 via-slate-50/60 to-transparent z-5" />

    </div>
  );
};

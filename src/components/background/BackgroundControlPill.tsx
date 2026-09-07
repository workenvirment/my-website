import React, { useState } from 'react';
import { Sparkles, Eye, Play, Pause, ChevronUp } from 'lucide-react';

interface BackgroundControlPillProps {
  sceneName: string;
  intensity: 'subtle' | 'standard' | 'vivid';
  onSetIntensity: (intensity: 'subtle' | 'standard' | 'vivid') => void;
  isPaused: boolean;
  onTogglePause: () => void;
}

export const BackgroundControlPill: React.FC<BackgroundControlPillProps> = ({
  sceneName,
  intensity,
  onSetIntensity,
  isPaused,
  onTogglePause
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Visual Atmosphere Controls" className="fixed bottom-4 left-4 z-40 font-mono text-xs">
      
      {/* Popover Controls Menu */}
      {isOpen && (
        <div 
          className="mb-2 p-3.5 rounded-2xl bg-slate-950/95 border border-white/15 backdrop-blur-2xl shadow-2xl text-white space-y-3 w-64 animate-in slide-in-from-bottom-2 duration-200"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[11px] font-bold text-brand-orange flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cinematic Atmosphere</span>
            </span>
            <span className="text-[9px] text-slate-400 uppercase">Interactive HUD</span>
          </div>

          {/* Active Scene Indicator */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 block">ACTIVE LOGISTICS SCENE:</span>
            <div className="p-2 rounded-xl bg-slate-900 border border-white/5 font-bold text-[11px] text-slate-200 truncate">
              {sceneName}
            </div>
          </div>

          {/* Intensity Selector */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 block">BACKGROUND INTENSITY:</span>
            <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-900 border border-white/5 text-[10px] font-bold">
              {(['subtle', 'standard', 'vivid'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => onSetIntensity(level)}
                  className={`py-1 rounded-lg capitalize transition-all ${
                    intensity === level
                      ? 'bg-brand-orange text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Animation Toggle */}
          <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px]">
            <span className="text-slate-300">Motion & Telematics:</span>
            <button
              onClick={onTogglePause}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                isPaused
                  ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                  : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
              }`}
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              <span>{isPaused ? 'Paused' : 'Active 60fps'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Collapsed Floating Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 hover:bg-slate-900 border border-white/15 hover:border-brand-orange/50 text-slate-300 hover:text-white backdrop-blur-xl shadow-2xl transition-all group"
        title="Customize Cinematic Background"
      >
        <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
        <span className="text-[11px] font-bold tracking-tight flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-brand-orange" />
          <span className="hidden sm:inline">Atmosphere:</span>
          <span className="text-white capitalize">{intensity}</span>
        </span>
        <ChevronUp className={`w-3 h-3 text-slate-400 group-hover:text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

    </aside>
  );
};

import React, { useEffect, useRef } from 'react';

interface LogisticsParticleCanvasProps {
  intensity?: 'subtle' | 'standard' | 'vivid';
  reducedMotion?: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

interface Waypoint {
  name: string;
  xRatio: number;
  yRatio: number;
  color: string;
}

export const LogisticsParticleCanvas: React.FC<LogisticsParticleCanvasProps> = ({
  intensity = 'standard',
  reducedMotion = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle multiplier based on intensity
    const countMultiplier = intensity === 'subtle' ? 15 : intensity === 'vivid' ? 50 : 32;
    const isMobile = width < 768;
    const particleCount = isMobile ? Math.min(18, countMultiplier) : countMultiplier;

    // Simulated US Freight Hub Waypoints (proportional ratios on screen)
    const waypoints: Waypoint[] = [
      { name: 'Denver HQ (DGW)', xRatio: 0.38, yRatio: 0.44, color: '#FF5722' },
      { name: 'Dallas Terminal', xRatio: 0.48, yRatio: 0.65, color: '#38bdf8' },
      { name: 'Atlanta Hub', xRatio: 0.68, yRatio: 0.62, color: '#10b981' },
      { name: 'Chicago Interchange', xRatio: 0.58, yRatio: 0.36, color: '#f59e0b' },
      { name: 'Los Angeles Port', xRatio: 0.18, yRatio: 0.58, color: '#a855f7' },
      { name: 'Seattle Gateway', xRatio: 0.16, yRatio: 0.22, color: '#38bdf8' }
    ];

    const particles: Particle[] = [];
    const colors = ['#FF5722', '#F97316', '#38BDF8', '#F59E0B', '#F8FAFC'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.5 - 0.15,
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    let pulseProgress = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!reducedMotion) {
        pulseProgress += 0.008;
      }

      // 1. Draw glowing GPS route arcs between major logistics hubs
      const alphaBase = intensity === 'subtle' ? 0.08 : intensity === 'vivid' ? 0.25 : 0.15;

      ctx.lineWidth = 1.2;
      for (let i = 0; i < waypoints.length; i++) {
        const from = waypoints[i];
        const to = waypoints[(i + 1) % waypoints.length];

        const x1 = from.xRatio * width;
        const y1 = from.yRatio * height;
        const x2 = to.xRatio * width;
        const y2 = to.yRatio * height;

        const cpX = (x1 + x2) / 2 + (i % 2 === 0 ? 30 : -30);
        const cpY = (y1 + y2) / 2 - 40;

        // Base Arc
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(cpX, cpY, x2, y2);
        ctx.strokeStyle = `rgba(249, 115, 22, ${alphaBase})`;
        ctx.stroke();

        // Moving pulse dot along the arc
        if (!reducedMotion) {
          const t = (pulseProgress + i * 0.2) % 1;
          const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cpX + t * t * x2;
          const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cpY + t * t * y2;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = from.color;
          if (!isMobile) {
            ctx.shadowColor = from.color;
            ctx.shadowBlur = 8;
          }
          ctx.fill();
          if (!isMobile) {
            ctx.shadowBlur = 0;
          }
        }

        // Draw Waypoint Hub Nodes
        ctx.beginPath();
        ctx.arc(x1, y1, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = from.color;
        if (!isMobile) {
          ctx.shadowColor = from.color;
          ctx.shadowBlur = 6;
        }
        ctx.fill();
        if (!isMobile) {
          ctx.shadowBlur = 0;
        }
      }

      // 2. Draw floating atmospheric dust / telemetry particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;
          p.pulsePhase += p.pulseSpeed;

          // Wrap around screen
          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
        }

        const dynamicAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulsePhase));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = dynamicAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
};

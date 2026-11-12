import React, { useEffect, useRef } from 'react';

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSpeed: number;
  color: string;
  alpha: number;
  trail: { x: number; y: number }[];
}

interface Pulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
}

export const BirdFlockCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // High DPI Support
    const setupCanvasSize = () => {
      if (!canvas || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setupCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      setupCanvasSize();
    });
    resizeObserver.observe(container);

    // Boids setup
    // Increased volume by 3x for a dense, mesmerizing starling murmuration
    const boidCount = Math.max(210, Math.min(480, Math.floor((width / 8) * 3)));
    const boids: Boid[] = [];

    for (let i = 0; i < boidCount; i++) {
      const size = 1.0 + Math.random() * 1.5;
      // Whisper-quiet ambient opacity so dots float gracefully as texture without competing with text
      const alpha = 0.08 + Math.random() * 0.14;
      const shades = [
        'rgba(74, 65, 60,',
        'rgba(116, 104, 96,',
        'rgba(187, 108, 67,',
        'rgba(200, 144, 109,',
        'rgba(204, 180, 153,'
      ];
      const color = shades[Math.floor(Math.random() * shades.length)];

      boids.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5,
        size,
        baseSpeed: 1.8 + Math.random() * 1.4,
        color,
        alpha,
        trail: []
      });
    }

    // Mouse / Touch Interaction State
    const mouse = {
      x: width / 2,
      y: height / 2,
      active: false,
      lastActiveTime: 0
    };

    const pulses: Pulse[] = [];

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      mouse.lastActiveTime = performance.now();
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      pulses.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: 180,
        strength: 5
      });
    };

    // Attach listeners to the parent section so all mouse/touch movements
    // across the Hero section interact with the flock smoothly without blocking clicks
    const heroSection = canvas.closest('#hero') || canvas.parentElement || container;

    heroSection.addEventListener('pointermove', handlePointerMove as EventListener);
    heroSection.addEventListener('pointerleave', handlePointerLeave as EventListener);
    heroSection.addEventListener('click', handleClick as EventListener);

    // Murmuration Physics Parameters
    const visualRange = 58;
    const visualRangeSq = visualRange * visualRange;
    const separationDistance = 20;
    const separationDistanceSq = separationDistance * separationDistance;
    const separationFactor = 0.055;
    const alignmentFactor = 0.042;
    const cohesionFactor = 0.014;
    const boundaryMargin = 60;
    const boundaryFactor = 0.22;

    let time = 0;

    const render = (currentTime: number) => {
      time = currentTime;

      ctx.clearRect(0, 0, width, height);

      // Autonomous organic attractor (Lissajous curve) moving across the hero
      // Ensures the flock naturally murmurs in graceful, undulating swoops even when idle
      const idleAttractorX =
        width / 2 +
        Math.sin(time * 0.0006) * (width * 0.38) +
        Math.cos(time * 0.0014) * (width * 0.12);
      const idleAttractorY =
        height * 0.45 +
        Math.cos(time * 0.0008) * (height * 0.32) +
        Math.sin(time * 0.0018) * (height * 0.1);

      // Fade mouse activity after 2 seconds of no movement
      const isMouseActive = mouse.active && (currentTime - mouse.lastActiveTime < 2500);
      const targetX = isMouseActive ? mouse.x : idleAttractorX;
      const targetY = isMouseActive ? mouse.y : idleAttractorY;
      const targetWeight = isMouseActive ? 0.0009 : 0.00035;

      // Update pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.radius += 5.5;
        pulse.strength *= 0.94;

        // Draw faint expanding shockwave ring
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(187, 108, 67, ${0.15 * (1 - pulse.radius / pulse.maxRadius)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (pulse.radius >= pulse.maxRadius || pulse.strength < 0.1) {
          pulses.splice(p, 1);
        }
      }

      // Update and draw each boid
      for (let i = 0; i < boids.length; i++) {
        const boid = boids[i];

        let closeDx = 0;
        let closeDy = 0;
        let xVelAvg = 0;
        let yVelAvg = 0;
        let xPosAvg = 0;
        let yPosAvg = 0;
        let neighbors = 0;

        for (let j = 0; j < boids.length; j++) {
          if (i === j) continue;
          const other = boids[j];
          const dx = boid.x - other.x;
          if (dx > visualRange || dx < -visualRange) continue;
          const dy = boid.y - other.y;
          if (dy > visualRange || dy < -visualRange) continue;

          const distSq = dx * dx + dy * dy;

          if (distSq < separationDistanceSq) {
            const dist = Math.sqrt(distSq) || 1;
            closeDx += dx / dist;
            closeDy += dy / dist;
          } else if (distSq < visualRangeSq) {
            xVelAvg += other.vx;
            yVelAvg += other.vy;
            xPosAvg += other.x;
            yPosAvg += other.y;
            neighbors++;
          }
        }

        // Apply flocking rules
        if (neighbors > 0) {
          xVelAvg /= neighbors;
          yVelAvg /= neighbors;
          xPosAvg /= neighbors;
          yPosAvg /= neighbors;

          // Alignment
          boid.vx += (xVelAvg - boid.vx) * alignmentFactor;
          boid.vy += (yVelAvg - boid.vy) * alignmentFactor;

          // Cohesion
          boid.vx += (xPosAvg - boid.x) * cohesionFactor;
          boid.vy += (yPosAvg - boid.y) * cohesionFactor;
        }

        // Separation
        boid.vx += closeDx * separationFactor;
        boid.vy += closeDy * separationFactor;

        // Attractor (Mouse or Organic Wandering)
        const toTargetX = targetX - boid.x;
        const toTargetY = targetY - boid.y;
        const distToTarget = Math.sqrt(toTargetX * toTargetX + toTargetY * toTargetY);

        if (isMouseActive) {
          // If close to cursor, gently repel so birds part around cursor like a swarm
          if (distToTarget < 60) {
            boid.vx -= (toTargetX / (distToTarget || 1)) * 0.22;
            boid.vy -= (toTargetY / (distToTarget || 1)) * 0.22;
          } else if (distToTarget < 380) {
            // Drawn in toward cursor
            boid.vx += toTargetX * targetWeight;
            boid.vy += toTargetY * targetWeight;
          }
        } else {
          // Gentle ambient pull towards the murmuration center
          boid.vx += toTargetX * targetWeight;
          boid.vy += toTargetY * targetWeight;
        }

        // React to active click shockwaves
        for (let p = 0; p < pulses.length; p++) {
          const pulse = pulses[p];
          const pdx = boid.x - pulse.x;
          const pdy = boid.y - pulse.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          const diff = Math.abs(pdist - pulse.radius);
          if (diff < 35) {
            const push = (pulse.strength / (pdist || 1)) * 2;
            boid.vx += (pdx / (pdist || 1)) * push;
            boid.vy += (pdy / (pdist || 1)) * push;
          }
        }

        // Soft boundary avoidance to keep the flock within the hero banner
        if (boid.x < boundaryMargin) {
          boid.vx += boundaryFactor * (1 - boid.x / boundaryMargin);
        } else if (boid.x > width - boundaryMargin) {
          boid.vx -= boundaryFactor * (1 - (width - boid.x) / boundaryMargin);
        }

        if (boid.y < boundaryMargin) {
          boid.vy += boundaryFactor * (1 - boid.y / boundaryMargin);
        } else if (boid.y > height - boundaryMargin) {
          boid.vy -= boundaryFactor * (1 - (height - boid.y) / boundaryMargin);
        }

        // Limit speed to retain graceful, fluid bird-like motion
        const speed = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);
        const maxSpeed = boid.baseSpeed * (isMouseActive && distToTarget < 120 ? 1.4 : 1.1);
        const minSpeed = 1.2;

        if (speed > maxSpeed) {
          boid.vx = (boid.vx / speed) * maxSpeed;
          boid.vy = (boid.vy / speed) * maxSpeed;
        } else if (speed < minSpeed && speed > 0.001) {
          boid.vx = (boid.vx / speed) * minSpeed;
          boid.vy = (boid.vy / speed) * minSpeed;
        }

        // Move
        boid.x += boid.vx;
        boid.y += boid.vy;

        // Wrap around gracefully if blown past margin
        if (boid.x < -20) boid.x = width + 10;
        else if (boid.x > width + 20) boid.x = -10;
        if (boid.y < -20) boid.y = height + 10;
        else if (boid.y > height + 20) boid.y = -10;

        // Record trail for fluid murmuration flow
        boid.trail.unshift({ x: boid.x, y: boid.y });
        if (boid.trail.length > 5) {
          boid.trail.pop();
        }

        // Render trails (fluid motion lines)
        if (boid.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(boid.trail[0].x, boid.trail[0].y);
          for (let t = 1; t < boid.trail.length; t++) {
            ctx.lineTo(boid.trail[t].x, boid.trail[t].y);
          }
          ctx.strokeStyle = `${boid.color}${boid.alpha * 0.28})`;
          ctx.lineWidth = boid.size * 0.75;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Render bird dot (leading head)
        ctx.beginPath();
        ctx.arc(boid.x, boid.y, boid.size, 0, Math.PI * 2);
        ctx.fillStyle = `${boid.color}${boid.alpha})`;
        ctx.fill();

        // Subtle directional orientation wing / beak tip
        const headingAngle = Math.atan2(boid.vy, boid.vx);
        const wingSpan = boid.size * 1.5;
        const wingBack = boid.size * 1.8;

        ctx.beginPath();
        ctx.moveTo(
          boid.x + Math.cos(headingAngle) * wingSpan,
          boid.y + Math.sin(headingAngle) * wingSpan
        );
        ctx.lineTo(
          boid.x + Math.cos(headingAngle + 2.5) * wingBack,
          boid.y + Math.sin(headingAngle + 2.5) * wingBack
        );
        ctx.lineTo(
          boid.x + Math.cos(headingAngle - 2.5) * wingBack,
          boid.y + Math.sin(headingAngle - 2.5) * wingBack
        );
        ctx.closePath();
        ctx.fillStyle = `${boid.color}${boid.alpha * 0.55})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      heroSection.removeEventListener('pointermove', handlePointerMove as EventListener);
      heroSection.removeEventListener('pointerleave', handlePointerLeave as EventListener);
      heroSection.removeEventListener('click', handleClick as EventListener);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};

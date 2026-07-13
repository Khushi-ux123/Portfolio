import React, { useEffect, useRef } from "react";

interface HeroMovingBackgroundProps {
  isDarkMode: boolean;
}

export default function HeroMovingBackground({ isDarkMode }: HeroMovingBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle container resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);

    // Wave parameters
    interface Wave {
      y: number;
      length: number;
      amplitude: number;
      frequency: number;
      color: string;
      speed: number;
      phase: number;
    }

    const waves: Wave[] = isDarkMode
      ? [
          {
            y: height * 0.5,
            length: 0.003,
            amplitude: 45,
            frequency: 0.015,
            color: "rgba(99, 102, 241, 0.18)", // indigo
            speed: 0.012,
            phase: 0,
          },
          {
            y: height * 0.52,
            length: 0.002,
            amplitude: 60,
            frequency: 0.01,
            color: "rgba(6, 182, 212, 0.12)", // cyan
            speed: -0.008,
            phase: Math.PI / 3,
          },
          {
            y: height * 0.48,
            length: 0.004,
            amplitude: 30,
            frequency: 0.02,
            color: "rgba(139, 92, 246, 0.1)", // purple
            speed: 0.015,
            phase: Math.PI / 1.5,
          },
        ]
      : [
          {
            y: height * 0.5,
            length: 0.003,
            amplitude: 35,
            frequency: 0.01,
            color: "rgba(99, 102, 241, 0.08)",
            speed: 0.008,
            phase: 0,
          },
          {
            y: height * 0.53,
            length: 0.0015,
            amplitude: 45,
            frequency: 0.008,
            color: "rgba(6, 182, 212, 0.06)",
            speed: -0.005,
            phase: Math.PI / 4,
          },
        ];

    // Particle parameters
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        speedY: (Math.random() - 0.5) * 0.3 - 0.1, // slightly drifting upwards
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        color: isDarkMode
          ? Math.random() > 0.5
            ? "rgba(165, 180, 252, 0.5)" // indigo-200
            : "rgba(103, 232, 249, 0.5)" // cyan-200
          : "rgba(79, 70, 229, 0.2)",
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate mouse coordinates
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // 1. Draw Subtle Tech Grid Background
      ctx.strokeStyle = isDarkMode ? "rgba(99, 102, 241, 0.03)" : "rgba(99, 102, 241, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 50;

      // Vertical lines with perspective bend towards the mouse
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < height; y += 10) {
          // Subtle pull toward mouse x for 3D depth
          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.max(0, (200 - dist) / 200) * 12;
          const px = x + (dx > 0 ? 1 : -1) * pull * (Math.abs(dx) / 200);

          if (y === 0) ctx.moveTo(px, y);
          else ctx.lineTo(px, y);
        }
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Render Elegant Flowing Sine-Wave Ribbons
      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.8;

        for (let i = 0; i < width; i++) {
          // Dynamic mouse wave interaction
          const mouseDx = mouseRef.current.x - i;
          const mouseDy = mouseRef.current.y - wave.y;
          const dist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
          const waveInterference = Math.max(0, (250 - dist) / 250) * 22;

          const yOffset =
            Math.sin(i * wave.length + wave.phase) * wave.amplitude +
            Math.cos(i * 0.001 + wave.phase * 0.5) * (wave.amplitude * 0.3) +
            (mouseDx > 0 ? 1 : -1) * waveInterference * (Math.abs(mouseDy) / 250);

          const py = wave.y + yOffset;

          if (i === 0) {
            ctx.moveTo(i, py);
          } else {
            ctx.lineTo(i, py);
          }
        }
        ctx.stroke();
        wave.phase += wave.speed;
      });

      // 3. Render Floating Cinematic Particles
      particles.forEach((p) => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Update positions
        p.y += p.speedY;
        p.x += p.speedX;

        // Add slow float drift with mouse pull
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          const force = (300 - dist) / 300;
          p.x += (dx / dist) * force * 0.45;
          p.y += (dy / dist) * force * 0.45;
        }

        // Boundary wrap
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.y > height) {
          p.y = 0;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
      });

      // 4. Subtle center pulse / orbital nodes
      if (isDarkMode) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          10,
          width * 0.5,
          height * 0.5,
          width * 0.4
        );
        gradient.addColorStop(0, "rgba(99, 102, 241, 0.03)");
        gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.01)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.arc(width * 0.5, height * 0.5, width * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

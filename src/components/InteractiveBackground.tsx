import React, { useEffect, useRef } from "react";

interface InteractiveBackgroundProps {
  isDarkMode: boolean;
}

export default function InteractiveBackground({ isDarkMode }: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      density: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        // Random velocity
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 0.5;
        this.density = Math.random() * 20 + 5;
        
        // Randomize blue-indigo colors in dark mode, slate-slate in light mode
        if (isDarkMode) {
          const colors = [
            "rgba(99, 102, 241, 0.4)",  // indigo
            "rgba(139, 92, 246, 0.4)",  // violet
            "rgba(14, 165, 233, 0.3)",  // sky
            "rgba(59, 130, 246, 0.3)",  // blue
          ];
          this.color = colors[Math.floor(Math.random() * colors.length)];
        } else {
          const colors = [
            "rgba(79, 70, 229, 0.15)",  // indigo
            "rgba(124, 58, 237, 0.15)", // violet
            "rgba(37, 99, 235, 0.12)",  // blue
          ];
          this.color = colors[Math.floor(Math.random() * colors.length)];
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // Natural floating motion
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off bounds
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Interaction with mouse
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const directionX = forceDirectionX * force * this.density * 0.4;
          const directionY = forceDirectionY * force * this.density * 0.4;
          
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Slowly pull back to original baseline / natural floating track
          if (this.x !== this.baseX) {
            const dxBase = this.x - this.baseX;
            this.x -= dxBase / 25;
          }
          if (this.y !== this.baseY) {
            const dyBase = this.y - this.baseY;
            this.y -= dyBase / 25;
          }
        }
      }
    }

    let particles: Particle[] = [];
    
    // Matrix Rain setup variables
    const fontSize = 14;
    let columns = Math.ceil(width / fontSize);
    let rainDrops: number[] = [];
    const matrixChars = "01ABCDEF@#$%&+*ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ".split("");

    const initMatrix = () => {
      columns = Math.ceil(width / fontSize);
      rainDrops = [];
      for (let x = 0; x < columns; x++) {
        rainDrops[x] = Math.random() * -100; // staggered offset start
      }
    };

    const init = () => {
      particles = [];
      // Dynamic density based on screen size
      const numberOfParticles = Math.min(Math.floor((width * height) / 11000), 120);
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push(new Particle(x, y));
      }
      initMatrix();
    };

    let lastTime = 0;
    const fpsInterval = 1000 / 24; // Limit Matrix updates to 24 FPS for perfect cinematic rate

    const animate = (timestamp: number = 0) => {
      ctx.clearRect(0, 0, width, height);

      const isMatrixActive = !!(window as any).matrixRainActive;

      // 1. Draw smooth ambient spotlight aura following mouse in dark mode (cyber aura)
      if (isDarkMode && mouseRef.current.x > -1000) {
        const mouseGlow = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          400
        );
        mouseGlow.addColorStop(0, isMatrixActive ? "rgba(16, 185, 129, 0.12)" : "rgba(99, 102, 241, 0.08)"); // Emerald matrix glow vs indigo
        mouseGlow.addColorStop(0.5, isMatrixActive ? "rgba(52, 211, 153, 0.05)" : "rgba(139, 92, 246, 0.04)");
        mouseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      } else if (!isDarkMode && mouseRef.current.x > -1000) {
        // Light mode soft sky/blue aura tracking
        const mouseGlow = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          300
        );
        mouseGlow.addColorStop(0, isMatrixActive ? "rgba(52, 211, 153, 0.08)" : "rgba(129, 140, 248, 0.08)");
        mouseGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Futuristic Digital Rain Layer
      if (isMatrixActive) {
        ctx.font = `${fontSize}px monospace`;
        
        // Matrix styling: green glow in dark mode, clean light-green/lavender stream in light mode
        const matrixColor = isDarkMode ? "rgba(16, 185, 129, 0.18)" : "rgba(52, 211, 153, 0.12)";
        const headColor = isDarkMode ? "#ffffff" : "#059669";

        // Draw character drop lines
        for (let i = 0; i < rainDrops.length; i++) {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          const x = i * fontSize;
          const y = rainDrops[i] * fontSize;

          // Head character is glowing bright
          if (Math.random() > 0.98) {
            ctx.fillStyle = headColor;
          } else {
            ctx.fillStyle = matrixColor;
          }

          ctx.fillText(char, x, y);

          // Wrap back around or stagger randomly
          if (y > height && Math.random() > 0.975) {
            rainDrops[i] = 0;
          }

          // Advance columns slightly slower than requestAnimationFrame to look retro
          if (!lastTime || timestamp - lastTime >= fpsInterval) {
            rainDrops[i]++;
          }
        }
        
        if (!lastTime || timestamp - lastTime >= fpsInterval) {
          lastTime = timestamp;
        }
      }

      // Web/Futuristic grid background
      if (isDarkMode) {
        // Soft neon grid lines
        ctx.strokeStyle = isMatrixActive ? "rgba(16, 185, 129, 0.03)" : "rgba(15, 23, 42, 0.5)";
        ctx.lineWidth = 1;
        const gridSize = 60;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw constellation connections
      const maxDistance = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15;
            ctx.strokeStyle = isMatrixActive
              ? `rgba(52, 211, 153, ${opacity})`
              : isDarkMode
                ? `rgba(99, 102, 241, ${opacity})`
                : `rgba(79, 70, 229, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "normal" }}
    />
  );
}

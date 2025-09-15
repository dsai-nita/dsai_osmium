import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// adjust path
interface SplashScreenProps {
  onFinish: () => void;
}

const keywords = [
  "AI", "Data Science", "Machine Learning", "Deep Learning",
  "Neural Networks", "Big Data", "Analytics", "Computer Vision",
  "NLP", "Robotics", "Generative AI", "Predictive Modeling",
];

type Position = { top: string; left: string };

const getScatteredPositions = (count: number): Position[] =>
  Array(count)
    .fill(null)
    .map(() => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    }));

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [phase, setPhase] = useState<"init" | "show" | "out">("init");
  const [positions] = useState(() => getScatteredPositions(keywords.length));
  const [isMobile, setIsMobile] = useState(false); // mobile detection
  const rafRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Neural network canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0,255,200,${1 - dist / 120})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,255,200,0.8)";
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(render);
    };
    render();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Timings
  useEffect(() => {
    const toShow = setTimeout(() => setPhase("show"), 200);
    const toOut = setTimeout(() => setPhase("out"), 1800);
    const toEnd = setTimeout(() => onFinish(), 2600);

    return () => {
      clearTimeout(toShow);
      clearTimeout(toOut);
      clearTimeout(toEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {phase!== "done" && (
        <motion.div
          key="splash"
          className="relative flex items-center justify-center h-screen w-screen overflow-hidden"
          style={{ backgroundColor: "black" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Neural Background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            style={{ zIndex: 1 }}
          />

          {/* Floating Keywords */}
          {keywords.map((word, i) => (
            <motion.div
              key={i}
              className="absolute text-white font-mono text-lg"
              style={{
                ...positions[i],
                color: "rgba(0,255,200,0.7)",
                pointerEvents: "none",
                whiteSpace: "nowrap",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 1, 0], y: [20, -20] }}
              transition={{
                duration: 1.8,
                delay: i * 0.12,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            >
              {word}
            </motion.div>
          ))}

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={
              phase === "show"
                ? { scale: [0.7, 1.05, 1], opacity: [0, 1, 1] }
                : phase === "out"
                ? {
                    opacity: 0,
                    filter: "blur(12px) brightness(2)", // dissolve effect
                    scale: 1.3,
                  }
                : {}
            }
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ position: "relative", zIndex: 10 }}
          >
            <motion.img
              src={"logo.png"}
              alt="Logo"
              style={{
                width: isMobile ? 260 : 520, // reduce size on mobile
                height: isMobile ? 260 : 520,
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                boxShadow:
                  "0 0 40px rgba(0,255,200,0.5), inset 0 0 25px rgba(0,255,200,0.2)",
              }}
            />
          </motion.div>

          {/* Particle burst on exit */}
          {phase === "out" && (
            <motion.div
              className="absolute inset-0"
              style={{ background: "radial-gradient(circle, rgba(0,255,200,0.2) 0%, transparent 70%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;

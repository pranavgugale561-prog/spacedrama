"use client";

import { useEffect, useRef } from "react";

export default function StardustCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: any[] = [];
        let mouseX = -100;
        let mouseY = -100;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (Math.random() > 0.3) {
                particles.push({
                    x: mouseX,
                    y: mouseY,
                    size: Math.random() * 3 + 1,
                    createdAt: Date.now(),
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5 + 0.5,
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const now = Date.now();

            // Main cursor glow
            if (mouseX > 0 && mouseY > 0) {
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, 6, 0, Math.PI * 2);
                ctx.fillStyle = "#FFD700";
                ctx.shadowBlur = 20;
                ctx.shadowColor = "#FFD700";
                ctx.fill();
                ctx.shadowBlur = 0; // reset
            }

            particles = particles.filter((p) => {
                const age = now - p.createdAt;
                if (age > 1000) return false;

                p.x += p.vx;
                p.y += p.vy;

                const opacity = Math.max(0, 1 - age / 1000);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 215, 0, ${opacity})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(255, 215, 0, ${opacity})`;
                ctx.fill();

                ctx.shadowBlur = 0;
                return true;
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 9999,
            }}
        />
    );
}

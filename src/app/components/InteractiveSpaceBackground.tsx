"use client";

import { useEffect, useRef } from "react";

export default function InteractiveSpaceBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let mouseX = width / 2;
        let mouseY = height / 2;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        // Create stars
        const stars = Array.from({ length: 400 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5,
            speed: Math.random() * 0.5 + 0.1,
            baseAlpha: Math.random() * 0.8 + 0.2,
        }));

        // Create planets
        const planets = [
            { x: Math.random() * width, y: Math.random() * height, radius: 40, color: '#3b82f6', speedX: 0.1, speedY: -0.05, parallax: 0.05 },
            { x: Math.random() * width, y: Math.random() * height, radius: 25, color: '#a855f7', speedX: -0.15, speedY: 0.1, parallax: 0.08 },
            { x: Math.random() * width, y: Math.random() * height, radius: 80, color: '#eab308', speedX: 0.05, speedY: 0.02, parallax: 0.02, isSun: true }
        ];

        let time = 0;

        const animate = () => {
            time += 0.01;

            // Update background with a very dark gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#020617'); // depth of space
            gradient.addColorStop(1, '#0f172a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Draw stars with parallax
            stars.forEach(star => {
                // Move stars slightly
                star.y += star.speed;
                if (star.y > height) star.y = 0;

                // Parallax effect
                const dx = (mouseX - width / 2) * (star.speed * 0.05);
                const dy = (mouseY - height / 2) * (star.speed * 0.05);

                ctx.beginPath();
                const flicker = Math.sin(time * 10 + star.x) * 0.3 + 0.7;
                ctx.fillStyle = `rgba(255, 255, 255, ${star.baseAlpha * flicker})`;
                ctx.arc((star.x + dx + width) % width, star.y + dy, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw planets
            planets.forEach(planet => {
                planet.x += planet.speedX;
                planet.y += planet.speedY;

                // Wrap around
                if (planet.x > width + 100) planet.x = -100;
                if (planet.x < -100) planet.x = width + 100;
                if (planet.y > height + 100) planet.y = -100;
                if (planet.y < -100) planet.y = height + 100;

                // Parallax offset
                const px = (mouseX - width / 2) * planet.parallax;
                const py = (mouseY - height / 2) * planet.parallax;

                const drawX = planet.x + px;
                const drawY = planet.y + py;

                if (planet.isSun) {
                    // Draw Glowing Sun
                    const sunGradient = ctx.createRadialGradient(drawX, drawY, planet.radius * 0.2, drawX, drawY, planet.radius * 2);
                    sunGradient.addColorStop(0, 'rgba(255, 215, 0, 1)');
                    sunGradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.4)');
                    sunGradient.addColorStop(1, 'rgba(255, 69, 0, 0)');

                    ctx.beginPath();
                    ctx.arc(drawX, drawY, planet.radius * 2, 0, Math.PI * 2);
                    ctx.fillStyle = sunGradient;
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(drawX, drawY, planet.radius, 0, Math.PI * 2);
                    ctx.fillStyle = '#FFD700'; // solid core
                    ctx.filter = 'blur(10px)';
                    ctx.fill();
                    ctx.filter = 'none'; // reset
                } else {
                    // Normal planets with shadow for depth
                    const pGradient = ctx.createRadialGradient(
                        drawX - planet.radius * 0.3,
                        drawY - planet.radius * 0.3,
                        planet.radius * 0.1,
                        drawX,
                        drawY,
                        planet.radius
                    );
                    pGradient.addColorStop(0, planet.color);
                    pGradient.addColorStop(1, '#000000');

                    ctx.beginPath();
                    ctx.arc(drawX, drawY, planet.radius, 0, Math.PI * 2);
                    ctx.fillStyle = pGradient;
                    ctx.fill();

                    // Planet atmosphere glow
                    ctx.beginPath();
                    ctx.arc(drawX, drawY, planet.radius + 5, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1, // behind everything
                pointerEvents: 'none',
            }}
        />
    );
}

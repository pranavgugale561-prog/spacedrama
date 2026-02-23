"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RevealOnScroll.module.css";

interface RevealOnScrollProps {
    children: React.ReactNode;
    delay?: number;
}

export default function RevealOnScroll({ children, delay = 0 }: RevealOnScrollProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
                rootMargin: "0px 0px -50px 0px" // Trigger slightly before it comes into view
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`${styles.revealWrapper} ${isVisible ? styles.visible : ""}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

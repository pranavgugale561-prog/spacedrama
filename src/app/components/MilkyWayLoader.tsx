"use client";

import { useEffect, useState } from "react";
import styles from "./MilkyWayLoader.module.css";

export default function MilkyWayLoader() {
    const [loading, setLoading] = useState(true);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        // Simulate loading for 2 seconds, then fade out
        const timer1 = setTimeout(() => {
            setFade(true);
        }, 2000);

        const timer2 = setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "auto";
        }, 2500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!loading) return null;

    return (
        <div className={`${styles.loaderContainer} ${fade ? styles.fadeOut : ""}`}>
            <div className={styles.galaxy}>
                <div className={styles.stars1}></div>
                <div className={styles.stars2}></div>
                <div className={styles.stars3}></div>
            </div>
            <div className={styles.content}>
                <h1 className="text-glow" style={{ color: "var(--gold-primary)", fontSize: "3rem", margin: "0 0 1rem 0", fontFamily: "var(--font-display)" }}>
                    Space Drama
                </h1>
                <p style={{ letterSpacing: "2px", opacity: 0.8, fontWeight: 500, fontFamily: "var(--font-main)" }}>
                    Vibing through the cosmos... No cap. ✨
                </p>
            </div>
        </div>
    );
}

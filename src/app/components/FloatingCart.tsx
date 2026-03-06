"use client";

import { useState, useEffect } from "react";
import styles from "./FloatingCart.module.css";

export default function FloatingCart() {
    const [count, setCount] = useState(0);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const handler = (e: CustomEvent) => {
            setCount(e.detail.count);
            setAnimate(true);
            setTimeout(() => setAnimate(false), 400);
        };
        window.addEventListener("cartUpdated", handler as EventListener);
        return () => window.removeEventListener("cartUpdated", handler as EventListener);
    }, []);

    const scrollToCart = () => {
        const el = document.getElementById("services");
        el?.scrollIntoView({ behavior: "smooth" });
    };

    if (count === 0) return null;

    return (
        <button
            className={`${styles.floatingCart} ${animate ? styles.pop : ""}`}
            onClick={scrollToCart}
            aria-label={`Cart: ${count} items`}
            title="View your cart"
        >
            <span className={styles.icon}>🛒</span>
            <span className={styles.badge}>{count}</span>
        </button>
    );
}

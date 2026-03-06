"use client";

import { useState, useEffect } from "react";
import styles from "./FloatingCart.module.css";
import GalacticQuoteModal from "./GalacticQuoteModal";

interface ServiceItem {
    id: string;
    name: string;
    priceMin: string;
}

export default function FloatingCart() {
    const [count, setCount] = useState(0);
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [animate, setAnimate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handler = (e: CustomEvent) => {
            setCount(e.detail.count);
            setServices(e.detail.services ?? []);
            setAnimate(true);
            setTimeout(() => setAnimate(false), 400);
        };
        window.addEventListener("cartUpdated", handler as EventListener);
        return () => window.removeEventListener("cartUpdated", handler as EventListener);
    }, []);

    if (count === 0) return null;

    return (
        <>
            <button
                className={`${styles.floatingCart} ${animate ? styles.pop : ""}`}
                onClick={() => setIsModalOpen(true)}
                aria-label={`Cart: ${count} items — click to send via WhatsApp`}
                title={`${count} service${count > 1 ? "s" : ""} selected — Send to WhatsApp`}
            >
                <span className={styles.icon}>🛒</span>
                <span className={styles.badge}>{count}</span>
            </button>

            {isModalOpen && (
                <GalacticQuoteModal
                    selectedServices={services}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}

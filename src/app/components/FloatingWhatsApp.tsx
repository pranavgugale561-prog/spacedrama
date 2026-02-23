"use client";

import styles from "./FloatingWhatsApp.module.css";

export default function FloatingWhatsApp() {
    const defaultMessage = "Hi Space Drama! 🌌 I've just landed on your website and I'm interested in redesigning my space in Pune. Could you help me launch my project?";
    const whatsappUrl = `https://wa.me/918329025694?text=${encodeURIComponent(defaultMessage)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.floatingBtn} glass`}
            aria-label="Chat on WhatsApp"
        >
            <div className={styles.starCore}></div>
            <div className={styles.pulseRing}></div>
            <span className={styles.icon}>💬</span>
        </a>
    );
}

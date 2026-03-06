"use client";

import { useState, useEffect } from "react";
import styles from "./LeadCapturePopup.module.css";

const BUDGET_OPTIONS = [
    "Under ₹5 Lakhs",
    "₹5L – ₹10L",
    "₹10L – ₹25L",
    "₹25L – ₹50L",
    "₹50L – ₹1 Crore",
    "Above ₹1 Crore",
];

export default function LeadCapturePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [business, setBusiness] = useState("");
    const [location, setLocation] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [budget, setBudget] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Show popup after 2 seconds if not already submitted
        const alreadySubmitted = localStorage.getItem("spacedrama_lead_captured");
        if (!alreadySubmitted) {
            const timer = setTimeout(() => setIsOpen(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => setIsOpen(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Basic WhatsApp number validation
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(whatsapp.replace(/\D/g, ""))) {
            alert("Please enter a valid 10-digit WhatsApp number.");
            setIsSubmitting(false);
            return;
        }

        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    business,
                    phone: whatsapp,
                    area: location,
                    budget,
                    services: "Initial Enquiry",
                    type: "popup",
                }),
            });

            localStorage.setItem("spacedrama_lead_captured", "true");
            setSubmitted(true);
            setTimeout(() => setIsOpen(false), 2500);
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={`${styles.modal} glass`}>
                {/* Animated stars */}
                <div className={styles.starsBg}>
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className={styles.star} style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                        }} />
                    ))}
                </div>

                <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">×</button>

                {!submitted ? (
                    <>
                        <div className={styles.header}>
                            <div className={styles.badge}>🚀 Welcome to Space Drama</div>
                            <h2 className={`text-glow ${styles.title}`}>
                                Let&apos;s Design Your Universe
                            </h2>
                            <p className={styles.subtitle}>
                                Share your vision &mdash; we&apos;ll craft a space that&apos;s main character energy, guaranteed.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.row}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="popup-name">
                                        <span className={styles.labelIcon}>👤</span> Your Name
                                    </label>
                                    <input
                                        id="popup-name"
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="Eg. Rahul Sharma"
                                        required
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="popup-business">
                                        <span className={styles.labelIcon}>🏢</span> Business / Profession
                                    </label>
                                    <input
                                        id="popup-business"
                                        type="text"
                                        value={business}
                                        onChange={e => setBusiness(e.target.value)}
                                        placeholder="Eg. IT Professional / Café Owner"
                                        className={styles.input}
                                    />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="popup-location">
                                        <span className={styles.labelIcon}>📍</span> Location / Area
                                    </label>
                                    <input
                                        id="popup-location"
                                        type="text"
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                        placeholder="Eg. Baner, Pune"
                                        required
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="popup-whatsapp">
                                        <span className={styles.labelIcon}>💬</span> WhatsApp Number
                                    </label>
                                    <div className={styles.phoneRow}>
                                        <span className={styles.phoneCode}>+91</span>
                                        <input
                                            id="popup-whatsapp"
                                            type="tel"
                                            value={whatsapp}
                                            onChange={e => setWhatsapp(e.target.value.replace(/\D/g, ""))}
                                            placeholder="10-digit number"
                                            required
                                            maxLength={10}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="popup-budget">
                                    <span className={styles.labelIcon}>💰</span> Estimated Budget
                                </label>
                                <select
                                    id="popup-budget"
                                    value={budget}
                                    onChange={e => setBudget(e.target.value)}
                                    required
                                    className={styles.select}
                                >
                                    <option value="" disabled>Select your budget range</option>
                                    {BUDGET_OPTIONS.map(b => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                className={`btn-primary ${styles.submitBtn}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Launching... 🚀" : "Start My Space Journey ✨"}
                            </button>

                            <p className={styles.privacyNote}>
                                We respect your privacy. No spam, ever. 🔒
                            </p>
                        </form>
                    </>
                ) : (
                    <div className={styles.successState}>
                        <div className={styles.successIcon}>🌟</div>
                        <h2 className="text-glow" style={{ color: "var(--gold-primary)" }}>
                            You&apos;re In Orbit!
                        </h2>
                        <p>We&apos;ll be in touch on WhatsApp soon. Get ready for a universe-tier transformation! 🚀</p>
                    </div>
                )}
            </div>
        </div>
    );
}

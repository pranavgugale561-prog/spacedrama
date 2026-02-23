"use client";

import { useState } from "react";
import styles from "./GalacticQuoteModal.module.css";

interface ServiceItem {
    name: string;
    priceMin: string;
}

interface GalacticQuoteModalProps {
    selectedServices: ServiceItem[];
    onClose: () => void;
}

export default function GalacticQuoteModal({ selectedServices, onClose }: GalacticQuoteModalProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [area, setArea] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid Indian phone number (+91).");
            setIsSubmitting(false);
            return;
        }

        try {
            // API call to custom sqlite backend
            await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, area, services: selectedServices.map(s => s.name).join(', ') })
            });

            // Generate WhatsApp Details
            const serviceText = selectedServices.map(s => `- ${s.name} - ${s.priceMin}`).join('\n');

            // Calculate total estimate dynamically or placeholder
            const basePrices = selectedServices.map(s => parseInt(s.priceMin.replace(/[^0-9.]/g, '')) || 0);
            const hasLakhs = selectedServices.some(s => s.priceMin.includes('L'));

            let totalBudget = "Custom Estimate";
            if (hasLakhs && basePrices.length > 0) {
                const sum = basePrices.reduce((a, b) => a + b, 0);
                totalBudget = `₹${sum}L+`;
            } else if (selectedServices.length === 1) {
                totalBudget = selectedServices[0].priceMin;
            }

            const message = `Hello Khushi, I am interested in the following services for my home:\n${serviceText}\nTotal Estimated Budget: ${totalBudget}\nMy Location: ${area}\n\nPlease get in touch!`;

            const whatsappUrl = `https://wa.me/918329025694?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            // Optionally close the modal upon successful launch
            onClose();

        } catch (err) {
            console.error(err);
            alert("Our comms array is down! Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={`${styles.modal} glass`}>
                <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                <h2 className="text-glow" style={{ color: "var(--gold-primary)", marginBottom: "1.5rem", fontFamily: "var(--font-display)" }}>
                    Request a Galactic Quote
                </h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Your Full Name"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Phone Number</label>
                        <div className={styles.phoneInput}>
                            <span>+91</span>
                            <input
                                type="tel"
                                value={phone}
                                onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                                placeholder="10 digit number"
                                required
                                maxLength={10}
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Which area of Pune do you stay in?</label>
                        <select value={area} onChange={e => setArea(e.target.value)} required>
                            <option value="" disabled>Select your neighborhood</option>
                            <option value="Koregaon Park">Koregaon Park</option>
                            <option value="Kalyani Nagar">Kalyani Nagar</option>
                            <option value="Baner">Baner</option>
                            <option value="Aundh">Aundh</option>
                            <option value="Viman Nagar">Viman Nagar</option>
                            <option value="Kothrud">Kothrud</option>
                            <option value="Wakad">Wakad</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-primary" style={{ border: "2px solid var(--gold-primary)", width: "100%", marginTop: "1rem" }} disabled={isSubmitting}>
                        {isSubmitting ? "Generating Link..." : "Send info & Open WhatsApp 🚀"}
                    </button>
                </form>
            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import styles from "./AstroCart.module.css";
import GalacticQuoteModal from "./GalacticQuoteModal";

const SERVICES = [
    { id: "solar-1bhk", name: "The Solar Package (1BHK)", description: "Essential designs for compact urban living. Includes false ceiling, wall textures, modular kitchen basics." },
    { id: "supernova-2bhk", name: "The Supernova Package (2BHK/3BHK)", description: "Premium finishes, false ceilings, custom lighting & modular wardrobes." },
    { id: "galaxy-estate", name: "The Galaxy Estate (Villas/Bungalows)", description: "High-end luxury including landscaping, automation & bespoke furniture." },
    { id: "nebula-lighting", name: "Nebula Lighting Design", description: "Specialized architectural lighting to transform mood — from warm cozy to vibrant social." },
    { id: "cosmic-office", name: "Cosmic Home Office", description: "Ergonomic and soundproof WFH setups designed for IT professionals." },
    { id: "astro-vastu", name: "Astro-Vastu Consultation", description: "Aligning with the Stars — design layouts based on Vastu principles." },
    { id: "stardust-walls", name: "Stardust Wall Treatments", description: "Premium wallpapers, Italian marble textures, or custom paints per room." },
    { id: "celestial-upholstery", name: "Celestial Upholstery", description: "Custom curtains, blinds, and furniture reupholstering." },
    { id: "final-frontier", name: "The 'Final Frontier' Deep Cleaning", description: "Professional post-construction deep clean service." },
    { id: "turnkey-projects", name: "Full Turnkey Projects", description: "Design to Execution — from civil work to final painting, we handle it all." },
    { id: "smart-home", name: "Smart Home Integration", description: "Voice-controlled lighting, blinds & security automation." },
    { id: "civil-structural", name: "Civil & Structural Changes", description: "Tiling, plumbing, and wall demolitions for complete remodelling." },
    { id: "landscape-balcony", name: "Landscape & Balcony Gardening", description: "Vertical gardens, planters and sit-out designs for your green planet." },
    { id: "commercial", name: "Commercial Space Design", description: "Designing work universes — offices, cafés, and retail outlets." },
];

const DEFAULT_PRICES: Record<string, string> = {
    "solar-1bhk": "₹4.5L", "supernova-2bhk": "₹8.5L", "galaxy-estate": "₹25L",
    "nebula-lighting": "₹35K", "cosmic-office": "₹80K", "astro-vastu": "₹11K",
    "stardust-walls": "₹45K", "celestial-upholstery": "₹25K", "final-frontier": "₹8K",
    "turnkey-projects": "₹12L", "smart-home": "₹1.5L", "civil-structural": "₹2.5L",
    "landscape-balcony": "₹40K", "commercial": "₹6L",
};

export default function AstroCart() {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [prices, setPrices] = useState<Record<string, string>>(DEFAULT_PRICES);

    useEffect(() => {
        fetch("/api/prices")
            .then(r => r.json())
            .then(data => setPrices(data))
            .catch(() => { });
    }, []);

    // Broadcast count + full services data to FloatingCart
    useEffect(() => {
        const selectedData = SERVICES
            .filter(s => selectedServices.includes(s.id))
            .map(s => ({ ...s, priceMin: prices[s.id] ?? DEFAULT_PRICES[s.id] }));
        window.dispatchEvent(new CustomEvent("cartUpdated", {
            detail: { count: selectedServices.length, services: selectedData }
        }));
    }, [selectedServices, prices]);

    const toggleService = (id: string) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const selectedData = SERVICES
        .filter(s => selectedServices.includes(s.id))
        .map(s => ({ ...s, priceMin: prices[s.id] ?? DEFAULT_PRICES[s.id] }));

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {SERVICES.map(service => {
                    const isSelected = selectedServices.includes(service.id);
                    const price = prices[service.id] ?? DEFAULT_PRICES[service.id];
                    return (
                        <div
                            key={service.id}
                            className={`${styles.card} glass ${isSelected ? styles.selected : ""}`}
                        >
                            {isSelected && <div className={styles.selectedBadge}>✨ Added</div>}
                            <div className={styles.cardHeader}>
                                <h3>{service.name}</h3>
                            </div>
                            <div className={styles.priceTag}>
                                <span className={styles.priceLabel}>Starting from</span>
                                <span className={styles.price}>{price}</span>
                            </div>
                            <p className={styles.description}>{service.description}</p>
                            <button
                                className={`${styles.addToCartBtn} ${isSelected ? styles.addedBtn : ""}`}
                                onClick={() => toggleService(service.id)}
                            >
                                {isSelected ? "✓ Remove from Cart" : "+ Add to Cart"}
                            </button>
                        </div>
                    );
                })}
            </div>

            {isModalOpen && (
                <GalacticQuoteModal
                    selectedServices={selectedData}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

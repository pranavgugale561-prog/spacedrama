"use client";

import { useState } from "react";
import styles from "./AstroCart.module.css";
import GalacticQuoteModal from "./GalacticQuoteModal";

const SERVICES = [
    // 1. Full-Home Packages (Turnkey)
    { id: "solar-1bhk", name: "The Solar Package (1BHK)", priceMin: "₹4.5L", description: "Essential designs for compact urban living. Includes false ceiling, wall textures, modular kitchen basics." },
    { id: "supernova-2bhk", name: "The Supernova Package (2BHK/3BHK)", priceMin: "₹8.5L", description: "Premium finishes, false ceilings, custom lighting & modular wardrobes." },
    { id: "galaxy-estate", name: "The Galaxy Estate (Villas/Bungalows)", priceMin: "₹25L", description: "High-end luxury including landscaping, automation & bespoke furniture." },

    // 2. Micro-Space Missions (Niche Services)
    { id: "nebula-lighting", name: "Nebula Lighting Design", priceMin: "₹35K", description: "Specialized architectural lighting to transform mood — from warm cozy to vibrant social." },
    { id: "cosmic-office", name: "Cosmic Home Office", priceMin: "₹80K", description: "Ergonomic and soundproof WFH setups designed for IT professionals." },
    { id: "astro-vastu", name: "Astro-Vastu Consultation", priceMin: "₹11K", description: "Aligning with the Stars — design layouts based on Vastu principles." },

    // 3. Surface & Atmosphere (Decor & Styling)
    { id: "stardust-walls", name: "Stardust Wall Treatments", priceMin: "₹45K", description: "Premium wallpapers, Italian marble textures, or custom paints per room." },
    { id: "celestial-upholstery", name: "Celestial Upholstery", priceMin: "₹25K", description: "Custom curtains, blinds, and furniture reupholstering." },
    { id: "final-frontier", name: "The 'Final Frontier' Deep Cleaning", priceMin: "₹8K", description: "Professional post-construction deep clean service." },

    // 4. Expanded Service Catalog (360° Scope)
    { id: "turnkey-projects", name: "Full Turnkey Projects", priceMin: "₹12L", description: "Design to Execution — from civil work to final painting, we handle it all." },
    { id: "smart-home", name: "Smart Home Integration", priceMin: "₹1.5L", description: "Voice-controlled lighting, blinds & security automation." },
    { id: "civil-structural", name: "Civil & Structural Changes", priceMin: "₹2.5L", description: "Tiling, plumbing, and wall demolitions for complete remodelling." },
    { id: "landscape-balcony", name: "Landscape & Balcony Gardening", priceMin: "₹40K", description: "Vertical gardens, planters and sit-out designs for your green planet." },
    { id: "commercial", name: "Commercial Space Design", priceMin: "₹6L", description: "Designing work universes — offices, cafés, and retail outlets." },
];

export default function AstroCart() {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleService = (id: string) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const selectedData = SERVICES.filter(s => selectedServices.includes(s.id));

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {SERVICES.map(service => {
                    const isSelected = selectedServices.includes(service.id);
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
                                <span className={styles.price}>{service.priceMin}</span>
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

            {selectedServices.length > 0 && (
                <div className={`${styles.cartSummary} glass`}>
                    <div className={styles.cartInfo}>
                        <span className="text-glow" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>🛒 Astro-Cart:</span>
                        <span>{selectedServices.length} {selectedServices.length === 1 ? "Service" : "Services"} Selected</span>
                        <div className={styles.cartTags}>
                            {selectedData.map(s => (
                                <span key={s.id} className={styles.cartTag}>{s.name}</span>
                            ))}
                        </div>
                    </div>
                    <button className={`btn-primary ${styles.quoteBtn}`} onClick={() => setIsModalOpen(true)}>
                        🚀 Get Galactic Quote
                    </button>
                </div>
            )}

            {isModalOpen && (
                <GalacticQuoteModal
                    selectedServices={selectedData}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

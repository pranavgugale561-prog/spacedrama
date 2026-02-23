"use client";

import { useState } from "react";
import styles from "./AstroCart.module.css";
import GalacticQuoteModal from "./GalacticQuoteModal";

const SERVICES = [
    // 1. The "Galactic" Full-Home Packages (Turnkey)
    { id: "solar-1bhk", name: "The Solar Package (1BHK)", priceMin: "Custom", description: "Essential designs for compact urban living in Pune." },
    { id: "supernova-2bhk", name: "The Supernova Package (2BHK/3BHK)", priceMin: "Custom", description: "Premium finishes, false ceilings, and custom lighting." },
    { id: "galaxy-estate", name: "The Galaxy Estate (Villas/Bungalows)", priceMin: "Custom", description: "High-end luxury including landscaping and automation." },

    // 2. Micro-Space Missions (Niche Services)
    { id: "nebula-lighting", name: "Nebula Lighting Design", priceMin: "Custom", description: "Specialized architectural lighting to change the mood of a room." },
    { id: "cosmic-office", name: "Cosmic Home Office", priceMin: "Custom", description: "Ergonomic and soundproof WFH setups for IT professionals." },
    { id: "astro-vastu", name: "Astro-Vastu Consultation", priceMin: "Custom", description: "Aligning with the Stars - Design layouts based on Vastu principles." },

    // 3. Surface & Atmosphere (Decor & Styling)
    { id: "stardust-walls", name: "Stardust Wall Treatments", priceMin: "Custom", description: "Premium wallpapers, Italian marble textures, or customized paints." },
    { id: "celestial-upholstery", name: "Celestial Upholstery", priceMin: "Custom", description: "Custom curtains, blinds, and furniture reupholstering." },
    { id: "final-frontier", name: "The 'Final Frontier' Deep Cleaning", priceMin: "Custom", description: "A post-construction deep clean service." },

    // 4. Expanded Service Catalog (360° Scope)
    { id: "turnkey-projects", name: "Full Turnkey Projects", priceMin: "Custom", description: "Design to Execution (From Civil work to Painting)." },
    { id: "smart-home", name: "Smart Home Integration", priceMin: "Custom", description: "The Intelligent Universe: Voice-controlled lighting & automation." },
    { id: "civil-structural", name: "Civil & Structural Changes", priceMin: "Custom", description: "Tiling, plumbing, and wall demolitions for remodeling." },
    { id: "landscape-balcony", name: "Landscape & Balcony Gardening", priceMin: "Custom", description: "Your Green Planet: Vertical gardens and sit-out designs." },
    { id: "commercial", name: "Commercial Space Design", priceMin: "Custom", description: "Designing Work Universes (Offices, Cafes, and Retail outlets)." }
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
                            onClick={() => toggleService(service.id)}
                        >
                            <div className={styles.cardHeader}>
                                <h3>{service.name}</h3>
                                <span className={styles.price}>{service.priceMin}</span>
                            </div>
                            <p>{service.description}</p>
                            <div className={styles.checkbox}>
                                {isSelected && <span className={styles.checkmark}>✨</span>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedServices.length > 0 && (
                <div className={`${styles.cartSummary} glass`}>
                    <div className={styles.cartInfo}>
                        <span className="text-glow" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Astro-Cart:</span>
                        <span>{selectedServices.length} {selectedServices.length === 1 ? 'Service' : 'Services'} Selected</span>
                    </div>
                    <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                        Send Requirements to WhatsApp
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

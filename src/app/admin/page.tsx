"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

type Lead = {
    id: string;
    timestamp: string;
    name: string;
    business?: string;
    phone: string;
    area: string;
    budget?: string;
    services: string;
    type?: string;
    status: string;
};

const SERVICE_NAMES: Record<string, string> = {
    "solar-1bhk": "The Solar Package (1BHK)",
    "supernova-2bhk": "The Supernova Package (2BHK/3BHK)",
    "galaxy-estate": "The Galaxy Estate (Villas/Bungalows)",
    "nebula-lighting": "Nebula Lighting Design",
    "cosmic-office": "Cosmic Home Office",
    "astro-vastu": "Astro-Vastu Consultation",
    "stardust-walls": "Stardust Wall Treatments",
    "celestial-upholstery": "Celestial Upholstery",
    "final-frontier": "The 'Final Frontier' Deep Cleaning",
    "turnkey-projects": "Full Turnkey Projects",
    "smart-home": "Smart Home Integration",
    "civil-structural": "Civil & Structural Changes",
    "landscape-balcony": "Landscape & Balcony Gardening",
    "commercial": "Commercial Space Design",
};

const STATUS_OPTIONS = ["New", "Contacted", "Meeting Fixed", "Project Launched"];
const STATUS_COLORS: Record<string, string> = {
    "New": "#4ade80",
    "Contacted": "#60a5fa",
    "Meeting Fixed": "#f59e0b",
    "Project Launched": "#FFD700",
};

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("All");
    const [activeTab, setActiveTab] = useState<"leads" | "prices">("leads");

    // Prices state
    const [prices, setPrices] = useState<Record<string, string>>({});
    const [editedPrices, setEditedPrices] = useState<Record<string, string>>({});
    const [savingPrices, setSavingPrices] = useState(false);
    const [pricesSaved, setPricesSaved] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "Khushi2026") {
            setIsAuthenticated(true);
            fetchLeads();
            fetchPrices();
        } else {
            alert("Incorrect Access Code.");
        }
    };

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/leads");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setLeads(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchPrices = async () => {
        try {
            const res = await fetch("/api/prices");
            const data = await res.json();
            setPrices(data);
            setEditedPrices(data);
        } catch (err) {
            console.error(err);
        }
    };

    const savePrices = async () => {
        setSavingPrices(true);
        try {
            const res = await fetch("/api/prices", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedPrices),
            });
            const data = await res.json();
            setPrices(data.prices);
            setPricesSaved(true);
            setTimeout(() => setPricesSaved(false), 3000);
        } catch (err) {
            console.error(err);
            alert("Failed to save prices.");
        } finally {
            setSavingPrices(false);
        }
    };

    const updateLeadStatus = async (id: string, newStatus: string) => {
        try {
            await fetch("/api/leads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });
            fetchLeads();
        } catch (err) {
            console.error(err);
            alert("Failed to update status.");
        }
    };

    const filteredLeads = filter === "All" ? leads : leads.filter(l => l.status === filter);

    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === "New").length,
        contacted: leads.filter(l => l.status === "Contacted").length,
        launched: leads.filter(l => l.status === "Project Launched").length,
    };

    const hasChanges = JSON.stringify(editedPrices) !== JSON.stringify(prices);

    if (!isAuthenticated) {
        return (
            <div className={styles.loginContainer}>
                <div className={`glass ${styles.loginCard}`}>
                    <div className={styles.loginLogo}>🚀</div>
                    <h1 className="text-glow" style={{ color: "var(--gold-primary)", marginBottom: "0.5rem" }}>Mission Control</h1>
                    <p style={{ opacity: 0.5, marginBottom: "2rem", fontSize: "0.9rem" }}>Space Drama Admin Panel</p>
                    <form onSubmit={handleLogin} className={styles.loginForm}>
                        <input
                            type="password"
                            placeholder="Enter Access Code"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={styles.loginInput}
                        />
                        <button type="submit" className={styles.loginBtn}>Authenticate 🔐</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className="text-glow" style={{ color: "var(--gold-primary)", fontFamily: "var(--font-display)" }}>
                    🛸 Mission Control
                </h1>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <button onClick={() => { fetchLeads(); fetchPrices(); }} className={styles.refreshBtn}>🔄 Refresh</button>
                    <Link href="/" className={styles.refreshBtn} style={{ textDecoration: "none" }}>← Home</Link>
                </div>
            </header>

            {/* Tab switcher */}
            <div className={styles.tabRow}>
                <button
                    className={`${styles.tabBtn} ${activeTab === "leads" ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab("leads")}
                >
                    📋 Enquiries
                </button>
                <button
                    className={`${styles.tabBtn} ${activeTab === "prices" ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab("prices")}
                >
                    💰 Manage Prices
                </button>
            </div>

            {/* ── LEADS TAB ── */}
            {activeTab === "leads" && (
                <>
                    <div className={styles.statsRow}>
                        <div className={`glass ${styles.statCard}`}>
                            <span className={styles.statNum}>{stats.total}</span>
                            <span className={styles.statLabel}>Total Leads</span>
                        </div>
                        <div className={`glass ${styles.statCard}`}>
                            <span className={styles.statNum} style={{ color: "#4ade80" }}>{stats.new}</span>
                            <span className={styles.statLabel}>New</span>
                        </div>
                        <div className={`glass ${styles.statCard}`}>
                            <span className={styles.statNum} style={{ color: "#60a5fa" }}>{stats.contacted}</span>
                            <span className={styles.statLabel}>Contacted</span>
                        </div>
                        <div className={`glass ${styles.statCard}`}>
                            <span className={styles.statNum} style={{ color: "#FFD700" }}>{stats.launched}</span>
                            <span className={styles.statLabel}>Launched ✨</span>
                        </div>
                    </div>

                    <div className={styles.filterRow}>
                        {["All", ...STATUS_OPTIONS].map(s => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={`${styles.filterBtn} ${filter === s ? styles.filterActive : ""}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    <div className={styles.tableContainer}>
                        {loading ? (
                            <p style={{ padding: "2rem", textAlign: "center" }}>Processing Data...</p>
                        ) : filteredLeads.length === 0 ? (
                            <p style={{ padding: "2rem", textAlign: "center" }}>No leads found. Space is empty 🌌</p>
                        ) : (
                            <table className={styles.leadsTable}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Business</th>
                                        <th>WhatsApp</th>
                                        <th>Location</th>
                                        <th>Budget</th>
                                        <th>Services Selected</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeads.map((lead) => (
                                        <tr key={lead.id}>
                                            <td>{new Date(lead.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}</td>
                                            <td style={{ fontWeight: 600, color: "var(--gold-primary)" }}>{lead.name}</td>
                                            <td>{lead.business || "—"}</td>
                                            <td><a href={`https://wa.me/91${lead.phone}`} target="_blank" rel="noopener noreferrer" style={{ color: "#4ade80" }}>+91 {lead.phone}</a></td>
                                            <td>{lead.area}</td>
                                            <td style={{ color: "#f59e0b", fontWeight: 600 }}>{lead.budget || "—"}</td>
                                            <td className={styles.servicesCell}>{lead.services}</td>
                                            <td>
                                                <span className={`${styles.typeBadge} ${lead.type === "popup" ? styles.typeBadgePopup : styles.typeBadgeCart}`}>
                                                    {lead.type === "popup" ? "Enquiry" : "Cart"}
                                                </span>
                                            </td>
                                            <td>
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                                    className={styles.statusSelect}
                                                    style={{ borderColor: STATUS_COLORS[lead.status] || "rgba(255,255,255,0.2)" }}
                                                >
                                                    {STATUS_OPTIONS.map(o => (
                                                        <option key={o} value={o}>{o}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}

            {/* ── PRICES TAB ── */}
            {activeTab === "prices" && (
                <div className={styles.pricesSection}>
                    <div className={styles.pricesHeader}>
                        <div>
                            <h2 style={{ color: "var(--gold-primary)", fontFamily: "var(--font-display)", marginBottom: "0.3rem" }}>Service Pricing</h2>
                            <p style={{ opacity: 0.5, fontSize: "0.85rem" }}>Changes go live on the website immediately after saving.</p>
                        </div>
                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                            {pricesSaved && <span className={styles.savedTag}>✅ Saved!</span>}
                            <button
                                onClick={() => setEditedPrices(prices)}
                                className={styles.resetBtn}
                                disabled={!hasChanges}
                            >
                                Reset
                            </button>
                            <button
                                onClick={savePrices}
                                className={styles.saveBtn}
                                disabled={savingPrices || !hasChanges}
                            >
                                {savingPrices ? "Saving..." : "💾 Save All Prices"}
                            </button>
                        </div>
                    </div>

                    <div className={styles.pricesGrid}>
                        {Object.entries(SERVICE_NAMES).map(([id, name]) => (
                            <div key={id} className={`glass ${styles.priceRow}`}>
                                <div className={styles.priceServiceName}>{name}</div>
                                <div className={styles.priceInputWrap}>
                                    <span className={styles.priceInputLabel}>Starting from</span>
                                    <input
                                        type="text"
                                        value={editedPrices[id] ?? ""}
                                        onChange={e => setEditedPrices(prev => ({ ...prev, [id]: e.target.value }))}
                                        className={`${styles.priceInput} ${editedPrices[id] !== prices[id] ? styles.priceInputDirty : ""}`}
                                        placeholder="e.g. ₹4.5L"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

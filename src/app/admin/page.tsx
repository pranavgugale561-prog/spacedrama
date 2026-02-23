"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "Khushi2026") {
            setIsAuthenticated(true);
            fetchLeads();
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

    const updateLeadStatus = async (id: string, newStatus: string) => {
        try {
            await fetch("/api/leads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });
            fetchLeads(); // Refresh local data
        } catch (err) {
            console.error(err);
            alert("Failed to update status.");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.loginContainer}>
                <div className={`glass ${styles.loginCard}`}>
                    <h1 className="text-glow" style={{ color: "var(--gold-primary)", marginBottom: "2rem" }}>Mission Control Login</h1>
                    <form onSubmit={handleLogin} className={styles.loginForm}>
                        <input
                            type="password"
                            placeholder="Enter Access Code"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={styles.loginInput}
                        />
                        <button type="submit" className="btn-primary" style={{ width: "100%" }}>Authenticate</button>
                    </form>
                    <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", opacity: 0.6 }}>Authorized Personnel Only (Hint: Khushi2026)</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className="text-glow" style={{ color: "var(--gold-primary)", fontFamily: "var(--font-display)" }}>
                    Mission Control
                </h1>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <button onClick={fetchLeads} className={styles.refreshBtn}>🔄 Refresh</button>
                    <Link href="/" className={styles.refreshBtn} style={{ textDecoration: "none" }}>Launchpad (Home)</Link>
                </div>
            </header>

            <div className={styles.tableContainer}>
                {loading ? (
                    <p style={{ padding: "2rem", textAlign: "center" }}>Processing Data...</p>
                ) : leads.length === 0 ? (
                    <p style={{ padding: "2rem", textAlign: "center" }}>No galactic leads yet. Space is empty.</p>
                ) : (
                    <table className={styles.leadsTable}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Area</th>
                                <th>Services Requested</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead) => (
                                <tr key={lead.id}>
                                    <td>{new Date(lead.timestamp).toLocaleDateString()}</td>
                                    <td style={{ fontWeight: 600 }}>{lead.name}</td>
                                    <td>{lead.phone}</td>
                                    <td>{lead.area}</td>
                                    <td>{lead.services}</td>
                                    <td>
                                        <select
                                            value={lead.status}
                                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                            className={styles.statusSelect}
                                        >
                                            <option value="New">New</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Meeting Fixed">Meeting Fixed</option>
                                            <option value="Project Launched">Project Launched ✨</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

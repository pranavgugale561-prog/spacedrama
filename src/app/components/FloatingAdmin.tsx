"use client";

import Link from "next/link";
import styles from "./FloatingAdmin.module.css";

export default function FloatingAdmin() {
    return (
        <Link href="/admin" className={styles.floatingAdmin} aria-label="Admin Panel" title="Go to Admin Panel">
            <span className={styles.icon}>⚙️</span>
        </Link>
    );
}

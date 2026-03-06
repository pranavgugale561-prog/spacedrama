import styles from "./page.module.css";
import AstroCart from "./components/AstroCart";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import RevealOnScroll from "./components/RevealOnScroll";
import LeadCapturePopup from "./components/LeadCapturePopup";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>✨ VIBE CHECK: PASSED</div>
          <h1 className={styles.title}>
            Main Character Energy <br />
            <span className="text-glow" style={{ color: "var(--gold-primary)" }}>For Your Space.</span>
          </h1>
          <p className={styles.subtitle}>
            Welcome to Space Drama. We craft high-end, universe-tier interiors in Pune. No cap, just pure aesthetics. Let's launch your project.
          </p>
          <div className={styles.ctaGroup}>
            <a href="#services" className="btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
              Explore Services
            </a>
            <a href="https://wa.me/918329025694" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
              Slide into our DMs
            </a>
          </div>
        </div>
      </section>

      <section id="about" className={styles.aboutSection}>
        <RevealOnScroll>
          <div className={`glass ${styles.aboutCard}`}>
            <div className={styles.aboutImageContainer}>
              <img
                src="/khushi.jpg"
                alt="Khushi Surana, CEO"
                className={styles.aboutImage}
              />
            </div>
            <div className={styles.aboutText}>
              <h2 className="text-glow" style={{ fontSize: "2rem", color: "var(--gold-primary)", fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>
                The Architect of the Cosmos
              </h2>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Khushi Surana, CEO</h3>
              <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
                As the visionary behind Space Drama based in Pune, Khushi Surana blends high-tier aesthetics with functional, deep-space inspired design. Every project is a mission to elevate your living universe, turning basic rooms into main character experiences.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <section id="services" className={styles.servicesSection}>
        <RevealOnScroll>
          <div className={styles.sectionHeader}>
            <h2 className="text-glow" style={{ fontSize: "2.5rem", color: "var(--gold-primary)", fontFamily: "var(--font-display)" }}>
              Our 360° Universe
            </h2>
            <p style={{ opacity: 0.8, marginTop: "1rem" }}>Curate your aesthetic. Select services to build your Galactic Quote.</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <AstroCart />
        </RevealOnScroll>
      </section>

      <FloatingWhatsApp />
      <LeadCapturePopup />
    </main>
  );
}

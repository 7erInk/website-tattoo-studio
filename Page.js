import React, { useMemo, useState } from "react";
import "./gold.css";

const categories = [
  "Alle",
  "Realismus",
  "Fine Line",
  "Linework",
  "Handpoke",
];

const portfolioItems = [
  {
    src: "https://images.unsplash.com/photo-1542727365-19732a80dcfd?q=80&w=1200&auto=format&fit=crop",
    category: "Realismus",
    title: "Black & Grey Portrait",
    subtitle: "Tiefe, Kontrast, Langlebigkeit",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
    category: "Fine Line",
    title: "Fine Line Detail",
    subtitle: "Filigran und sauber umgesetzt",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    category: "Linework",
    title: "Clean Linework",
    subtitle: "Klare Formen, präzise Linien",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    category: "Handpoke",
    title: "Handpoke Minimal",
    subtitle: "Reduziert, ruhig, besonders",
  },
  {
    src: "https://images.unsplash.com/photo-1590246814883-57b2d7c6a2ee?q=80&w=1200&auto=format&fit=crop",
    category: "Realismus",
    title: "Realism Sleeve",
    subtitle: "Für Projekte mit Wirkung",
  },
  {
    src: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop",
    category: "Fine Line",
    title: "Elegant Fine Line",
    subtitle: "Feine Ästhetik, saubere Balance",
  },
];

export default function Page() {
  const [filter, setFilter] = useState("Alle");
  const filteredItems = useMemo(() => {
    if (filter === "Alle") return portfolioItems;
    return portfolioItems.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <main style={{ minHeight: "100vh", background: "#0d0d0f", color: "#f3eee7" }}>
      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(13,13,15,0.85)", borderBottom: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem" }}>
          <a href="#hero" className="gold-gradient gold-shine" style={{ fontWeight: 600, fontSize: "1.15rem", letterSpacing: ".35em", textTransform: "uppercase" }}>
            7er Ink
          </a>
          <nav style={{ display: "flex", gap: "2rem", color: "rgba(255,255,255,0.7)" }}>
            <a href="#styles" className="gold-gradient" style={{ transition: "color .2s" }}>Stile</a>
            <a href="#artists" className="gold-gradient" style={{ transition: "color .2s" }}>Artists</a>
            <a href="#portfolio" className="gold-gradient" style={{ transition: "color .2s" }}>Portfolio</a>
            <a href="#preise" className="gold-gradient" style={{ transition: "color .2s" }}>Preise</a>
            <a href="#kontakt" className="gold-gradient" style={{ transition: "color .2s" }}>Kontakt</a>
          </nav>
          <a href="#kontakt" className="gold-btn gold-shine">Termin anfragen</a>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "4rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3.5rem", alignItems: "center", padding: "0 1.5rem" }}>
          <div>
            <div className="gold-btn" style={{ display: "inline-block", fontSize: ".8rem", marginBottom: "1.5rem" }}>
              Bad Wörishofen · 5,0 Sterne · 218 Bewertungen
            </div>
            <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 600, fontSize: "3rem", lineHeight: 1.05, marginBottom: "2rem" }}>
              Premium Tattoos
              <span className="gold-gradient gold-shine" style={{ display: "block", marginTop: ".5rem" }}>mit Wirkung und</span>
              <span style={{ display: "block" }}>Substanz.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.68)", fontSize: "1.1rem", marginBottom: "2rem" }}>
              Black & Grey Realismus, Fine Line, Linework und Handpoke. Für Menschen, die nicht irgendetwas wollen, sondern Qualität, Erfahrung und Tattoos, die auch in Jahren noch stark aussehen.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
              <a href="#kontakt" className="gold-btn gold-shine">Beratung anfragen</a>
              <a href="#portfolio" className="gold-btn" style={{ background: "#151518", color: "#f3eee7", border: "1px solid #c6a15b" }}>Portfolio ansehen</a>
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
              <div>
                <p className="gold-gradient" style={{ fontSize: "2rem", fontWeight: 600 }}>seit 2010</p>
                <p style={{ color: "rgba(255,255,255,0.6)" }}>Erfahrung im Tattoo-Handwerk</p>
              </div>
              <div>
                <p className="gold-gradient" style={{ fontSize: "2rem", fontWeight: 600 }}>218+</p>
                <p style={{ color: "rgba(255,255,255,0.6)" }}>5-Sterne Google-Bewertungen</p>
              </div>
              <div>
                <p className="gold-gradient" style={{ fontSize: "2rem", fontWeight: 600 }}>Premium</p>
                <p style={{ color: "rgba(255,255,255,0.6)" }}>Keine Billig-Tattoos</p>
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=1400&auto=format&fit=crop" alt="Premium Tattoo Studio" style={{ width: "100%", borderRadius: "2rem", boxShadow: "0 30px 120px rgba(0,0,0,0.45)" }} />
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" style={{ padding: "4rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
            <div>
              <p className="gold-gradient" style={{ fontSize: ".8rem", letterSpacing: ".28em", textTransform: "uppercase", marginBottom: ".5rem" }}>Portfolio</p>
              <h2 className="gold-gradient gold-shine" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 600, fontSize: "2.5rem" }}>
                Arbeiten, die nicht
                <span style={{ display: "block" }}>nach Standard aussehen.</span>
              </h2>
            </div>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
              {categories.map((category) => {
                const active = filter === category;
                return (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={active ? "gold-btn gold-shine" : "gold-btn"}
                    style={active ? { fontWeight: 700 } : {}}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            {filteredItems.map((item) => (
              <div key={item.src + item.title} style={{ background: "#151518", borderRadius: "1.6rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                <img src={item.src} alt={item.title} style={{ width: "100%", height: 320, objectFit: "cover" }} />
                <div style={{ padding: "1.5rem" }}>
                  <p className="gold-gradient" style={{ fontSize: ".8rem", letterSpacing: ".25em", textTransform: "uppercase", marginBottom: ".5rem" }}>{item.category}</p>
                  <h3 style={{ fontWeight: 600, fontSize: "1.2rem" }}>{item.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.62)", marginTop: ".5rem" }}>{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


## Plan: Premium-Landingpage für 7er Ink Tattoo Studio

Erstellung einer modernen, hochwertigen, conversionstarken Website für das Tattoo Studio „7er Ink“ mit Fokus auf Premium-Kunden, Exklusivität und Terminbuchung. Die Seite wird als Onepager/Landingpage konzipiert, mit klarer Markenpositionierung, luxuriösem Design und optimaler UX für Desktop und Mobile.

**Steps**
1. **Sitemap/Struktur**
   - Definiere die Seiten- und Inhaltsstruktur als Onepager mit klaren Abschnitten (Hero, Über uns, Leistungen, Artists, Portfolio, Warum 7er Ink, Preise, Ablauf, Bewertungen, Guide, Kontakt, Standort).
2. **UX-Konzept**
   - Entwickle die Nutzerführung, Conversion-Pfade, CTA-Platzierungen, Navigationslogik und mobile Interaktionen.
   - Lege die Informationshierarchie und die Reihenfolge der Abschnitte fest.
   - Definiere Trust-Elemente, Social Proof und Lead-Magnet-Integration.
3. **Visuelles Designkonzept**
   - Erarbeite ein Moodboard/Farbkonzept (Schwarz, Weiß, Anthrazit, Gold-Akzente).
   - Wähle hochwertige Typografie (z.B. Serif für Headlines, Sans-Serif für Fließtext).
   - Definiere Layout, Abstände, Bildinszenierung, Animationen und Premium-UI-Elemente.
   - Lege Bildsprache, Icon-Stil und visuelle Hierarchie fest.
4. **Frontend-Umsetzung**
   - Baue die Seite mit modernem Framework (z.B. React + Tailwind CSS oder Next.js).
   - Implementiere alle Abschnitte als eigenständige Komponenten.
   - Integriere Portfolio-Galerie mit Filter und Lightbox.
   - Baue Sticky Header, Navigation, CTA-Bereiche, Kontaktformulare und Lead-Magnet.
   - Optimiere für SEO, Performance und Accessibility.
   - Stelle Responsiveness und Animationen sicher.
5. **Review & Optimierung**
   - Überprüfe die Seite auf Premium-Wirkung, Conversion-Optimierung und Designqualität.
   - Mache Vorschläge für weitere Verbesserungen (z.B. Micro-Interactions, noch stärkere Trust-Elemente, weitere Conversion-Trigger).

**Relevant files**
- `/components/` — UI-Komponenten (Hero, Artists, Portfolio, etc.)
- `/pages/index.tsx` — Hauptseite/Landingpage
- `/styles/` — Globale Styles, Tailwind-Konfiguration
- `/public/` — Bilder, Icons, Portfolio

**Verification**
1. Responsives Verhalten auf Desktop und Mobile testen
2. Lighthouse-Check für Performance, SEO und Accessibility
3. Usability-Test: Klarheit der CTAs, Lesbarkeit, Conversion-Pfade
4. Design-Review: Luxuriöse, moderne, markenstarke Wirkung
5. Funktionstest: Portfolio-Filter, Lightbox, Kontaktformular, Lead-Magnet

**Decisions**
- Onepager-Struktur für maximale Conversion
- Fokus auf Premium-Positionierung, Exklusivität und Vertrauen
- Keine generischen Tattoo-Designs, sondern Luxury-Brand-Ästhetik
- Gold nur als Akzentfarbe, keine Überladung
- Portfolio und Social Proof als zentrale Conversion-Treiber

**Further Considerations**
1. Framework: React + Tailwind CSS empfohlen (alternativ Next.js für bessere SEO)
2. Bildmaterial: Hochwertige, authentische Fotos erforderlich
3. Optional: Integration von Buchungstools (Calendly, WhatsApp, Instagram)

## Visuelles Designkonzept: 7er Ink Premium-Landingpage

**1. Farbwelt & Mood**
- Hauptfarben: Tiefschwarz (#111111), Anthrazit (#232323), Reinweiß (#FAFAFA), Gold-Akzent (#C9A14A)
- Hintergrund: Dunkel, mit subtiler Textur (Noise/Grain), großzügige Weißräume
- Gold als feine Linie, Underline, Icon, Button-Accent, Hover-Effekt

**2. Typografie**
- Headlines: Edle Serif-Display (z.B. Canela, Playfair Display, Noe Display, ggf. Google Fonts: "Cormorant Garamond")
- Fließtext: Moderne Sans-Serif (z.B. Suisse Int’l, Neue Haas Grotesk, ggf. Google Fonts: "Inter", "Montserrat")
- Großzügige Headline-Größen, hohe Zeilenabstände, klare Hierarchie

**3. Layout & Komposition**
- Luxuriöses, asymmetrisches Grid, großzügige Abstände
- Layering: Bilder überlappen Text, Cards schweben leicht, dezente Schatten
- Sticky Header mit animiertem CTA-Button
- Abschnitte klar voneinander getrennt, aber fließender Übergang

**4. Hero-Section**
- Fullscreen, dunkler Hintergrund mit leichtem Noise
- Großes, unscharfes Studiofoto im Hintergrund, Fokus auf Headline
- Headline mit animiertem Gold-Underline, Subheadline darunter
- Trust-Icons (Sterne, Bewertungen, „seit 2010“) als dezente Row
- Zwei große CTAs: „Termin anfragen“ (Gold, prominent), „Portfolio ansehen“ (Outline)
- Parallax- oder Fade-in-Animation beim Scrollen

**5. Portfolio**
- Masonry-Grid, randlose große Bilder, Gold-Outline bei Hover
- Filter als Tabs mit animiertem Underline
- Lightbox mit dunklem Overlay, Bildinfos, CTA „Beratung anfragen“
- Mobile: horizontales Scroll-Grid, große Touch-Flächen

**6. Artists & Trust**
- Künstler als Premium-Cards: Portrait, Signature, Spezialisierung, Statement
- Testimonials als Slider: Portrait, Bewertung, Zitat, Gold-Sterne
- „Warum 7er Ink“ als Timeline oder Icon-Grid

**7. CTAs & Conversion**
- Sticky Header-CTA (Desktop), Sticky-Bottom-CTA (Mobile)
- Wiederkehrende Mini-CTAs nach Hauptabschnitten
- Lead-Magnet (Tattoo Guide) als edle Sektion mit großem Download-Button

**8. Mobile**
- Mobile-first: große Buttons, klare Hierarchie, horizontales Portfolio-Scrollen
- Sticky-Bottom-CTA, Accordion-Elemente für FAQ/Preise/Ablauf

**9. Details**
- Individuelle Icons, keine Standard-UI-Kits
- Dezente Animationen: Fade, Slide, Parallax, Underline-Animationen
- Elegante Trennlinien, Gold-Gradienten als Akzent

**10. Bildsprache**
- Hochwertige, authentische Studio- und Tattoo-Fotos
- Fokus auf Details, Haut, Atmosphäre, keine Stockfotos

**11. Lokaler Bezug**
- Map-Integration, Städte-Icons, elegante Adressdarstellung

**12. Accessibility & SEO**
- Hoher Kontrast, große Touch-Flächen, semantische Struktur, Alt-Texte

## Frontend-Code-Struktur & Komponenten für 7er Ink

**Empfohlene Technologie:**
- Next.js (React-basiert, SEO-freundlich)
- Tailwind CSS (für schnelles, konsistentes Styling)
- Optional: Framer Motion für Animationen, Headless UI für Accordions/Modals

**Projektstruktur:**
- /pages/index.tsx — Haupt-Landingpage
- /components/
  - Header.tsx (Sticky Header, Navigation, CTA)
  - HeroSection.tsx (Fullscreen Hero, Trust, CTAs)
  - AboutSection.tsx (Über das Studio)
  - ServicesSection.tsx (Leistungen/Stile)
  - ArtistsSection.tsx (Premium-Profile)
  - PortfolioSection.tsx (Masonry-Grid, Filter, Lightbox)
  - WhySection.tsx (Warum 7er Ink)
  - PricingSection.tsx (Preisorientierung)
  - ProcessSection.tsx (Ablauf)
  - ReviewsSection.tsx (Testimonials, Social Proof)
  - GuideSection.tsx (Lead Magnet)
  - ContactSection.tsx (Kontakt, Terminbuchung)
  - LocationSection.tsx (Standort, Map, Städte)
  - Footer.tsx
- /styles/
  - globals.css (Tailwind, Custom Fonts, Noise-Background)
  - theme.ts (Farbvariablen, Typografie)
- /public/
  - images/ (Portfolio, Artists, Studio)
  - icons/ (individuelle Icons)

**Komponenten-Highlights:**
- HeroSection: Großes Bild, animierte Headline, Trust-Row, 2 CTAs
- PortfolioSection: Masonry-Grid, Filter-Tabs, Lightbox, große Bilder
- ArtistsSection: Premium-Cards mit Portrait, Signature, Statement
- ReviewsSection: Slider mit Portrait, Bewertung, Zitat, Gold-Sterne
- GuideSection: Download-CTA, edle Gestaltung
- ContactSection: Sticky-Bottom-CTA (Mobile), Kontaktmöglichkeiten, Info-Reminder

**Besondere Features:**
- Sticky Header & Sticky-Bottom-CTA (Mobile)
- Parallax- und Fade-in-Animationen
- Gold-Underline-Animationen
- Horizontales Scrollen im Portfolio (Mobile)
- Accordion für Preise/Ablauf
- Map-Integration (z.B. Google Maps Embed, custom-styled)
- SEO: Title, Description, OpenGraph, strukturierte Daten
- Accessibility: ARIA-Labels, Fokus-States, Alt-Texte

**Nächster Schritt:**
- Beispielcode für die wichtigsten Komponenten (Hero, Portfolio, Artists, CTAs, etc.)

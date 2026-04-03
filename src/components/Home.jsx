import { useEffect, useRef, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

  :root {
    --cream:      #FAF7F2;
    --cream-dark: #F0EBE1;
    --ink:        #2C2318;
    --ink-soft:   #5A4E42;
    --ink-muted:  #9A8E82;
    --accent:     #C4603A;
    --accent-hover: #A84E2E;
    --border:     #E4DBD0;
    --gold:       #C8920A;
    --brown-border: #8B7355;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    overflow-x: hidden;
  }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--cream-dark); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

  /* ══════════ NAVBAR ══════════ */
  .nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 48px;
    background: rgba(250, 247, 242, 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    transition: box-shadow 0.3s ease;
  }
  .nav.scrolled {
    box-shadow: 0 2px 24px rgba(44, 35, 24, 0.06);
  }
  .nav-brand {
    display: flex; align-items: center; gap: 12px;
    text-decoration: none;
  }
  .nav-logo {
    width: 38px; height: 38px;
    border: 2px solid var(--accent);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
  }
  .nav-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 600;
    color: var(--ink);
    letter-spacing: 0.03em;
  }
  .nav-links {
    display: flex; align-items: center; gap: 32px;
    list-style: none;
  }
  .nav-links a {
    font-size: 14px; font-weight: 500;
    color: var(--ink-soft);
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--accent); }
  .nav-cta {
    padding: 10px 24px;
    background: var(--ink);
    color: var(--cream) !important;
    border-radius: 8px;
    font-weight: 600 !important;
    transition: background 0.2s, transform 0.15s !important;
  }
  .nav-cta:hover {
    background: #1A1610 !important;
    color: var(--cream) !important;
    transform: translateY(-1px);
  }

  /* ══════════ HERO ══════════ */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 120px 48px 80px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; top: -30%; right: -15%;
    width: 700px; height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(196,96,58,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero::after {
    content: '';
    position: absolute; bottom: -20%; left: -10%;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,146,10,0.04) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-content {
    max-width: 720px;
    text-align: center;
    position: relative; z-index: 2;
  }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 18px;
    background: var(--cream-dark);
    border: 1px solid var(--border);
    border-radius: 100px;
    font-size: 12px; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 32px;
    opacity: 0;
    animation: fadeUp 0.7s ease forwards 0.2s;
  }
  .hero-badge::before {
    content: '';
    width: 6px; height: 6px;
    background: var(--accent);
    border-radius: 50%;
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(42px, 5.5vw, 72px);
    font-weight: 700;
    line-height: 1.1;
    color: var(--ink);
    margin-bottom: 24px;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards 0.4s;
  }
  .hero-title em {
    color: var(--accent);
    font-style: italic;
  }

  .hero-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 2vw, 22px);
    font-weight: 300;
    font-style: italic;
    line-height: 1.7;
    color: var(--ink-soft);
    max-width: 540px;
    margin: 0 auto 40px;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards 0.6s;
  }

  .hero-actions {
    display: flex; align-items: center; justify-content: center; gap: 16px;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards 0.8s;
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px;
    background: var(--accent);
    color: var(--cream);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600;
    letter-spacing: 0.02em;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 4px 16px rgba(196, 96, 58, 0.2);
  }
  .btn-primary:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(196, 96, 58, 0.3);
  }
  .btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px;
    background: transparent;
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 500;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.25s ease;
    text-decoration: none;
  }
  .btn-secondary:hover {
    border-color: var(--ink-muted);
    background: var(--cream-dark);
  }

  .hero-line {
    width: 1px; height: 80px;
    background: linear-gradient(to bottom, var(--border), transparent);
    margin: 0 auto;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards 1s;
  }

  /* ══════════ STATS STRIP ══════════ */
  .stats-strip {
    display: flex; justify-content: center; gap: 64px;
    padding: 48px;
    background: var(--ink);
    position: relative;
  }
  .stats-strip::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--accent), var(--gold), var(--accent), transparent);
  }
  .stat-item { text-align: center; }
  .stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 36px; font-weight: 700;
    color: var(--cream);
    line-height: 1;
    margin-bottom: 6px;
  }
  .stat-label {
    font-size: 12px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(250,247,242,0.45);
  }

  /* ══════════ ABOUT ══════════ */
  .about {
    padding: 100px 48px;
    position: relative;
  }
  .about-inner {
    max-width: 1080px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  .section-label {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 18px;
  }
  .section-label::before {
    content: '';
    width: 22px; height: 1.5px;
    background: var(--accent);
  }
  .about-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 3vw, 40px);
    font-weight: 600;
    line-height: 1.25;
    color: var(--ink);
    margin-bottom: 20px;
  }
  .about-heading em {
    font-style: italic; color: var(--accent);
  }
  .about-text {
    font-size: 15px; line-height: 1.8;
    color: var(--ink-soft);
    margin-bottom: 12px;
  }
  .about-text-sm {
    font-size: 14px; line-height: 1.75;
    color: var(--ink-muted);
  }

  /* Vertical feature list on the right */
  .features-list {
    display: flex; flex-direction: column; gap: 20px;
  }
  .feature-item {
    display: flex; gap: 18px; align-items: flex-start;
    padding: 24px;
    background: white;
    border: 1px solid var(--border);
    border-radius: 14px;
    transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  }
  .feature-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(44,35,24,0.06);
    border-color: rgba(196,96,58,0.2);
  }
  .feature-icon {
    width: 44px; height: 44px;
    flex-shrink: 0;
    background: linear-gradient(135deg, #F5EDE8, #EDE2D8);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
  }
  .feature-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px; font-weight: 600;
    color: var(--ink);
    margin-bottom: 4px;
  }
  .feature-desc {
    font-size: 13px; line-height: 1.65;
    color: var(--ink-muted);
  }

  /* ══════════ CTA SECTION ══════════ */
  .cta-section {
    padding: 80px 48px;
    background: var(--cream-dark);
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .cta-section::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 10%, var(--border) 50%, transparent 90%);
  }
  .cta-content {
    max-width: 560px;
    margin: 0 auto;
  }
  .cta-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(24px, 3vw, 36px);
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 16px;
  }
  .cta-heading em { font-style: italic; color: var(--accent); }
  .cta-text {
    font-size: 15px; line-height: 1.7;
    color: var(--ink-muted);
    margin-bottom: 32px;
  }

  /* ══════════ FOOTER ══════════ */
  .site-footer {
    background: var(--ink);
    padding: 40px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .footer-brand {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 600;
    color: var(--cream);
    letter-spacing: 0.03em;
  }
  .footer-brand span { color: var(--accent); }
  .footer-links {
    display: flex; gap: 28px;
    list-style: none;
  }
  .footer-links a {
    font-size: 13px; font-weight: 400;
    color: rgba(250,247,242,0.4);
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: rgba(250,247,242,0.8); }
  .footer-copy {
    font-size: 12px;
    color: rgba(250,247,242,0.25);
    letter-spacing: 0.03em;
  }

  /* ══════════ ANIMATIONS ══════════ */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ══════════ SCROLL REVEAL ══════════ */
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ══════════ RESPONSIVE ══════════ */
  @media (max-width: 768px) {
    .nav { padding: 16px 24px; }
    .nav-links { gap: 16px; }
    .hero { padding: 100px 24px 60px; }
    .hero-actions { flex-direction: column; }
    .stats-strip { flex-wrap: wrap; gap: 32px; padding: 32px 24px; }
    .about { padding: 64px 24px; }
    .about-inner { grid-template-columns: 1fr; gap: 48px; }
    .cta-section { padding: 56px 24px; }
    .site-footer {
      flex-direction: column; gap: 20px;
      text-align: center; padding: 32px 24px;
    }
    .footer-links { flex-wrap: wrap; justify-content: center; }
  }
`;

function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const prog = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(prog * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

export default function Home({ onGetStarted }) {
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const revealRefs = useRef([]);

  const c1 = useCounter(1200, 1400, statsVisible);
  const c2 = useCounter(350, 1400, statsVisible);
  const c3 = useCounter(48, 1400, statsVisible);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Stats counter trigger
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) setStatsVisible(true);
      }

      // Reveal elements
      revealRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88) {
          el.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll(); // initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const features = [
    {
      title: "Research Collaboration",
      desc: "Connect across disciplines to co-author papers, share datasets, and accelerate discovery together.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4603A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      ),
    },
    {
      title: "Expert Mentorship",
      desc: "Get paired with experienced faculty mentors who guide your academic and professional journey.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4603A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      title: "Idea Incubation",
      desc: "From a spark of curiosity to a published work — VNexus gives your ideas the structure to flourish.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4603A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="6"/>
          <line x1="12" y1="18" x2="12" y2="22"/>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
          <line x1="2" y1="12" x2="6" y2="12"/>
          <line x1="18" y1="12" x2="22" y2="12"/>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{styles}</style>

      {/* ══ NAVBAR ══ */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        {/* eslint-disable-next-line */}
        <a href="#" className="nav-brand" onClick={(e) => e.preventDefault()}>
          <div className="nav-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L20.5 8V16L12 21L3.5 16V8L12 3Z"
                stroke="#C4603A" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
              <path d="M12 7L17 10V14L12 17L7 14V10L12 7Z"
                stroke="#C4603A" strokeWidth="1.2" fill="rgba(196,96,58,0.12)" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="nav-name">VNexus</span>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li>
            {/* eslint-disable-next-line */}
            <a href="#" className="nav-cta" onClick={(e) => { e.preventDefault(); if (onGetStarted) onGetStarted(); }}>
              Get Started
            </a>
          </li>
        </ul>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Academic Platform</div>

          <h1 className="hero-title">
            Where Ideas Meet<br /><em>Collaboration</em>
          </h1>

          <p className="hero-subtitle">
            Bridging the gap between students, researchers, and mentors —
            turning potential into published impact.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={onGetStarted}>
              Get Started
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
            <a href="#about" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>
        <div className="hero-line" />
      </section>

      {/* ══ STATS STRIP ══ */}
      <div className="stats-strip" ref={statsRef}>
        <div className="stat-item">
          <div className="stat-number">{c1.toLocaleString()}+</div>
          <div className="stat-label">Members</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{c2}+</div>
          <div className="stat-label">Projects</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{c3}+</div>
          <div className="stat-label">Mentors</div>
        </div>
      </div>

      {/* ══ ABOUT ══ */}
      <section className="about" id="about">
        <div className="about-inner">
          <div ref={addRevealRef} className="reveal">
            <div className="section-label">Who We Are</div>
            <h2 className="about-heading">
              Building the future of <em>academic exchange</em>
            </h2>
            <p className="about-text">
              VNexus is a platform where students, researchers, and mentors converge
              to turn ideas into impact — bridging the gap between potential and opportunity.
            </p>
            <p className="about-text-sm">
              Whether you're a first-year student seeking guidance or a seasoned researcher
              looking for collaborators, VNexus creates the connections that move knowledge forward.
              Our community thrives on shared curiosity, rigorous thinking, and the belief that
              great ideas deserve great support.
            </p>
          </div>

          <div className="features-list" id="features" ref={addRevealRef} style={{ transitionDelay: '0.15s' }}>
            {features.map((f) => (
              <div className="feature-item reveal" key={f.title} ref={addRevealRef}>
                <div className="feature-icon">{f.icon}</div>
                <div>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta-section" ref={addRevealRef}>
        <div className="cta-content reveal" ref={addRevealRef}>
          <h2 className="cta-heading">
            Ready to begin your <em>journey</em>?
          </h2>
          <p className="cta-text">
            Join a growing community of academics collaborating to push the boundaries
            of research, innovation, and mentorship.
          </p>
          <button className="btn-primary" onClick={onGetStarted}>
            Join VNexus
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </button>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="site-footer">
        <div className="footer-brand">V<span>N</span>EXUS</div>
        <ul className="footer-links">
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          {/* eslint-disable-next-line */}
          <li><a href="#" onClick={(e) => { e.preventDefault(); if (onGetStarted) onGetStarted(); }}>Get Started</a></li>
        </ul>
        <div className="footer-copy">&copy; 2026 VNexus. All rights reserved.</div>
      </footer>
    </>
  );
}
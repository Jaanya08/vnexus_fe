import { useEffect, useRef, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap');

  :root {
    --cream:      #FAF7F2;
    --cream-dark: #F0EBE1;
    --ink:        #2C2318;
    --ink-soft:   #5A4E42;
    --ink-muted:  #9A8E82;
    --accent:     #C4603A;
    --border:     #E4DBD0;
    --gold:       #C8920A;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--ink); overflow-x: hidden; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--cream-dark); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

  /* ══ HERO ══ */
  .hero {
    width: 100%;
    min-height: 100vh;
    background: var(--cream);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid var(--border);
  }
  /* Subtle warm grain texture */
  .hero::after {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0;
  }

  /* ── LOGO top left ── */
  .logo-wrap {
    position: absolute;
    top: 24px;
    left: 36px;
    display: flex; align-items: center; gap: 12px;
    z-index: 20;
    animation: fadeDown 0.8s ease forwards;
  }
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .logo-icon {
    width: 46px; height: 46px;
    border: 2px solid var(--accent);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
  }
  .logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 600;
    color: var(--ink);
    letter-spacing: 0.04em;
  }

  /* ── HERO CONTENT WRAPPER ── */
  .hero-wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-bottom: 40px;
  }

  /* ── SPOTLIGHT TEXT (from provided code logic) ── */
  .fill {
    width: 580px;
    text-align: left;
    padding-left: 40px;
    position: relative;
    z-index: 5;
  }

  .hero-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(56px, 7vw, 88px);
    font-weight: 700;
    line-height: 1.0;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin-bottom: 16px;
    opacity: 0;
    animation: fadeUp 0.9s ease forwards 0.5s;
  }
  .hero-heading-accent { color: var(--accent); font-style: italic; }

  .heading-line {
    width: 56px; height: 3px;
    background: linear-gradient(90deg, var(--accent), #C8920A);
    border-radius: 2px;
    margin-bottom: 28px;
    opacity: 0;
    animation: fadeUp 0.9s ease forwards 0.7s;
  }

  /* THE SPOTLIGHT TAGLINE — light theme version */
  .tagline-spotlight {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(20px, 2.4vw, 27px);
    font-weight: 300;
    font-style: italic;
    line-height: 1.6;
    max-width: 420px;
    margin-bottom: 32px;
    /* Spotlight: cream bg → warm amber highlight → cream bg */
    background: linear-gradient(90deg, #C8B09A, #2C2318, #C8B09A);
    background-size: 55%;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fadeUp 0.9s ease forwards 0.9s,
               spotlight 2.8s linear 1.2s alternate infinite;
  }

  @keyframes spotlight {
    from { background-position: -20%; }
    to   { background-position: 110%; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── GET STARTED BUTTON ── */
  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    background: var(--accent);
    color: var(--cream);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.02em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(196, 96, 58, 0.2);
    opacity: 0;
    animation: fadeUp 0.9s ease forwards 1.1s;
  }

  .cta-button:hover {
    background: #B35531;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(196, 96, 58, 0.3);
  }

  .cta-button:active {
    transform: translateY(0);
  }

  .cta-arrow {
    transition: transform 0.3s ease;
  }

  .cta-button:hover .cta-arrow {
    transform: translateX(4px);
  }

  /* ── LAMP (moved up to illuminate tagline) ── */
  .lamp {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    width: 220px;
    height: 420px;
    flex-shrink: 0;
    margin-bottom: 0;
    transform: translateY(-100px);
  }

  .lamp .bulb {
    z-index: 2;
    position: absolute;
    bottom: 200px;
    right: 65px;
    width: 100px;
    height: 50px;
    background-color: #5e1e1e;
    border-radius: 50px 50px 0 0;
    transform: rotate(70deg);
    animation: bulbSway 4s linear infinite;
    box-shadow: 0 0 20px rgba(255,200,60,0.2), inset 0 0 12px rgba(255,180,40,0.1);
  }

  /* Light cone — pointing left toward text */
  .lamp .bulb::after {
    z-index: 1;
    content: '';
    display: block;
    border-bottom: 320px solid rgba(200, 140, 60, 0.18);
    border-left: 70px solid transparent;
    border-right: 70px solid transparent;
    height: 0;
    width: 80px;
    position: absolute;
    top: 50px;
    left: -50px;
    filter: blur(3px);
  }

  /* Subtle warm glow around bulb */
  .lamp .bulb::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 60px; height: 60px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,220,80,0.5) 0%, transparent 70%);
    filter: blur(8px);
    animation: bulbGlow 4s linear infinite;
  }

  @keyframes bulbSway {
    0%   { transform: rotate(70deg); }
    50%  { transform: rotate(50deg); }
    100% { transform: rotate(70deg); }
  }
  @keyframes bulbGlow {
    0%   { opacity: 0.8; }
    50%  { opacity: 1; }
    100% { opacity: 0.8; }
  }

  .lamp .stand {
    width: 10px;
    height: 120px;
    background-color: rgb(220, 220, 220);
    transform: translateX(-60px) translateY(25px) rotate(30deg);
    border-radius: 5px;
  }
  .lamp .stand::after {
    content: '';
    display: block;
    width: 20px; height: 20px;
    background-color: #5e1e1e;
    border-radius: 50%;
    position: absolute;
    top: -5px; left: -8px;
    box-shadow: 0 0 8px rgba(255,180,60,0.3);
  }
  .lamp .stand::before {
    content: '';
    display: block;
    width: 10px; height: 120px;
    background-color: rgb(220, 220, 220);
    transform: translateY(-70%) translateX(-48px) rotate(-60deg);
    border-radius: 5px;
  }

  .lamp .base {
    position: relative;
    width: 150px; height: 30px;
    background-color: #5e1e1e;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 4px 20px rgba(94,30,30,0.4);
  }
  .lamp .base::after {
    content: '';
    position: absolute;
    top: 4px; left: 12px;
    width: 60px; height: 4px;
    background: rgba(255,200,200,0.15);
    border-radius: 2px;
  }

  /* Flashlight reveal — floor glow pool */
  .floor-glow {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 180px;
    background: radial-gradient(ellipse 50% 60% at 60% 100%, rgba(200,140,40,0.10) 0%, transparent 80%);
    pointer-events: none;
    animation: floorPulse 4s ease-in-out infinite;
  }
  @keyframes floorPulse {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.65; }
  }

  /* Scroll hint */
  .scroll-hint {
    position: absolute; bottom: 22px; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--ink-muted);
    cursor: pointer; z-index: 10;
    opacity: 0; animation: fadeUp 1s ease forwards 2s;
  }
  @keyframes bounceDown { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
  .scroll-arrow { animation: bounceDown 1.8s ease-in-out infinite; }

  /* ══ DIVIDER ══ */
  .section-divider {
    display: flex; align-items: center; gap: 18px;
    padding: 0 80px;
  }
  .div-line { flex: 1; height: 1px; background: var(--border); }
  .div-dot  { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); }

  /* ══ ABOUT ══ */
  .about {
    background: var(--cream-dark);
    padding: 96px 80px;
    position: relative; overflow: hidden;
  }
  .about::before {
    content: ''; position: absolute;
    top: -80px; right: -80px;
    width: 340px; height: 340px; border-radius: 50%;
    background: radial-gradient(circle, rgba(196,96,58,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .about-inner {
    max-width: 1080px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start;
  }
  .about-label {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 18px;
  }
  .about-label::before { content: ''; width: 22px; height: 1.5px; background: var(--accent); }
  .about-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 3.2vw, 42px); font-weight: 600;
    line-height: 1.22; color: var(--ink); margin-bottom: 22px;
  }
  .about-heading em { font-style: italic; color: var(--accent); }
  .about-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px; font-weight: 300; line-height: 1.75;
    color: var(--ink-soft); margin-bottom: 16px;
  }
  .about-text-sm {
    font-size: 14px; line-height: 1.75; color: var(--ink-muted);
  }
  .about-stats {
    display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 36px;
  }
  .stat-card {
    padding: 22px 16px;
    background: var(--cream); border: 1px solid var(--border); border-radius: 12px;
    text-align: center; transition: transform 0.2s, box-shadow 0.2s;
  }
  .stat-card:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(44,35,24,0.08); }
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 34px; font-weight: 700; color: var(--accent); line-height: 1; margin-bottom: 5px;
  }
  .stat-label { font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-muted); }

  .about-features { display: flex; flex-direction: column; gap: 18px; }
  .feature-card {
    padding: 26px 28px;
    background: var(--cream); border: 1px solid var(--border); border-radius: 14px;
    display: flex; gap: 18px; align-items: flex-start;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  }
  .feature-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(44,35,24,0.07);
    border-color: rgba(196,96,58,0.25);
  }
  .feature-icon {
    width: 42px; height: 42px; flex-shrink: 0;
    background: #F5EDE8; border-radius: 10px;
    display: flex; align-items: center; justify-content: center; font-size: 19px;
  }
  .feature-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px; font-weight: 600; color: var(--ink); margin-bottom: 5px;
  }
  .feature-desc { font-size: 13px; line-height: 1.65; color: var(--ink-muted); }

  /* ══ FOOTER ══ */
  .footer-strip {
    background: var(--ink); padding: 28px 80px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .footer-brand {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 700; color: #FAF7F2; letter-spacing: 0.04em;
  }
  .footer-brand span { color: var(--accent); }
  .footer-copy { font-size: 12px; color: rgba(250,247,242,0.38); letter-spacing: 0.05em; }

  @media (max-width: 768px) {
    .fill { width: 90vw; padding-left: 20px; }
    .hero-heading { font-size: 48px; }
    .lamp { width: 160px; transform: translateY(-60px); }
    .about { padding: 56px 24px; }
    .about-inner { grid-template-columns: 1fr; gap: 44px; }
    .section-divider { padding: 0 24px; }
    .footer-strip { padding: 24px; flex-direction: column; gap: 10px; text-align: center; }
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

export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false);
  const aboutRef = useRef(null);
  const c1 = useCounter(1200, 1600, statsVisible);
  const c2 = useCounter(350,  1600, statsVisible);
  const c3 = useCounter(48,   1600, statsVisible);

  useEffect(() => {
    const onScroll = () => {
      if (aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.82) setStatsVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* ══ HERO ══ */}
      <section className="hero">

        {/* LOGO — top left */}
        <div className="logo-wrap">
          <div className="logo-icon">
            {/* Hexagon icon matching the logo image */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3L20.5 8V16L12 21L3.5 16V8L12 3Z"
                stroke="#C4603A" strokeWidth="1.8" fill="none" strokeLinejoin="round"
              />
              <path
                d="M12 7L17 10V14L12 17L7 14V10L12 7Z"
                stroke="#C4603A" strokeWidth="1.2" fill="rgba(196,96,58,0.12)" strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="logo-text">VNexus</span>
        </div>

        {/* HERO CONTENT */}
        <div className="hero-wrapper">
          {/* TEXT LEFT */}
          <div className="fill">
            <h1 className="hero-heading">
              VN<span className="hero-heading-accent">EXUS</span>
            </h1>
            <div className="heading-line" />
            <p className="tagline-spotlight">
              Where ideas meet mentorship and research becomes collaboration.
            </p>
            <button className="cta-button" onClick={() => alert('Get Started clicked!')}>
              Get Started
              <svg className="cta-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
          </div>

          {/* LAMP RIGHT — exact structure from provided code */}
          <div className="lamp">
            <div className="bulb"></div>
            <div className="stand"></div>
            <div className="base"></div>
          </div>
        </div>

        {/* Floor warm glow */}
        <div className="floor-glow" />

        {/* Scroll hint */}
        <div
          className="scroll-hint"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span>Scroll</span>
          <svg className="scroll-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 3v10M3 9l5 5 5-5"/>
          </svg>
        </div>
      </section>

      {/* ══ DIVIDER ══ */}
      <div className="section-divider">
        <div className="div-line"/><div className="div-dot"/><div className="div-line"/>
      </div>

      {/* ══ ABOUT ══ */}
      <section className="about" id="about" ref={aboutRef}>
        <div className="about-inner">
          <div>
            <div className="about-label">Who We Are</div>
            <h2 className="about-heading">
              Building the future of <em>academic collaboration</em>
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
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-num">{c1.toLocaleString()}+</div>
                <div className="stat-label">Members</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">{c2}+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">{c3}+</div>
                <div className="stat-label">Mentors</div>
              </div>
            </div>
          </div>

          <div className="about-features">
            {[
              { icon: "🔬", title: "Research Collaboration", desc: "Connect across disciplines to co-author papers, share datasets, and accelerate discovery together." },
              { icon: "🧭", title: "Expert Mentorship", desc: "Get paired with experienced mentors who guide your academic and professional journey with real insight." },
              { icon: "💡", title: "Idea Incubation", desc: "From a spark of curiosity to a published work — VNexus gives your ideas the structure they need to flourish." },
            ].map((f) => (
              <div className="feature-card" key={f.title}>
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

      {/* ══ FOOTER ══ */}
      <footer className="footer-strip">
        <div className="footer-brand">V<span>N</span>EXUS</div>
        <div className="footer-copy">© 2026 VNexus. All rights reserved.</div>
      </footer>
    </>
  );
}
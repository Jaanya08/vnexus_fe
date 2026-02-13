import { useEffect, useRef, useState } from "react";


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Lora:ital,wght@0,400;1,400;1,600&display=swap');

  :root {
    --cream:      #FAF7F2;
    --cream-dark: #F0EBE1;
    --ink:        #2C2318;
    --ink-soft:   #5A4E42;
    --ink-muted:  #9A8E82;
    --accent:     #C4603A;
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
    position: relative;
  }
  
  /* Elegant page frame border */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 8px solid var(--brown-border);
    pointer-events: none;
    z-index: 9999;
    box-shadow: 
      inset 0 0 20px rgba(139, 115, 85, 0.15),
      0 0 30px rgba(139, 115, 85, 0.1);
  }
  
  /* Inner decorative border */
  body::after {
    content: '';
    position: fixed;
    top: 16px;
    left: 16px;
    right: 16px;
    bottom: 16px;
    border: 1px solid rgba(139, 115, 85, 0.3);
    pointer-events: none;
    z-index: 9998;
  }
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
    border-bottom: 3px solid var(--brown-border);
    /* Inner decorative border */
    box-shadow: inset 0 -3px 12px rgba(139, 115, 85, 0.2);
  }
  .hero::after {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0;
  }

  /* Decorative corner flourish - top left */
  
  .logo-wrap {
    position: absolute;
    top: 20px;
    left: 36px;
    display: flex; align-items: center; gap: 12px;
    z-index: 20;
    opacity: 0;
    animation: fadeDown 0.8s ease forwards 0.3s;
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

  .hero-wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-bottom: 60px;
  }

  .fill {
    width: 580px;
    text-align: left;
    padding-left: 40px;
    position: relative;
    z-index: 5;
    margin-top: -80px; /* Move content up to create better spacing */
  }

  .hero-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(56px, 7vw, 88px);
    font-weight: 700;
    line-height: 1.0;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin-bottom: 28px;
    opacity: 0;
    animation: fadeUp 0.9s ease forwards 0.5s;
  }

  .hero-heading-accent { color: var(--accent); font-style: italic; }

 .heading-line {
  width: 56px;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), #C8920A);
  border-radius: 2px;
  margin-top: 60px;   /* moves the line a little below VNEXUS */
  margin-bottom: 60px;
}


  .tagline-spotlight {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(20px, 2.4vw, 27px);
    font-weight: 300;
    font-style: italic;
    line-height: 1.6;
    max-width: 420px;
    margin-top: 100px;   /* pushes tagline slightly down */
  margin-bottom: 30px;
  margin-left:150px;

    background: linear-gradient(90deg, #C8B09A, #2C2318, #C8B09A);
    background-size: 55%;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0;
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
   margin-top:50px;
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

  /* ── LAMP (synchronized with text, pointing at tagline) ── */
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
    margin-top: -150px; /* Align with text positioning */
    transform: translateY(-220px); /* Position lamp higher to illuminate tagline */
    opacity: 0;
    animation: fadeUp 0.9s ease forwards 0.5s; /* Same timing as heading */
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
    transform: rotate(75deg); /* Angle more towards tagline */
    animation: bulbSway 4s linear infinite;
    box-shadow: 0 0 25px rgba(255,200,60,0.3), inset 0 0 15px rgba(255,180,40,0.15);
  }

  /* Light cone — enhanced and pointed at tagline */
  .lamp .bulb::after {
    z-index: 1;
    content: '';
    display: block;
    border-bottom: 380px solid rgba(200, 140, 60, 0.22);
    border-left: 85px solid transparent;
    border-right: 85px solid transparent;
    height: 0;
    width: 90px;
    position: absolute;
    top: 48px;
    left: -58px;
    filter: blur(5px);
    opacity: 0;
    animation: lightFadeIn 0.9s ease forwards 0.9s; /* Sync with tagline */
  }

  @keyframes lightFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Enhanced warm glow around bulb - more realistic */
  .lamp .bulb::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 80px; height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,235,100,0.7) 0%, rgba(255,200,60,0.4) 40%, transparent 70%);
    filter: blur(12px);
    opacity: 0;
    animation: bulbGlowFade 4s linear 0.9s infinite;
  }

  @keyframes bulbSway {
    0%   { transform: rotate(75deg); }
    50%  { transform: rotate(55deg); }
    100% { transform: rotate(75deg); }
  }
  
  @keyframes bulbGlowFade {
    0%   { opacity: 0.7; }
    50%  { opacity: 1; }
    100% { opacity: 0.7; }
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

  /* Enhanced floor glow with realistic light spread */
  .floor-glow {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 220px;
    background: radial-gradient(ellipse 60% 70% at 55% 100%, 
      rgba(255, 220, 80, 0.08) 0%, 
      rgba(200, 140, 40, 0.12) 20%, 
      rgba(200, 140, 40, 0.06) 50%,
      transparent 85%);
    pointer-events: none;
    opacity: 0;
    animation: floorPulse 4s ease-in-out 0.9s infinite;
  }
  @keyframes floorPulse {
    0%   { opacity: 0.8; }
    50%  { opacity: 1; }
    100% { opacity: 0.8; }
  }

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
    position: relative;
    margin: 40px 0;
  }
  
  /* Decorative corner brackets */
  .section-divider::before,
  .section-divider::after {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    border: 2px solid var(--brown-border);
  }
  .section-divider::before {
    left: 40px;
    top: -25px;
    border-right: none;
    border-bottom: none;
  }
  .section-divider::after {
    right: 40px;
    top: -25px;
    border-left: none;
    border-bottom: none;
  }
  
  .div-line { 
    flex: 1; 
    height: 2px; 
    background: linear-gradient(90deg, transparent, var(--brown-border) 20%, var(--brown-border) 80%, transparent);
  }
  .div-dot  { 
    width: 8px; 
    height: 8px; 
    border-radius: 50%; 
    background: var(--accent);
    box-shadow: 0 0 8px rgba(196, 96, 58, 0.4);
  }

  /* ══ ABOUT ══ */
  .about {
    background: var(--cream-dark);
    padding: 96px 80px;
    position: relative; overflow: hidden;
    border-top: 3px solid var(--brown-border);
    border-bottom: 3px solid var(--brown-border);
    box-shadow: 
      inset 0 3px 12px rgba(139, 115, 85, 0.15),
      inset 0 -3px 12px rgba(139, 115, 85, 0.15);
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
    background: var(--cream); 
    border: 1px solid var(--border); 
    border-radius: 12px;
    text-align: center; 
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(139, 115, 85, 0.08);
  }
  .stat-card:hover { 
    transform: translateY(-4px); 
    box-shadow: 0 8px 28px rgba(44,35,24,0.08), 0 0 0 1px var(--brown-border) inset; 
  }
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 34px; font-weight: 700; color: var(--accent); line-height: 1; margin-bottom: 5px;
  }
  .stat-label { font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-muted); }

  .about-features { display: flex; flex-direction: column; gap: 18px; }
  .feature-card {
    padding: 26px 28px;
    background: var(--cream); 
    border: 1px solid var(--border); 
    border-radius: 14px;
    display: flex; gap: 18px; align-items: flex-start;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    box-shadow: 0 2px 8px rgba(139, 115, 85, 0.08);
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

  /* ══ STUDY ROOM SCENE ══ */
  .study-room-wrapper {
    width: 100%;
    min-height: 100vh;
    display: block;
    background: #D6C8B6;
    position: relative;
    overflow: hidden;
    border-top: 3px solid var(--brown-border);
    border-bottom: 3px solid var(--brown-border);
    box-shadow: 
      inset 0 3px 12px rgba(139, 115, 85, 0.2),
      inset 0 -3px 12px rgba(139, 115, 85, 0.2);
  }

  .scene-container {
    position: relative;
    width: 100%;
    max-width: none;
    height: 100vh;
    min-height: 100vh;
  }

  .flashlight-overlay {
    position: absolute; inset: 0;
    pointer-events: none; z-index: 50;
    border-radius: 14px;
    transition: background 0.12s ease;
  }

  /* SMOKE */
  @keyframes smokeRise1 {
    0%   { transform: translateY(0) translateX(0) scaleX(1); opacity: 0.65; }
    35%  { transform: translateY(-20px) translateX(4px) scaleX(1.4); opacity: 0.38; }
    70%  { transform: translateY(-42px) translateX(-2px) scaleX(1.7); opacity: 0.18; }
    100% { transform: translateY(-60px) translateX(5px) scaleX(0.9); opacity: 0; }
  }
  @keyframes smokeRise2 {
    0%   { transform: translateY(0) translateX(0) scaleX(1); opacity: 0.55; }
    35%  { transform: translateY(-22px) translateX(-5px) scaleX(1.5); opacity: 0.3; }
    70%  { transform: translateY(-44px) translateX(3px) scaleX(1.8); opacity: 0.15; }
    100% { transform: translateY(-65px) translateX(-4px) scaleX(1.0); opacity: 0; }
  }
  @keyframes smokeRise3 {
    0%   { transform: translateY(0) translateX(0) scaleX(1); opacity: 0.45; }
    40%  { transform: translateY(-28px) translateX(6px) scaleX(1.6); opacity: 0.22; }
    100% { transform: translateY(-70px) translateX(-2px) scaleX(1.1); opacity: 0; }
  }
  .smoke-1 { animation: smokeRise1 3.2s ease-out infinite; }
  .smoke-2 { animation: smokeRise2 3.2s ease-out infinite 1.1s; }
  .smoke-3 { animation: smokeRise3 3.2s ease-out infinite 2.1s; }

  @keyframes lampPulse  { 0%,100%{opacity:0.88} 50%{opacity:1.0} }
  @keyframes lampPulse2 { 0%,100%{opacity:0.25} 50%{opacity:0.40} }
  .lamp-glow-inner { animation: lampPulse  3.5s ease-in-out infinite; }
  .lamp-glow-outer { animation: lampPulse2 3.5s ease-in-out infinite 0.7s; }

  @keyframes curtainL { 0%,100%{transform:skewX(0deg)} 35%{transform:skewX(2.5deg)} 65%{transform:skewX(-1.8deg)} }
  @keyframes curtainR { 0%,100%{transform:skewX(0deg)} 35%{transform:skewX(-2.5deg)} 65%{transform:skewX(1.8deg)} }
  .curtain-left  { animation: curtainL 3.8s ease-in-out infinite; transform-origin: top center; }
  .curtain-right { animation: curtainR 3.8s ease-in-out infinite 0.5s; transform-origin: top center; }

  .scene-tagline {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: rgb(26, 23, 20);
    padding: 20px 0;
    text-align: center;
    pointer-events: none;
    z-index: 60;
  }

  .scene-tagline h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(13px, 1.9vw, 21px);
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    text-shadow: none;
    margin: 0;
  }

   /* ══ GLOBAL FOOTER (REAL PAGE FOOTER) ══ */
  .site-footer {
    width: 100%;
    background-color: rgb(26, 23, 20);
    padding: 32px 0;
    text-align: center;
    border-top: 3px solid var(--brown-border);
    position: relative;
    box-shadow: inset 0 3px 12px rgba(139, 115, 85, 0.25);
  }

  .site-footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--accent) 50%, transparent);
  }

  .site-footer h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(13px, 1.9vw, 21px);
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    margin: 0;
  }


  @media (max-width: 768px) {
    body::before {
      border-width: 4px;
    }
    body::after {
      top: 8px;
      left: 8px;
      right: 8px;
      bottom: 8px;
    }
    .fill { width: 90vw; padding-left: 20px; margin-top: -40px; }
    .hero-heading { font-size: 48px; }
    .lamp { width: 160px; transform: translateY(-100px); margin-top: -40px; }
    .about { padding: 56px 24px; }
    .about-inner { grid-template-columns: 1fr; gap: 44px; }
    .section-divider { padding: 0 24px; margin: 20px 0; }
    .section-divider::before,
    .section-divider::after { 
      width: 30px;
      height: 30px;
      left: 10px;
    }
    .section-divider::after {
      right: 10px;
      left: auto;
    }
    .scene-container { height: 60vh; min-height: 400px; }
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
  const sceneRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.22, y: 0.58 });
  const [isHovering, setIsHovering] = useState(false);

  const c1 = useCounter(1200, 1600, statsVisible);
  const c2 = useCounter(350, 1600, statsVisible);
  const c3 = useCounter(48, 1600, statsVisible);

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

  useEffect(() => {
  const el = sceneRef.current;
  if (!el) return;

  const onMove = (e) => {
    const rect = el.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const onEnter = () => setIsHovering(true);
  const onLeave = () => setIsHovering(false);

  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseenter", onEnter);
  el.addEventListener("mouseleave", onLeave);

  return () => {
    el.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseenter", onEnter);
    el.removeEventListener("mouseleave", onLeave);
  };
}, []);


  const fx = mousePos.x * 100;
  const fy = mousePos.y * 100;

  return (
    <>
      <style>{styles}</style>

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="logo-wrap">
          <div className="logo-icon">
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

        <div className="hero-wrapper">
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

          <div className="lamp">
            <div className="bulb"></div>
            <div className="stand"></div>
            <div className="base"></div>
          </div>
        </div>

        <div className="floor-glow" />

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

      {/* ══ DIVIDER ══ */}
      <div className="section-divider">
        <div className="div-line"/><div className="div-dot"/><div className="div-line"/>
      </div>

      {/* ══ STUDY ROOM INTERACTIVE SCENE ══ */}
      <section className="study-room-wrapper">
        <div className="scene-container" ref={sceneRef}>
          <div className="flashlight-overlay" style={{
            background: isHovering
              ? `radial-gradient(circle 280px at ${fx}% ${fy}%, 
                  rgba(255, 230, 150, 0.15) 0%, 
                  rgba(255, 200, 100, 0.08) 12%, 
                  rgba(214, 200, 182, 0.35) 25%, 
                  rgba(214, 200, 182, 0.75) 45%, 
                  rgba(214, 200, 182, 0.88) 65%, 
                  rgba(214, 200, 182, 0.95) 100%)`
              : `rgba(214, 200, 182, 0.95)`,
          }} />

          <svg viewBox="0 0 960 660" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wg" patternUnits="userSpaceOnUse" width="48" height="300">
                <rect width="48" height="300" fill="#C4A882" />
                <line x1="6" y1="0" x2="4" y2="300" stroke="#A87E60" strokeWidth="1.8" opacity="0.35" />
                <line x1="16" y1="0" x2="18" y2="300" stroke="#B89068" strokeWidth="1.0" opacity="0.28" />
                <line x1="28" y1="0" x2="26" y2="300" stroke="#A87E60" strokeWidth="1.4" opacity="0.30" />
                <line x1="40" y1="0" x2="42" y2="300" stroke="#B89068" strokeWidth="0.7" opacity="0.22" />
              </pattern>
              <pattern id="cw" patternUnits="userSpaceOnUse" width="28" height="200">
                <rect width="28" height="200" fill="#9A7450" />
                <line x1="4" y1="0" x2="3" y2="200" stroke="#7A5430" strokeWidth="1.2" opacity="0.3" />
                <line x1="14" y1="0" x2="15" y2="200" stroke="#8A6440" strokeWidth="0.8" opacity="0.25" />
                <line x1="23" y1="0" x2="22" y2="200" stroke="#7A5430" strokeWidth="1.0" opacity="0.28" />
              </pattern>
              <pattern id="wt" patternUnits="userSpaceOnUse" width="80" height="80">
                <rect width="80" height="80" fill="#D8D0C0" />
                <rect x="0" y="0" width="80" height="1" fill="#C8C0B0" opacity="0.22" />
                <rect x="0" y="27" width="80" height="1" fill="#C8C0B0" opacity="0.16" />
                <rect x="0" y="54" width="80" height="1" fill="#C8C0B0" opacity="0.13" />
              </pattern>
              <radialGradient id="lg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFE890" stopOpacity="1" />
                <stop offset="40%" stopColor="#FFD060" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#FFA020" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ts" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D8BC92" />
                <stop offset="100%" stopColor="#A87A50" />
              </linearGradient>
              <linearGradient id="mg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5A3828" />
                <stop offset="45%" stopColor="#7A5240" />
                <stop offset="100%" stopColor="#4A2818" />
              </linearGradient>
              <linearGradient id="bk1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E1618" /><stop offset="100%" stopColor="#2E2428" />
              </linearGradient>
              <linearGradient id="bk2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#161822" /><stop offset="100%" stopColor="#242838" />
              </linearGradient>
              <linearGradient id="bk3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#20180C" /><stop offset="100%" stopColor="#302418" />
              </linearGradient>
              <radialGradient id="soil" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#503820" /><stop offset="100%" stopColor="#301808" />
              </radialGradient>
              <radialGradient id="wallwarm" cx="20%" cy="68%" r="40%">
                <stop offset="0%" stopColor="#FFD870" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#FFD870" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#A0C8E8" /><stop offset="100%" stopColor="#C8DFF0" />
              </linearGradient>
              <filter id="sb"><feGaussianBlur stdDeviation="2.8" /></filter>
              <filter id="sd" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="2" dy="5" stdDeviation="7" floodColor="#100800" floodOpacity="0.45" />
              </filter>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* BACK WALL */}
            <rect x="0" y="0" width="770" height="460" fill="url(#wt)" />
            <rect x="0" y="0" width="770" height="460" fill="url(#wallwarm)" />
            <rect x="0" y="230" width="770" height="5" fill="#C0B8A8" opacity="0.3" />

            {/* RIGHT WALL */}
            <polygon points="770,0 960,0 960,660 770,460" fill="#D0C8B8" />
            <polygon points="770,0 960,0 960,660 770,460" fill="#C0B8A8" opacity="0.4" />

            {/* FLOOR */}
            <rect x="0" y="460" width="770" height="200" fill="#B0A090" />
            <polygon points="770,460 960,660 960,660 770,660" fill="#A09080" />
            {[480, 510, 548, 590, 635, 680].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="770" y2={y} stroke="#988870" strokeWidth={i % 2 === 0 ? 1.2 : 0.6} opacity="0.3" />
            ))}
            <ellipse cx="408" cy="476" rx="295" ry="16" fill="#100800" opacity="0.20" />

            {/* TABLE SURFACE */}
            <rect x="60" y="388" width="710" height="72" fill="url(#wg)" rx="4" />
            <rect x="60" y="388" width="710" height="72" fill="url(#ts)" opacity="0.52" rx="4" />
            <rect x="60" y="388" width="710" height="5" fill="#E8D0A8" opacity="0.50" rx="2" />
            <rect x="60" y="458" width="710" height="28" fill="#8A6438" rx="2" />
            <rect x="60" y="458" width="710" height="7" fill="#5A3C18" opacity="0.55" rx="1" />
            <rect x="82" y="462" width="20" height="115" fill="#7A5428" rx="4" />
            <rect x="720" y="462" width="20" height="115" fill="#7A5428" rx="4" />
            <rect x="84" y="462" width="4" height="115" fill="#C4A060" opacity="0.28" rx="2" />
            <rect x="722" y="462" width="4" height="115" fill="#C4A060" opacity="0.28" rx="2" />
            <polygon points="770,388 960,314 960,364 770,458" fill="#C4A882" />
            <polygon points="770,388 960,314 960,320 770,394" fill="#E0C8A0" opacity="0.40" />

            {/* WINDOW */}
            <polygon points="802,44 922,24 922,282 802,308" fill="url(#sky)" opacity="0.92" />
            <polygon points="797,38 927,17 927,287 797,313" fill="none" stroke="#B09880" strokeWidth="8" />
            <line x1="860" y1="25" x2="860" y2="284" stroke="#B09880" strokeWidth="4.5" opacity="0.7" />
            <line x1="799" y1="172" x2="925" y2="154" stroke="#B09880" strokeWidth="4.5" opacity="0.7" />
            <polygon points="802,308 922,282 926,298 798,324" fill="#C4A888" />
            <polygon points="802,308 922,282 960,430 770,460" fill="#EEE4D0" opacity="0.08" />

            {/* CURTAINS */}
            <g className="curtain-left">
              <path d="M795,17 C784,46 801,80 786,115 C772,148 789,182 777,215 C765,247 781,278 769,309 L796,316 C808,285 792,254 804,221 C816,188 800,154 812,120 C824,86 808,52 820,19Z" fill="#C8B498" />
              <path d="M795,17 C784,46 801,80 786,115 C772,148 789,182 777,215 C765,247 781,278 769,309 L754,312 C766,281 750,250 762,217 C774,184 758,150 770,116 C782,82 766,48 778,20Z" fill="#B8A488" opacity="0.9" />
              <path d="M780,17 C770,50 784,84 772,118 C760,151 774,184 762,218" stroke="#A09078" strokeWidth="1.8" fill="none" opacity="0.45" />
            </g>
            <g className="curtain-right">
              <path d="M923,17 C934,46 918,80 932,115 C945,148 929,182 941,215 C953,247 937,278 949,309 L922,316 C910,285 926,254 914,221 C902,188 917,154 905,120 C893,86 907,52 895,19Z" fill="#C8B498" />
              <path d="M923,17 C934,46 918,80 932,115 C945,148 929,182 941,215 C953,247 937,278 949,309 L964,312 C952,281 968,250 956,217 C944,184 959,150 947,116 C935,82 949,48 937,20Z" fill="#B8A488" opacity="0.9" />
              <path d="M937,17 C947,50 933,84 945,118 C957,151 943,184 954,218" stroke="#A09078" strokeWidth="1.8" fill="none" opacity="0.45" />
            </g>
            <line x1="752" y1="17" x2="968" y2="17" stroke="#A08860" strokeWidth="7" strokeLinecap="round" />
            <circle cx="752" cy="17" r="8" fill="#907850" />
            <circle cx="968" cy="17" r="8" fill="#907850" />

            {/* PLANT 1 - Monstera */}
            <g filter="url(#sd)">
              <path d="M594,374 C590,398 598,414 607,419 C615,424 638,424 646,419 C655,414 663,398 659,374Z" fill="#B86040" />
              <path d="M594,374 C590,398 598,414 607,419 C615,424 638,424 646,419 C655,414 663,398 659,374Z" fill="#CC7050" opacity="0.5" />
              <ellipse cx="626" cy="374" rx="34" ry="10" fill="#CC7050" />
              <ellipse cx="626" cy="374" rx="29" ry="8" fill="url(#soil)" />
              <ellipse cx="618" cy="373" rx="8" ry="3" fill="#3A2010" opacity="0.55" />
              <path d="M599,383 C597,398 602,412 607,418" stroke="#D88060" strokeWidth="2.5" fill="none" opacity="0.45" />
              <path d="M626,372 C625,358 624,345 626,330" stroke="#5A7A50" strokeWidth="3" fill="none" />
              <g>
                <path d="M626,368 C616,342 597,320 584,298 C576,286 574,272 587,268 C596,266 605,276 612,290 C621,308 626,340 626,368Z" fill="#4A7A55" />
                <path d="M626,368 C616,342 597,320 584,298 C576,286 574,272 587,268 C596,266 605,276 612,290 C621,308 626,340 626,368Z" fill="#5A8A65" opacity="0.55" />
                <ellipse cx="596" cy="310" rx="5" ry="8" fill="#4A7A55" transform="rotate(-30 596 310)" />
                <ellipse cx="606" cy="286" rx="4" ry="6" fill="#4A7A55" transform="rotate(-20 606 286)" />
                <path d="M626,366 C619,348 607,326 594,302" stroke="#365A40" strokeWidth="1.5" fill="none" opacity="0.7" />
                <path d="M610,330 C604,322 598,316" stroke="#365A40" strokeWidth="0.8" fill="none" opacity="0.5" />
                <path d="M618,350 C610,340 602,332" stroke="#365A40" strokeWidth="0.8" fill="none" opacity="0.5" />
              </g>
              <g>
                <path d="M626,368 C638,340 658,315 672,290 C680,277 683,262 671,258 C662,256 651,267 645,280 C637,298 633,335 626,368Z" fill="#3E6A48" />
                <path d="M626,368 C638,340 658,315 672,290 C680,277 683,262 671,258 C662,256 651,267 645,280 C637,298 633,335 626,368Z" fill="#4E7A58" opacity="0.5" />
                <ellipse cx="660" cy="302" rx="5" ry="8" fill="#3E6A48" transform="rotate(25 660 302)" />
                <ellipse cx="670" cy="276" rx="4" ry="6" fill="#3E6A48" transform="rotate(18 670 276)" />
                <path d="M626,366 C634,346 648,318 664,292" stroke="#2A5035" strokeWidth="1.5" fill="none" opacity="0.7" />
                <path d="M644,316 C652,306 660,298" stroke="#2A5035" strokeWidth="0.8" fill="none" opacity="0.5" />
              </g>
              <g>
                <path d="M626,368 C622,354 619,336 623,320 C625,313 631,310 635,316 C639,325 636,346 626,368Z" fill="#6A9A70" />
                <line x1="626" y1="366" x2="629" y2="323" stroke="#4A7A50" strokeWidth="1.2" opacity="0.7" />
              </g>
            </g>

            {/* PLANT 2 - Snake Plant */}
            <g filter="url(#sd)">
              <path d="M690,380 C686,400 692,415 700,420 C706,425 724,425 730,420 C737,415 743,400 739,380Z" fill="#C0A888" />
              <path d="M690,380 C686,400 692,415 700,420 C706,425 724,425 730,420 C737,415 743,400 739,380Z" fill="#D0B898" opacity="0.4" />
              <ellipse cx="714" cy="380" rx="26" ry="8" fill="#D0B898" />
              <ellipse cx="714" cy="380" rx="22" ry="6" fill="url(#soil)" />
              <ellipse cx="708" cy="379" rx="7" ry="2.5" fill="#301808" opacity="0.5" />
              <path d="M694,388 C692,400 695,413 700,419" stroke="#D8C0A0" strokeWidth="2.5" fill="none" opacity="0.38" />
              <g>
                <path d="M706,378 C703,360 701,336 703,308 C704,296 709,287 714,288 C719,289 721,298 720,310 C718,337 714,360 711,378Z" fill="#4A7A52" />
                <path d="M707,370 C705,352 704,330 706,308" stroke="#6A9A72" strokeWidth="2.5" fill="none" opacity="0.45" />
                <path d="M711,378 C710,360 710,336 710,308" stroke="#2A5A32" strokeWidth="0.8" fill="none" opacity="0.6" />
                <path d="M715,377 C715,358 714,334 713,308" stroke="#6A9A72" strokeWidth="1.5" fill="none" opacity="0.35" />
              </g>
              <g>
                <path d="M718,378 C721,358 724,334 722,306 C721,294 716,285 711,286 C706,287 704,296 706,308 C708,336 713,360 716,378Z" fill="#3A6A42" opacity="0.88" />
                <path d="M719,372 C721,352 723,328 720,305" stroke="#5A8A62" strokeWidth="1.8" fill="none" opacity="0.4" />
                <path d="M722,368 C724,348 725,324 722,302" stroke="#7AAA82" strokeWidth="1.2" fill="none" opacity="0.35" />
              </g>
              <g>
                <path d="M712,378 C709,366 707,348 710,332 C712,325 717,322 720,327 C723,333 721,352 718,370 C716,376 714,378 712,378Z" fill="#5A8A62" />
                <path d="M713,376 C711,363 710,347 712,333" stroke="#3A6A42" strokeWidth="0.8" fill="none" opacity="0.6" />
              </g>
            </g>

            {/* COFFEE MUG */}
            <g filter="url(#sd)">
              <ellipse cx="560" cy="396" rx="22" ry="6.5" fill="#100800" opacity="0.28" />
              <path d="M540,363 C538,367 538,388 540,393 C542,397 557,400 568,398 C580,395 584,389 582,386 C580,368 578,360 560,358 C548,358 542,360 540,363Z" fill="url(#mg)" />
              <ellipse cx="561" cy="361" rx="21" ry="5.5" fill="#6A4838" />
              <ellipse cx="561" cy="361" rx="17" ry="3.8" fill="#3A2018" />
              <ellipse cx="561" cy="362" rx="16" ry="3.5" fill="#1E1008" />
              <ellipse cx="556" cy="361" rx="7" ry="2" fill="#2A1810" opacity="0.6" />
              <path d="M582,372 C598,370 600,390 582,390" fill="none" stroke="#5A3828" strokeWidth="8" strokeLinecap="round" />
              <path d="M582,372 C596,371 598,388 582,390" fill="none" stroke="#8A6050" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
              <path d="M547,366 C545,374 546,386 548,392" stroke="#9A7060" strokeWidth="2.5" fill="none" opacity="0.45" />
              <ellipse cx="554" cy="368" rx="3" ry="6" fill="#9A7060" opacity="0.15" />
            </g>
            <g filter="url(#sb)" opacity="0.6">
              <ellipse className="smoke-1" cx="556" cy="358" rx="4.5" ry="7.5" fill="#B8B0A8" />
              <ellipse className="smoke-2" cx="563" cy="355" rx="3.8" ry="6.5" fill="#A8A098" />
              <ellipse className="smoke-3" cx="559" cy="352" rx="5.5" ry="8.5" fill="#B0A8A0" />
            </g>

            {/* LAMP GLOW */}
            <circle className="lamp-glow-outer" cx="180" cy="308" r="120" fill="url(#lg)" opacity="0.25" />
            <circle className="lamp-glow-inner" cx="180" cy="308" r="70" fill="url(#lg)" opacity="0.88" filter="url(#glow)" />
            <polygon points="145,308 218,308 240,395 122,395" fill="#FFE880" opacity="0.09" />
            <path d="M134,270 L228,270 L215,312 L148,312Z" fill="#C8A830" />
            <path d="M134,270 L228,270 L215,312 L148,312Z" fill="#ECC840" opacity="0.5" />
            <path d="M140,274 L222,274 L211,308 L152,308Z" fill="#1A1408" opacity="0.40" />
            <path d="M136,272 L192,270 L188,280 L140,282Z" fill="#FFF8A0" opacity="0.38" />
            <line x1="148" y1="312" x2="215" y2="312" stroke="#A08020" strokeWidth="3.5" />
            <ellipse cx="181" cy="273" rx="12" ry="9" fill="#FFF8C0" filter="url(#glow)" />
            <ellipse cx="181" cy="273" rx="7" ry="5" fill="#FFFDE8" />
            <path d="M179,312 C177,332 181,352 179,395" stroke="#C09050" strokeWidth="9" fill="none" strokeLinecap="round" />
            <path d="M179,312 C178,332 181,352 179,395" stroke="#E0B060" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.4" />
            <ellipse cx="179" cy="397" rx="36" ry="11" fill="#8A6030" />
            <ellipse cx="179" cy="395" rx="32" ry="9" fill="#C09848" />
            <ellipse cx="179" cy="393" rx="24" ry="6" fill="#D4AC58" />
            <ellipse cx="175" cy="392" rx="11" ry="3" fill="#E8C068" opacity="0.5" />

            {/* BOOKS STACKED */}
            <g filter="url(#sd)">
              <rect x="225" y="376" width="78" height="14" fill="url(#bk3)" rx="1.5" />
              <rect x="301" y="377" width="5" height="13" fill="#E0D8C8" opacity="0.75" />
              <rect x="225" y="376" width="78" height="3" fill="#402E18" opacity="0.5" rx="1" />
              <rect x="234" y="381" width="48" height="2" fill="#C8A030" opacity="0.70" rx="1" />
              <rect x="234" y="385" width="32" height="1.2" fill="#C8A030" opacity="0.40" rx="1" />
            </g>
            <g filter="url(#sd)">
              <rect x="229" y="364" width="74" height="13" fill="url(#bk2)" rx="1.5" />
              <rect x="301" y="365" width="5" height="12" fill="#E0D8C8" opacity="0.75" />
              <rect x="229" y="364" width="74" height="3" fill="#181C2A" opacity="0.5" rx="1" />
              <rect x="237" y="369" width="42" height="2" fill="#7088CC" opacity="0.60" rx="1" />
              <rect x="237" y="373" width="26" height="1.2" fill="#7088CC" opacity="0.35" rx="1" />
            </g>
            <g filter="url(#sd)">
              <rect x="227" y="353" width="76" height="12" fill="url(#bk1)" rx="1.5" />
              <rect x="301" y="354" width="5" height="11" fill="#E0D8C8" opacity="0.75" />
              <rect x="227" y="353" width="76" height="3" fill="#141010" opacity="0.5" rx="1" />
              <rect x="235" y="358" width="46" height="2" fill="#C8A840" opacity="0.65" rx="1" />
              <rect x="235" y="362" width="30" height="1.2" fill="#C8A840" opacity="0.35" rx="1" />
            </g>

            {/* OPEN BOOK */}
            <g transform="rotate(-3 365 388)" filter="url(#sd)">
              <path d="M312,342 C312,362 314,382 314,395 C324,392 336,391 344,392 C344,376 344,355 342,340 C334,338 322,338 312,342Z" fill="#EDE4D0" />
              <path d="M344,340 C346,356 346,376 346,392 C354,391 366,392 376,395 C376,382 374,362 370,342 C362,339 352,339 344,340Z" fill="#E8DDCA" />
              <line x1="344" y1="340" x2="344" y2="392" stroke="#C0AE90" strokeWidth="3" />
              {[352, 358, 364, 370, 376, 383, 389].map((y, i) => (
                <line key={i} x1="318" y1={y} x2="340" y2={y} stroke="#A89878" strokeWidth="0.9" opacity="0.45" />
              ))}
              {[352, 358, 364, 370, 376, 383, 389].map((y, i) => (
                <line key={i + 10} x1="348" y1={y} x2="370" y2={y} stroke="#A89878" strokeWidth="0.9" opacity="0.45" />
              ))}
              <circle cx="318" cy="352" r="1.2" fill="#A89878" opacity="0.5" />
              <circle cx="318" cy="364" r="1.2" fill="#A89878" opacity="0.5" />
              <path d="M310,342 C310,362 312,382 312,395 L314,395 C314,382 312,362 312,342Z" fill="#1E1618" opacity="0.85" />
              <path d="M376,395 L378,396 C378,382 376,362 372,342 L370,342 C374,362 376,382 376,395Z" fill="#161822" opacity="0.85" />
            </g>

            {/* WOODEN CHAIR */}
            <g filter="url(#sd)">
              <ellipse cx="450" cy="576" rx="72" ry="19" fill="#100800" opacity="0.32" />
              <rect x="396" y="467" width="15" height="106" fill="url(#cw)" rx="3" />
              <rect x="493" y="467" width="15" height="106" fill="url(#cw)" rx="3" />
              <rect x="397" y="467" width="3.5" height="106" fill="#D4A860" opacity="0.28" rx="2" />
              <rect x="402" y="488" width="15" height="98" fill="#9A7040" rx="3" transform="rotate(1.5 402 488)" />
              <rect x="487" y="488" width="15" height="98" fill="#9A7040" rx="3" transform="rotate(-1.5 499 488)" />
              <rect x="403" y="488" width="3.5" height="98" fill="#D4A860" opacity="0.25" rx="2" />
              <rect x="402" y="536" width="100" height="9" fill="#7A5430" rx="3" />
              <rect x="403" y="537" width="3" height="7" fill="#D4A860" opacity="0.25" rx="1" />
              <rect x="402" y="566" width="100" height="8" fill="#7A5430" rx="3" />
              <rect x="386" y="462" width="132" height="28" fill="url(#cw)" rx="6" />
              <rect x="386" y="462" width="132" height="28" fill="#A87848" opacity="0.38" rx="6" />
              <rect x="390" y="464" width="124" height="6" fill="#D4A860" opacity="0.35" rx="3" />
              <rect x="386" y="486" width="132" height="7" fill="#5A3818" rx="3" />
              {[393, 412, 430, 449, 468, 487].map((x, i) => (
                <rect key={i} x={x} y={i === 0 || i === 5 ? 372 : i === 1 || i === 4 ? 362 : 356} width="13"
                  height={i === 0 || i === 5 ? 93 : i === 1 || i === 4 ? 103 : 109}
                  fill={i % 2 === 0 ? "url(#cw)" : "#9A7040"} rx="3" />
              ))}
              {[394, 413, 431, 450, 469, 488].map((x, i) => (
                <rect key={i + 20} x={x} y={i === 0 || i === 5 ? 374 : i === 1 || i === 4 ? 364 : 358} width="2.5"
                  height={i === 0 || i === 5 ? 91 : i === 1 || i === 4 ? 101 : 107}
                  fill="#D4A860" opacity="0.22" rx="1" />
              ))}
              <rect x="387" y="352" width="130" height="20" fill="url(#cw)" rx="6" />
              <rect x="387" y="352" width="130" height="20" fill="#A87848" opacity="0.32" rx="6" />
              <rect x="391" y="354" width="122" height="6" fill="#D4A860" opacity="0.38" rx="3" />
              <rect x="387" y="368" width="130" height="5" fill="#5A3818" opacity="0.4" rx="3" />
            </g>

            {/* AMBIENT SHADOWS */}
            <polygon points="750,0 770,0 770,460 748,460" fill="#0A0600" opacity="0.22" />
            <rect x="0" y="0" width="55" height="660" fill="#0A0600" opacity="0.12" />
            <rect x="0" y="448" width="770" height="20" fill="#0A0600" opacity="0.15" />
            <polygon points="0,390 145,390 108,462 0,462" fill="#0A0600" opacity="0.10" />
            <ellipse cx="450" cy="500" rx="68" ry="12" fill="#0A0600" opacity="0.10" />
          </svg>
        </div>
      </section>


      {/* ══ GLOBAL FOOTER (BOTTOM OF PAGE) ══ */}
      <footer className="site-footer">
        <h2>Collaborate &nbsp;·&nbsp; Innovate &nbsp;·&nbsp; Accelerate</h2>
      </footer>

    </>
  );
}
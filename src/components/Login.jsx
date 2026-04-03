import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
  --cream: #FBF8F3;
  --warm-white: #FFFFFF;

  --ink: #6B5644;          /* Dark coffee */
  --ink-soft: #60472d;     /* Medium coffee */
  --ink-muted: #B8A999;    /* Soft beige brown */

  --accent: #A67C52;       /* Coffee accent (darker and more visible) */
  --accent-hover: #563212; /* Darker coffee */
  --accent-light: #F1E8DF; /* Light beige highlight */

  --border: #E6DDD3;

  --shadow-soft: 0 2px 20px rgba(107, 86, 68, 0.08);
  --shadow-card: 0 8px 48px rgba(107, 86, 68, 0.12);
}


  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    min-height: 100vh;
  }

  .login-wrapper {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
  }

  .left-panel {
    background: var(--ink);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 56px 64px;
    position: relative;
    overflow: hidden;
  }

  .left-panel::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 320px; height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(196,96,58,0.20) 0%, transparent 70%);
    pointer-events: none;
  }
  .left-panel::after {
    content: '';
    position: absolute;
    bottom: -60px; left: -40px;
    width: 240px; height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(196,96,58,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .brand-mark {
    display: flex; align-items: center; gap: 12px;
  }
  .brand-icon {
    width: 36px; height: 36px;
    border: 2px solid var(--accent);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }
  .brand-icon svg { width: 18px; height: 18px; }
  .brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: #FAF8F5;
    letter-spacing: 0.02em;
  }

  .left-content { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 40px 0; }

  .left-tagline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 3.5vw, 48px);
    color: #FAF8F5;
    line-height: 1.2;
    font-weight: 400;
    margin-bottom: 24px;
  }
  .left-tagline em { color: var(--accent); font-style: italic; }

  .left-desc {
    font-size: 15px;
    color: rgba(250,248,245,0.55);
    line-height: 1.7;
    max-width: 340px;
    font-weight: 300;
  }

  .left-divider {
    width: 48px; height: 2px;
    background: var(--accent);
    margin: 32px 0;
    border-radius: 2px;
  }

  .left-footer {
    font-size: 12px;
    color: rgba(250,248,245,0.3);
    letter-spacing: 0.04em;
  }

  .right-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
    background: var(--cream);
  }

  .form-card {
    width: 100%;
    max-width: 400px;
    background: var(--warm-white);
    border-radius: 20px;
    padding: 36px 40px;
    box-shadow: var(--shadow-card);
    border: 1px solid var(--border);
    animation: slideUp 0.5s ease both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .form-header { margin-bottom: 26px; }
  .form-heading {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: var(--ink);
    font-weight: 600;
    margin-bottom: 8px;
  }
  .form-sub {
    font-size: 14px;
    color: var(--ink-muted);
    font-weight: 300;
  }
  .form-sub a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }
  .form-sub a:hover { color: var(--accent-hover); }

  .field-group { margin-bottom: 20px; }
  .field-label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: var(--ink-soft);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .field-wrap { position: relative; }
  .field-input {
    width: 100%;
    padding: 13px 44px 13px 16px;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    color: var(--ink);
    background: var(--cream);
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    outline: none;
  }
  .field-input::placeholder { color: var(--ink-muted); }
  .field-input:focus {
    border-color: var(--accent);
    background: #FFFFFF;
    box-shadow: 0 0 0 3px rgba(196,96,58,0.10);
  }
  .field-icon {
    position: absolute;
    right: 14px; top: 50%;
    transform: translateY(-50%);
    color: var(--ink-muted);
    cursor: pointer;
    transition: color 0.2s;
    display: flex; align-items: center;
  }
  .field-icon:hover { color: var(--accent); }

  .options-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 4px 0 28px;
  }
  .checkbox-label {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; color: var(--ink-soft); cursor: pointer;
    user-select: none;
  }
  .checkbox-label input[type="checkbox"] { display: none; }
  .checkbox-custom {
    width: 16px; height: 16px;
    border: 1.5px solid var(--border);
    border-radius: 4px;
    background: var(--cream);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  .checkbox-custom.checked {
    background: var(--accent);
    border-color: var(--accent);
  }
  .forgot-link {
    font-size: 13px;
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }
  .forgot-link:hover { color: var(--accent-hover); }

  .btn-primary {
    width: 100%;
    padding: 14px;
    background: var(--ink);
    color: #FAF8F5;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn-primary:hover {
    background: #2C2825;
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(26,23,20,0.18);
  }
  .btn-primary:active { transform: translateY(0); }
  .btn-primary.loading { pointer-events: none; opacity: 0.75; }

  .or-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 24px 0;
  }
  .or-line { flex: 1; height: 1px; background: var(--border); }
  .or-text { font-size: 12px; color: var(--ink-muted); font-weight: 500; letter-spacing: 0.04em; }

  .social-row { display: flex; gap: 12px; }
  .btn-social {
    flex: 1;
    padding: 11px 16px;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    background: var(--warm-white);
    color: var(--ink-soft);
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: border-color 0.2s, background 0.2s, transform 0.15s;
  }
  .btn-social:hover {
    border-color: var(--accent);
    background: var(--accent-light);
    color: var(--accent);
    transform: translateY(-1px);
  }

  .alert {
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 13px;
    margin-bottom: 20px;
    display: flex; align-items: center; gap: 10px;
  }
  .alert-error { background: #FEF0ED; color: #C4603A; border: 1px solid #F5CBBF; }
  .alert-success { background: #EEF7F0; color: #2D7A47; border: 1px solid #B8E0C4; }

  @media (max-width: 768px) {
    .login-wrapper { grid-template-columns: 1fr; }
    .left-panel { display: none; }
    .right-panel { padding: 32px 20px; }
    .form-card { padding: 36px 28px; }
  }
`;

export default function Login({ onLoginSuccess, onSignupSuccess, onGoToSignup, onGoToLogin, isSignup = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [role, setRole] = useState('student');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup && !name) {
      setStatus({ type: "error", msg: "Please enter your name." });
      return;
    }
    if (!email || !password) {
      setStatus({ type: "error", msg: "Please fill in all required fields." });
      return;
    }
    
    setStatus(null);
    setLoading(true);

    try {
      if (isSignup) {
        if (onSignupSuccess) await onSignupSuccess(name, email, password, role);
        setStatus({ type: "success", msg: "Account created! Redirecting..." });
      } else {
        if (onLoginSuccess) await onLoginSuccess(email, password, role);
        setStatus({ type: "success", msg: "Welcome back! Redirecting..." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: err.message || "An error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-wrapper">

        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="brand-mark">
            <div className="brand-icon">
              <svg viewBox="0 0 18 18" fill="none" stroke="#C4603A" strokeWidth="2" strokeLinecap="round">
                <path d="M9 2L3 6v6l6 4 6-4V6L9 2z" />
              </svg>
            </div>
            <span className="brand-name">VNexus</span>
          </div>

          <div className="left-content">
            <h2 className="left-tagline">
              Where ideas<br />meet <em>collaboration.</em>
            </h2>
            <div className="left-divider" />
            <p className="left-desc">
              Collaborate to inspire, innovate to transform, and elevate to succeed.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="form-card">
            <div className="form-header">
              <h1 className="form-heading">{isSignup ? 'Join VNexus' : 'Welcome back'}</h1>
              <p className="form-sub">
                {isSignup ? (
                  <>Already have an account? {/* eslint-disable-next-line */} <a href="#" onClick={(e) => { e.preventDefault(); if (onGoToLogin) onGoToLogin(); }}>Sign in here</a></>
                ) : (
                  <>New here? {/* eslint-disable-next-line */} <a href="#" onClick={(e) => { e.preventDefault(); if (onGoToSignup) onGoToSignup(); }}>Create a free account</a></>
                )}
              </p>
            </div>

            {status && (
              <div className={`alert alert-${status.type}`}>
                {status.type === "error" ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 10a.75.75 0 110 1.5A.75.75 0 018 11zm.75-6.5v4a.75.75 0 01-1.5 0v-4a.75.75 0 011.5 0z"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.28 4.72a.75.75 0 010 1.06l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06L6.75 9.19l3.47-3.47a.75.75 0 011.06 0z"/>
                  </svg>
                )}
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="field-group">
                <label className="field-label">Full Name</label>
                <div className="field-wrap">
                  <input
                    className="field-input"
                    type="text"
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span className="field-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                    </svg>
                  </span>
                </div>
              </div>
            )}

            <div className="field-group">
              <label className="field-label">Email Address</label>
              <div className="field-wrap">
                <input
                  className="field-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="3" width="14" height="10" rx="2"/>
                    <path d="M1 5l7 5 7-5"/>
                  </svg>
                </span>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <input
                  className="field-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                  <span className="field-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/>
                        <circle cx="8" cy="8" r="2"/>
                        <line x1="2" y1="2" x2="14" y2="14"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/>
                        <circle cx="8" cy="8" r="2"/>
                      </svg>
                    )}
                  </span>
                </div>
              </div>

              <div className="options-row">
                <label className="checkbox-label">
  <input
    type="checkbox"
    checked={remember}
    onChange={(e) => setRemember(e.target.checked)}
  />

  <span className={`checkbox-custom ${remember ? "checked" : ""}`}>
    {remember && (
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        stroke="white"
        strokeWidth="2"
      >
        <path d="M1.5 5l2.5 2.5 4.5-4.5" />
      </svg>
    )}
  </span>

  Remember me
</label>

                {/* eslint-disable-next-line */}
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              {/* Role selector */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button type="button" onClick={() => setRole('student')}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '10px', border: '1.5px solid',
                    borderColor: role === 'student' ? 'var(--ink)' : 'var(--border)',
                    background: role === 'student' ? 'var(--ink)' : 'var(--cream)',
                    color: role === 'student' ? '#FAF8F5' : 'var(--ink-soft)',
                    fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500,
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}>Student</button>
                <button type="button" onClick={() => setRole('faculty')}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '10px', border: '1.5px solid',
                    borderColor: role === 'faculty' ? 'var(--ink)' : 'var(--border)',
                    background: role === 'faculty' ? 'var(--ink)' : 'var(--cream)',
                    color: role === 'faculty' ? '#FAF8F5' : 'var(--ink-soft)',
                    fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500,
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}>Faculty</button>
              </div>

              <button type="submit" className={`btn-primary ${loading ? "loading" : ""}`}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
}
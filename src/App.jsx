import { useState, useEffect, useCallback } from 'react'

// ─── Scroll Reveal Hook ──────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────
const icons = {
  Upload:      (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  FileText:    (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  GitMerge:    (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 009 9"/></svg>,
  Pound:       (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 7A4 4 0 0010 9v11"/><path d="M7 9h8"/><path d="M7 14h8"/></svg>,
  AlertTri:    (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  ShieldCheck: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  Clipboard:   (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="M9 12h6"/><path d="M9 16h4"/></svg>,
  BarChart:    (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  History:     (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/><polyline points="12 7 12 12 16 14"/></svg>,
  Building:    (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="18" height="13" rx="2"/><path d="M8 9V5a2 2 0 014 0v4"/><path d="M12 9V5"/></svg>,
  Database:    (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  Search:      (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Lightning:   (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  TrendUp:     (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Check:       (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Minus:       (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Plus:        (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  X:           (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Menu:        (s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  ChevDown:    (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  CheckCircle: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Star:        (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Lock:        (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  Mail:        (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Users:       (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
}

const Icon = ({ name, size = 20, className = '' }) => {
  const fn = icons[name]
  if (!fn) return null
  return <span className={`inline-flex items-center justify-center ${className}`}>{fn(size)}</span>
}

// ─── Logo ────────────────────────────────────────────────────────────────────
const Logo = ({ dark = false }) => (
  <div className="flex items-center gap-2.5">
    <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
      style={{ background: 'linear-gradient(135deg,#157a7f,#0f4e52)' }}>
      <span style={{ color: '#fff', fontWeight: 800, fontSize: 13, letterSpacing: '-0.02em' }}>RM</span>
    </div>
    <span style={{
      fontSize: 22, fontWeight: 700, letterSpacing: '-0.025em',
      color: dark ? '#0f172a' : '#ffffff',
    }}>
      Remit<span style={{ color: '#1a9ba1' }}>Match</span>
    </span>
  </div>
)

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ onPilot }) {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobile]   = useState(false)
  const [active, setActive]       = useState('home')

  const links = [
    { id: 'home',         label: 'Home' },
    { id: 'about',        label: 'About' },
    { id: 'platform',     label: 'Platform' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'market',       label: 'Market' },
    { id: 'pricing',      label: 'Pricing' },
    { id: 'faq',          label: 'FAQ' },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const ids = links.map(l => l.id)
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(ids[i]); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goto = (id) => {
    setMobile(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navBg = scrolled
    ? 'rgba(7,18,41,0.96)'
    : 'rgba(7,18,41,0.80)'

  return (
    <nav role="navigation" aria-label="Main navigation" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: navBg,
      backdropFilter: 'blur(14px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      transition: 'background 0.3s ease',
    }}>
      <div className="container" style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#home" onClick={e => { e.preventDefault(); goto('home') }}
          style={{ textDecoration: 'none' }} aria-label="RemitMatch home">
          <Logo />
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          className="hidden lg:flex">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`}
              onClick={e => { e.preventDefault(); goto(l.id) }}
              aria-current={active === l.id ? 'page' : undefined}
              style={{
                padding: '8px 13px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                color: active === l.id ? '#1a9ba1' : 'rgba(255,255,255,0.70)',
                borderBottom: active === l.id ? '2px solid #1a9ba1' : '2px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (active !== l.id) e.currentTarget.style.color = 'rgba(255,255,255,0.95)' }}
              onMouseLeave={e => { if (active !== l.id) e.currentTarget.style.color = 'rgba(255,255,255,0.70)' }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <button className="btn-primary hidden lg:inline-flex" onClick={onPilot}
          style={{ height: 42, padding: '0 20px', fontSize: 14 }}>
          Request a Pilot
        </button>

        {/* Hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setMobile(v => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
        >
          {mobileOpen ? <Icon name="X" size={22} /> : <Icon name="Menu" size={22} />}
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(7,18,41,0.98)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '12px 18px 20px',
        }}>
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`}
              onClick={e => { e.preventDefault(); goto(l.id) }}
              style={{
                display: 'block',
                padding: '13px 12px',
                fontSize: 15,
                fontWeight: 500,
                color: active === l.id ? '#1a9ba1' : 'rgba(255,255,255,0.78)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                minHeight: 48,
              }}>
              {l.label}
            </a>
          ))}
          <button className="btn-primary" onClick={() => { setMobile(false); onPilot() }}
            style={{ marginTop: 16, width: '100%' }}>
            Request a Pilot
          </button>
        </div>
      )}
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero({ onPilot }) {
  const rows = [
    { id: 'INV-2026-0847', comm: 'Local Authority A', exp: '£1,600', rec: '£0',     status: 'Flagged' },
    { id: 'INV-2026-0923', comm: 'Local Authority B', exp: '£180',   rec: '£150',   status: 'Flagged' },
    { id: 'INV-2026-0951', comm: 'NHS ICB',           exp: '£240',   rec: '£240',   status: 'Reconciled' },
    { id: 'INV-2026-0834', comm: 'Local Authority A', exp: '£420',   rec: '£380',   status: 'Under Review' },
    { id: 'INV-2026-0790', comm: 'NHS ICB',           exp: '£310',   rec: '£310',   status: 'Reconciled' },
  ]

  const chipStyle = {
    Reconciled:     { bg: 'rgba(16,185,129,0.15)',  color: '#10b981' },
    Flagged:        { bg: 'rgba(239,68,68,0.15)',   color: '#f87171' },
    'Under Review': { bg: 'rgba(245,158,11,0.15)',  color: '#fbbf24' },
    Resolved:       { bg: 'rgba(21,122,127,0.15)',  color: '#1a9ba1' },
  }

  return (
    <section id="home" style={{
      minHeight: 'calc(100vh - 0px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: 80,
      background: 'linear-gradient(135deg, #07142d 0%, #0b1f3b 55%, #0b3941 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(21,122,127,0.13) 0%, transparent 65%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-8%', width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(11,57,65,0.25) 0%, transparent 65%)', borderRadius: '50%' }} />
        {/* Subtle grid */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.025 }}>
          <defs>
            <pattern id="g" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 44 0 L 0 0 0 44" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', paddingTop: 56, paddingBottom: 72 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: 64,
          alignItems: 'center',
        }} className="hero-grid">

          {/* ── LEFT ── */}
          <div>
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 14px', borderRadius: 999,
              background: 'rgba(24,190,190,0.10)',
              border: '1px solid rgba(24,190,190,0.35)',
              marginBottom: 28,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#1a9ba1', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1a9ba1' }}>
                Built for UK Care Providers
              </span>
            </div>

            {/* Heading */}
            <h1 style={{
              fontSize: 'clamp(48px, 5vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              marginBottom: 24,
              maxWidth: 600,
            }}>
              Every Invoice<br />
              <span style={{ color: '#1a9ba1' }}>Matched.</span><br />
              Every Underpayment<br />
              <span style={{ color: '#1a9ba1' }}>Found.</span>
            </h1>

            {/* Description */}
            <p style={{
              fontSize: 17,
              lineHeight: 1.72,
              color: 'rgba(255,255,255,0.70)',
              maxWidth: 580,
              marginBottom: 32,
            }}>
              RemitMatch automates Local Authority and NHS remittance reconciliation for UK care providers — matching payments to invoices, validating commissioner rates, identifying discrepancies and creating evidence-ready disputes.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={onPilot}>Request a Pilot</button>
              <a href="#how-it-works" className="btn-ghost"
                onClick={e => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }) }}>
                See How It Works
              </a>
            </div>

            {/* Trust line */}
            <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ color: '#1a9ba1' }}><Icon name="CheckCircle" size={14} /></span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.48)' }}>
                Built for UK domiciliary care and support-service providers.
              </span>
            </div>
          </div>

          {/* ── RIGHT — Dashboard ── */}
          <div style={{ position: 'relative' }}>
            {/* Glow behind dashboard */}
            <div style={{
              position: 'absolute', inset: -40,
              background: 'radial-gradient(circle at 60% 45%, rgba(23,190,187,0.14), transparent 55%)',
              pointerEvents: 'none',
            }} />

            <div style={{
              position: 'relative',
              background: '#0d1829',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 18,
              boxShadow: '0 30px 80px rgba(0,0,0,0.38), 0 0 0 1px rgba(255,255,255,0.04)',
              overflow: 'hidden',
            }}>
              {/* Dashboard header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.03)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 5.5 }}>
                    {['#ef4444','#f59e0b','#10b981'].map(c => (
                      <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.75 }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
                    RemitMatch Dashboard
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {['Overview','Invoices','Disputes'].map((t, i) => (
                    <span key={t} style={{
                      padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                      background: i === 0 ? '#157a7f' : 'transparent',
                      color: i === 0 ? '#fff' : 'rgba(255,255,255,0.4)',
                      cursor: 'default',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ padding: 18 }}>
                {/* Metric cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
                  {[
                    { label: 'Outstanding', value: '£47,500', color: '#e2e8f0' },
                    { label: 'Open Disputes', value: '3', color: '#fbbf24' },
                    { label: 'Disputed Value', value: '£4,050', color: '#f87171' },
                    { label: 'Resolved', value: '£12,300', color: '#10b981' },
                  ].map(m => (
                    <div key={m.label} style={{
                      padding: '14px 12px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 12,
                    }}>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.42)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                        {m.label}
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: m.color, letterSpacing: '-0.02em' }}>
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reconciliation bar */}
                <div style={{
                  padding: '12px 14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12,
                  marginBottom: 14,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>Reconciliation Status</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1a9ba1' }}>98%</span>
                  </div>
                  <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '98%', background: 'linear-gradient(90deg,#157a7f,#10b981)', borderRadius: 999 }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>196 of 200 invoices matched</span>
                    <span style={{ fontSize: 10, color: '#f87171' }}>4 flagged</span>
                  </div>
                </div>

                {/* Table */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}>
                  <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>Recent Reconciliation</span>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                      <thead>
                        <tr>
                          {['Invoice','Commissioner','Expected','Received','Status'].map(h => (
                            <th key={h} style={{
                              padding: '8px 12px', textAlign: 'left',
                              color: 'rgba(255,255,255,0.35)', fontWeight: 600,
                              fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em',
                              borderBottom: '1px solid rgba(255,255,255,0.05)',
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r, i) => {
                          const cs = chipStyle[r.status] || { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8' }
                          return (
                            <tr key={r.id} style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                              <td style={{ padding: '9px 12px', color: 'rgba(255,255,255,0.70)', fontFamily: 'monospace', fontSize: 10 }}>{r.id}</td>
                              <td style={{ padding: '9px 12px', color: 'rgba(255,255,255,0.48)' }}>{r.comm}</td>
                              <td style={{ padding: '9px 12px', color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>{r.exp}</td>
                              <td style={{ padding: '9px 12px', fontWeight: 600, color: r.status === 'Reconciled' ? '#10b981' : r.status === 'Flagged' ? '#f87171' : '#fbbf24' }}>{r.rec}</td>
                              <td style={{ padding: '9px 12px' }}>
                                <span style={{ padding: '3px 8px', borderRadius: 999, fontSize: 10, fontWeight: 600, background: cs.bg, color: cs.color }}>{r.status}</span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive hero styles */}
      <style>{`
        @media (max-width: 1000px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @keyframes pulse {
          0%,100% { opacity: 1 }
          50% { opacity: 0.4 }
        }
      `}</style>
    </section>
  )
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
const SectionLabel = ({ text }) => (
  <div style={{ marginBottom: 14 }}>
    <span className="label-sm" style={{
      display: 'inline-block', padding: '5px 12px', borderRadius: 999,
      background: 'rgba(21,122,127,0.10)', color: '#0f766e', marginBottom: 0,
    }}>{text}</span>
  </div>
)

// ─── BENEFITS ────────────────────────────────────────────────────────────────
function Benefits() {
  const cards = [
    { icon: 'Lightning', title: 'Match Payments Faster',         text: 'Automatically reconcile bulk commissioner remittances against individual invoices.',                                                   iconBg: '#f0fafa', iconColor: '#0f766e' },
    { icon: 'Search',    title: 'Detect Underpayments',          text: 'Flag missing invoices, short payments and incorrect commissioner rates.',                                                              iconBg: '#fff5f5', iconColor: '#dc2626' },
    { icon: 'ShieldCheck',title: 'Build Better Evidence',        text: 'Turn reconciliation discrepancies into structured dispute evidence packs.',                                                            iconBg: '#fffbeb', iconColor: '#b45309' },
    { icon: 'TrendUp',   title: 'Improve Cash-Flow Visibility',  text: 'Track outstanding invoices, disputes, recoveries and commissioner-level reconciliation from one place.',                              iconBg: '#f0fdf4', iconColor: '#16a34a' },
  ]

  return (
    <section style={{ background: '#ffffff', padding: '40px 0 72px' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
        }}>
          {cards.map((c, i) => (
            <div key={c.title} className={`card reveal delay-${i + 1}`} style={{ padding: '26px 24px', minHeight: 180 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: c.iconBg, color: c.iconColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
                transition: 'transform 0.2s',
              }}>
                <Icon name={c.icon} size={20} />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8, lineHeight: 1.3 }}>{c.title}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#64748b' }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="section-py" style={{ background: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div className="reveal" style={{ maxWidth: 680, marginBottom: 64 }}>
          <SectionLabel text="About RemitMatch" />
          <h2 className="h2" style={{ marginBottom: 18 }}>
            Turning Complex Commissioner Payments Into Financial Clarity
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.72, color: '#475569' }}>
            UK care providers can issue dozens or hundreds of invoices each month while receiving bulk payments from multiple Local Authorities and NHS commissioners. Finance teams may then need to manually determine which invoices were included, whether the correct commissioner rate was applied and whether any payments are missing or incomplete.
          </p>
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }} className="about-grid">
          {/* Left — problem */}
          <div className="reveal">
            <h3 className="h3" style={{ marginBottom: 20 }}>The Traditional Process</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#64748b', marginBottom: 24 }}>
              Without a dedicated reconciliation tool, finance teams typically manage this process manually, drawing on several sources simultaneously.
            </p>
            <div style={{ display: 'grid', gap: 10 }}>
              {[
                { label: 'Invoice CSV exports', icon: 'FileText' },
                { label: 'Commissioner remittance PDFs', icon: 'FileText' },
                { label: 'Excel spreadsheets', icon: 'BarChart' },
                { label: 'Manual rate calculations', icon: 'Pound' },
                { label: 'Rate schedule cross-checking', icon: 'Search' },
                { label: 'Email threads and follow-ups', icon: 'Mail' },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px', borderRadius: 10,
                  background: '#fff', border: '1px solid #e4eaf2',
                }}>
                  <span style={{ color: '#ef4444', flexShrink: 0 }}><Icon name={item.icon} size={16} /></span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#334155' }}>{item.label}</span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 28,
              padding: '22px 24px',
              borderRadius: 16,
              background: 'linear-gradient(135deg,#07142d,#0b3941)',
              color: '#fff',
            }}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#1a9ba1', marginBottom: 10 }}>
                RemitMatch's Role
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.82)' }}>
                RemitMatch creates a specialised reconciliation layer between a provider's existing invoicing workflow and the remittances received from commissioners — complementing, not replacing, existing systems.
              </p>
            </div>
          </div>

          {/* Right — Before vs After */}
          <div className="reveal delay-2">
            <h3 className="h3" style={{ marginBottom: 20 }}>Before vs With RemitMatch</h3>
            <div style={{ display: 'grid', gap: 14 }}>
              {/* Without */}
              <div style={{ background: '#fff', border: '1px solid #fde8e8', borderRadius: 16, padding: '22px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="X" size={12} className="" style={{ color: '#ef4444' }} />
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Without RemitMatch</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['Issued Invoices','Bulk Commissioner Payment','Manual Spreadsheet Matching','Manual Rate Checking','Underpayments Potentially Missed','Evidence Collected Manually','Email-Based Dispute Tracking'].map((s, i, arr) => (
                    <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <span style={{ fontSize: 12, color: '#64748b', padding: '4px 0' }}>{s}</span>
                      {i < arr.length - 1 && <span style={{ fontSize: 12, color: '#cbd5e1', margin: '1px 0' }}>↓</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* With */}
              <div style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: 16, padding: '22px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="Check" size={12} />
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.06em' }}>With RemitMatch</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['Invoice Data + Commissioner Remittance','Automated Parsing','Invoice Matching','Rate Validation','Discrepancy Detection','Evidence Generation','Resolution Tracking'].map((s, i, arr) => (
                    <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <span style={{ fontSize: 12, color: '#047857', fontWeight: 600, padding: '4px 0' }}>{s}</span>
                      {i < arr.length - 1 && <span style={{ fontSize: 12, color: '#6ee7b7', margin: '1px 0' }}>↓</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder */}
        <div className="reveal" style={{ marginTop: 72, borderTop: '1px solid #e4eaf2', paddingTop: 64 }}>
          <div style={{ maxWidth: 680, marginBottom: 36 }}>
            <SectionLabel text="The Founder" />
            <h2 className="h2">Built From First-Hand Care and Financial Experience</h2>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e4eaf2', borderRadius: 20, padding: '32px 36px', display: 'flex', gap: 32, alignItems: 'flex-start', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }} className="founder-flex">
            {/* Avatar */}
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 88, height: 88, borderRadius: 18,
                background: 'linear-gradient(135deg,#0d1630,#157a7f)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(21,122,127,0.25)',
              }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: 26, letterSpacing: '-0.02em' }}>HR</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Hetal Rokad</p>
                <p style={{ fontSize: 12, color: '#157a7f', fontWeight: 600 }}>Founder &amp; Managing Director</p>
              </div>
            </div>

            {/* Bio */}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#475569', marginBottom: 20 }}>
                RemitMatch is founded by Hetal Rokad, whose background combines direct UK care-sector experience with financial-services and business-management expertise. Her professional experience provides an understanding of the operational pressures faced by care providers, while her financial background supports RemitMatch's focus on reconciliation, payment accuracy and financial visibility.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  'More than 3 years of UK care-sector experience',
                  'Care Assistant — Helping Hands',
                  'Branch Sales Executive — IndusInd Bank',
                  'MBA in Business Management & Finance, University of West London',
                  'Bachelor of Commerce, Saurashtra University',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: '#157a7f', marginTop: 2, flexShrink: 0 }}><Icon name="CheckCircle" size={14} /></span>
                    <span style={{ fontSize: 13.5, color: '#334155', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .founder-flex { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </section>
  )
}

// ─── PLATFORM ────────────────────────────────────────────────────────────────
function Platform() {
  const [showcaseTab, setShowcaseTab] = useState('Dashboard')
  const tabs = ['Dashboard','Invoices','Remittances','Reconciliation','Disputes','Commissioners','Reports']

  const primary = [
    { icon: 'FileText',  title: 'Multi-Format Remittance Parsing', desc: 'Convert commissioner remittance documents into structured payment lines from PDF, CSV, Excel and commissioner portal exports.',                                       color: '#2563eb', bg: '#eff6ff' },
    { icon: 'GitMerge',  title: 'Automated Invoice Matching',       desc: 'Automatically match individual payment lines from bulk remittances to the invoices they were intended to settle, using invoice number, service-user ID, dates and amounts.', color: '#7c3aed', bg: '#f5f3ff' },
    { icon: 'Pound',     title: 'Automatic Rate Validation',        desc: 'Validate matched payments against the applicable commissioner rate and agreed uplift rules, flagging incorrect base rates, missing uplifts and partial payments.',            color: '#0f766e', bg: '#f0fafa' },
  ]

  const secondary = [
    { icon: 'Upload',      title: 'Invoice Ingestion',                  desc: 'Import issued invoice data from existing care-management or accounting workflows via CSV.',                       color: '#0f766e', bg: '#f0fafa' },
    { icon: 'Database',    title: 'Commissioner Rate Library',           desc: 'Maintain commissioner-specific base rates, uplift rules and historical rate versions in one structured library.', color: '#b45309', bg: '#fffbeb' },
    { icon: 'Search',      title: 'Underpayment & Discrepancy Detection',desc: 'Automatically surface missing invoices, short payments, partial payments and incorrect-rate discrepancies.',      color: '#dc2626', bg: '#fff5f5' },
    { icon: 'ShieldCheck', title: 'Evidence-Ready Dispute Packs',        desc: 'Organise invoice details, applicable rates, expected vs received payments and shortfall calculations into exportable dispute evidence.',                               color: '#059669', bg: '#f0fdf4' },
    { icon: 'Clipboard',   title: 'Dispute Resolution Tracking',         desc: 'Track disputes from Draft → Submitted → Under Review → Resolved with commissioner, amount and date detail.',      color: '#0f766e', bg: '#f0fafa' },
    { icon: 'Lock',        title: 'Complete Audit Trail',                desc: 'Timestamped records of reconciliation activity, discrepancies and resolution outcomes for accountability and audit readiness.',                                         color: '#475569', bg: '#f8fafc' },
  ]

  const disputeRows = [
    { id: 'DIS-001', commissioner: 'Local Authority A', amount: '£1,600', date: '01 Oct 2026', status: 'Under Review', recovered: '—' },
    { id: 'DIS-002', commissioner: 'Local Authority B', amount: '£150',   date: '29 Sep 2026', status: 'Submitted',    recovered: '—' },
    { id: 'DIS-003', commissioner: 'NHS ICB',           amount: '£2,300', date: '15 Sep 2026', status: 'Resolved',     recovered: '£2,300' },
  ]

  return (
    <section id="platform" className="section-py" style={{ background: '#ffffff' }}>
      <div className="container">
        {/* Header */}
        <div className="reveal" style={{ maxWidth: 700, marginBottom: 56 }}>
          <SectionLabel text="Platform" />
          <h2 className="h2" style={{ marginBottom: 16 }}>One Reconciliation Workflow.<br />From Remittance to Resolution.</h2>
          <p style={{ fontSize: 16, lineHeight: 1.72, color: '#64748b' }}>
            RemitMatch combines invoice ingestion, remittance parsing, automated matching, commissioner-specific rate validation, discrepancy detection and dispute evidence generation into one structured workflow.
          </p>
        </div>

        {/* Primary 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 20 }} className="plat-primary">
          {primary.map((m, i) => (
            <div key={m.title} className={`card reveal delay-${i + 1}`} style={{ padding: '28px 26px' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <Icon name={m.icon} size={20} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 10, lineHeight: 1.3 }}>{m.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#64748b' }}>{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Secondary 6 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 64 }} className="plat-secondary">
          {secondary.map((m, i) => (
            <div key={m.title} className={`card reveal delay-${(i % 3) + 1}`} style={{ padding: '24px 22px' }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <Icon name={m.icon} size={18} />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8, lineHeight: 1.3 }}>{m.title}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#64748b' }}>{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Dashboard showcase */}
        <div className="reveal" style={{
          background: 'linear-gradient(135deg,#0d1829,#0b2736)',
          borderRadius: 24, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.28)',
        }}>
          {/* Tab bar */}
          <div style={{ display: 'flex', gap: 4, padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setShowcaseTab(t)}
                style={{
                  padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 600,
                  background: showcaseTab === t ? '#157a7f' : 'transparent',
                  color: showcaseTab === t ? '#fff' : 'rgba(255,255,255,0.40)',
                  transition: 'all 0.2s',
                }}>
                {t}
              </button>
            ))}
          </div>

          <div style={{ padding: '24px 24px 28px' }}>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginBottom: 20 }} className="showcase-stats">
              {[
                { label: 'Outstanding Invoices', value: '£47,500', color: '#e2e8f0' },
                { label: 'Open Disputes',         value: '3',       color: '#fbbf24' },
                { label: 'Disputed Value',        value: '£4,050',  color: '#f87171' },
                { label: 'Resolved This Month',   value: '£12,300', color: '#10b981' },
                { label: 'Reconciliation',        value: '98%',     color: '#1a9ba1' },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px 14px', textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color, letterSpacing: '-0.02em', marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.40)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Chart + donut */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }} className="showcase-charts">
              {/* Bar chart */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '18px 20px' }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>Payment Reconciliation — Last 6 Months</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 100 }}>
                  {[{m:'May',r:85,d:12},{m:'Jun',r:90,d:8},{m:'Jul',r:88,d:10},{m:'Aug',r:92,d:6},{m:'Sep',r:95,d:4},{m:'Oct',r:98,d:2}].map(d => (
                    <div key={d.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%' }}>
                      <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                        <div style={{ flex: 1, background: '#157a7f', borderRadius: '3px 3px 0 0', height: `${d.r}%` }} />
                        <div style={{ flex: 1, background: 'rgba(239,68,68,0.5)', borderRadius: '3px 3px 0 0', height: `${d.d}%` }} />
                      </div>
                      <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{d.m}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                  {[{c:'#157a7f',l:'Reconciled'},{c:'rgba(239,68,68,0.5)',l:'Disputed'}].map(leg => (
                    <div key={leg.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: leg.c }} />
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{leg.l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dispute donut */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '18px 20px' }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)', marginBottom: 12 }}>Dispute Status</p>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                  <svg viewBox="0 0 80 80" style={{ width: 80, height: 80 }}>
                    <circle cx="40" cy="40" r="28" fill="none" stroke="#1e2d45" strokeWidth="14"/>
                    <circle cx="40" cy="40" r="28" fill="none" stroke="#157a7f" strokeWidth="14" strokeDasharray="88 88" transform="rotate(-90 40 40)"/>
                    <circle cx="40" cy="40" r="28" fill="none" stroke="#f59e0b" strokeWidth="14" strokeDasharray="44 132" strokeDashoffset="-88" transform="rotate(-90 40 40)"/>
                    <circle cx="40" cy="40" r="28" fill="none" stroke="#ef4444" strokeWidth="14" strokeDasharray="22 154" strokeDashoffset="-132" transform="rotate(-90 40 40)"/>
                    <text x="40" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">3</text>
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[{l:'Resolved',c:'#157a7f',n:2},{l:'Under Review',c:'#f59e0b',n:1},{l:'Submitted',c:'#ef4444',n:0}].map(d => (
                    <div key={d.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.c }} />
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{d.l}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>{d.n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dispute table */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>Active Disputes</span>
                <span style={{ fontSize: 11, color: '#1a9ba1', fontWeight: 600 }}>View All</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr>
                      {['Dispute ID','Commissioner','Amount','Submitted','Status','Recovered'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.35)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {disputeRows.map(r => {
                      const sc = r.status === 'Resolved' ? { bg: 'rgba(16,185,129,0.15)', color: '#10b981' } : r.status === 'Under Review' ? { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24' } : { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa' }
                      return (
                        <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.65)', fontFamily: 'monospace', fontSize: 11 }}>{r.id}</td>
                          <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.50)' }}>{r.commissioner}</td>
                          <td style={{ padding: '12px 16px', color: '#fff', fontWeight: 700 }}>{r.amount}</td>
                          <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.45)' }}>{r.date}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 600, background: sc.bg, color: sc.color }}>{r.status}</span>
                          </td>
                          <td style={{ padding: '12px 16px', fontWeight: 700, color: r.recovered !== '—' ? '#10b981' : 'rgba(255,255,255,0.30)' }}>{r.recovered}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .plat-primary { grid-template-columns: 1fr !important; }
          .plat-secondary { grid-template-columns: 1fr 1fr !important; }
          .showcase-stats { grid-template-columns: repeat(3,1fr) !important; }
          .showcase-charts { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .plat-secondary { grid-template-columns: 1fr !important; }
          .showcase-stats { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  )
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: '01', icon: 'Upload',      title: 'Import Your Invoices',              text: 'Export issued invoices from your existing care-management or accounting workflow and upload the data to RemitMatch.' },
    { n: '02', icon: 'FileText',    title: 'Upload the Remittance',              text: 'Upload the Local Authority or NHS remittance in a supported format such as PDF, CSV, Excel or commissioner portal export.' },
    { n: '03', icon: 'Lightning',   title: 'RemitMatch Reconciles',              text: 'The system structures the remittance, matches payment lines to invoices and validates the applicable commissioner rates.' },
    { n: '04', icon: 'Search',      title: 'Review Discrepancies',               text: 'Missing invoices, underpayments, partial payments and incorrect rates are highlighted for review.' },
    { n: '05', icon: 'ShieldCheck', title: 'Generate Evidence & Track Resolution',text: 'Prepare structured evidence for flagged discrepancies and track each dispute through its resolution lifecycle.' },
  ]

  return (
    <section id="how-it-works" className="section-py" style={{ background: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div className="reveal" style={{ maxWidth: 620, marginBottom: 64 }}>
          <SectionLabel text="How It Works" />
          <h2 className="h2" style={{ marginBottom: 14 }}>From Bulk Remittance to Clear Reconciliation</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#64748b' }}>Five structured steps from invoice import to dispute resolution.</p>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative', marginBottom: 72 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5,1fr)',
            gap: 24,
          }} className="steps-grid">
            {steps.map((s, i) => (
              <div key={s.n} className={`reveal delay-${Math.min(i + 1, 4)}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                {/* Number + icon */}
                <div style={{ position: 'relative', marginBottom: 20 }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 18,
                    background: 'linear-gradient(135deg,#157a7f,#0f4e52)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', boxShadow: '0 8px 24px rgba(21,122,127,0.25)',
                  }}>
                    <Icon name={s.icon} size={22} />
                  </div>
                  <div style={{
                    position: 'absolute', top: -6, right: -8,
                    width: 22, height: 22, borderRadius: '50%',
                    background: '#0f172a', border: '2px solid #f8fafc',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: '#1a9ba1', fontWeight: 800, fontSize: 9 }}>{s.n}</span>
                  </div>
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 8, lineHeight: 1.35 }}>{s.title}</h3>
                <p style={{ fontSize: 12.5, lineHeight: 1.65, color: '#64748b' }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow visual */}
        <div className="reveal" style={{
          background: 'linear-gradient(135deg,#07142d,#0b2736)',
          borderRadius: 20, padding: '36px 32px',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1a9ba1', textAlign: 'center', marginBottom: 24 }}>
            Reconciliation Workflow
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, flexWrap: 'wrap', rowGap: 8 }}>
            {[
              { t: 'Issued Invoices', sub: 'Care provider', type: 'node' },
              { t: '+', type: 'op', c: '#1a9ba1' },
              { t: 'Commissioner Remittance', sub: 'LA / NHS ICB', type: 'node' },
              { t: '→', type: 'op', c: '#475569' },
              { t: 'Parse', type: 'step', c: '#1a9ba1', bg: 'rgba(21,122,127,0.12)' },
              { t: '→', type: 'op', c: '#475569' },
              { t: 'Match', type: 'step', c: '#1a9ba1', bg: 'rgba(21,122,127,0.12)' },
              { t: '→', type: 'op', c: '#475569' },
              { t: 'Validate', type: 'step', c: '#1a9ba1', bg: 'rgba(21,122,127,0.12)' },
              { t: '→', type: 'op', c: '#475569' },
              { t: 'Flag', type: 'step', c: '#f87171', bg: 'rgba(239,68,68,0.10)' },
              { t: '→', type: 'op', c: '#475569' },
              { t: 'Evidence', type: 'step', c: '#fbbf24', bg: 'rgba(245,158,11,0.10)' },
              { t: '→', type: 'op', c: '#475569' },
              { t: 'Resolution', type: 'step', c: '#10b981', bg: 'rgba(16,185,129,0.10)' },
            ].map((item, i) => {
              if (item.type === 'op') return (
                <span key={i} style={{ color: item.c, fontWeight: 700, fontSize: 18, padding: '0 6px' }}>{item.t}</span>
              )
              if (item.type === 'step') return (
                <div key={i} style={{ padding: '8px 14px', borderRadius: 10, background: item.bg, border: `1px solid ${item.c}30` }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: item.c }}>{item.t}</span>
                </div>
              )
              return (
                <div key={i} style={{ padding: '8px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.80)' }}>{item.t}</span>
                  {item.sub && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{item.sub}</div>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Scenario */}
        <div className="reveal" style={{ marginTop: 64 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="h2" style={{ marginBottom: 8 }}>See the Difference</h2>
            <p style={{ fontSize: 14, color: '#94a3b8' }}>An illustrative scenario based on the RemitMatch use case.</p>
          </div>

          {/* Central stat */}
          <div style={{ textAlign: 'center', marginBottom: 36, padding: '28px', background: '#fff', border: '1px solid #e4eaf2', borderRadius: 18, maxWidth: 340, margin: '0 auto 36px' }}>
            <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>A provider receives a</p>
            <p style={{ fontSize: 42, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>£47,500</p>
            <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>commissioner remittance covering <strong>200+ invoices</strong></p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="scenario-grid">
            {/* Without */}
            <div style={{ background: '#fff', border: '1px solid #fde8e8', borderRadius: 18, padding: '28px 26px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#ef4444', display: 'flex' }}><Icon name="X" size={14} /></span>
                </div>
                <span style={{ fontWeight: 700, color: '#dc2626', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Without RemitMatch</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Finance staff manually compare invoice exports and remittance information',
                  'Several hours may be spent reconciling transactions',
                  'Two missing invoices total £3,200 — potentially undetected',
                  'Two invoices contain £850 of underpayments — potentially undetected',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }}><Icon name="AlertTri" size={14} /></span>
                    <span style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b' }}>{item}</span>
                  </li>
                ))}
                <li style={{ padding: '12px 14px', borderRadius: 10, background: '#fff5f5', border: '1px solid #fecaca', marginTop: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#dc2626' }}>Total discrepancy: £4,050 — potentially missed</span>
                </li>
              </ul>
            </div>

            {/* With */}
            <div style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: 18, padding: '28px 26px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#059669', display: 'flex' }}><Icon name="Check" size={14} /></span>
                </div>
                <span style={{ fontWeight: 700, color: '#059669', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em' }}>With RemitMatch</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Import invoice information',
                  'Upload remittance document',
                  'Automatically structure payment data',
                  'Match payments to invoices and validate rates',
                  'Generate supporting evidence',
                  'Review discrepancy within the same workflow',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#059669', flexShrink: 0, marginTop: 2 }}><Icon name="CheckCircle" size={14} /></span>
                    <span style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b' }}>{item}</span>
                  </li>
                ))}
                <li style={{ padding: '12px 14px', borderRadius: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', marginTop: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#059669' }}>£4,050 of discrepancies identified and flagged</span>
                </li>
              </ul>
              <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 16, fontStyle: 'italic' }}>Note: Recovery of any discrepancy is not guaranteed. RemitMatch supports the identification and evidence process.</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .steps-grid { grid-template-columns: repeat(2,1fr) !important; gap: 32px !important; }
          .scenario-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

// ─── MARKET ──────────────────────────────────────────────────────────────────
function Market() {
  const stats = [
    { value: '15,232', label: 'CQC-regulated domiciliary care providers', sub: 'Referenced in the RemitMatch business plan' },
    { value: '£679m',  label: 'Reported owed to care providers',          sub: 'Outstanding more than 30 days late' },
    { value: '9,900',  label: 'Estimated serviceable SME market',          sub: 'Core target market for RemitMatch' },
    { value: '2–5+',   label: 'Typical commissioners per provider',        sub: 'Local Authorities and NHS ICBs' },
  ]

  const secondary = [
    { title: 'Supported Living Providers',        text: 'Providers working under similar commissioned-care structures represent a natural expansion opportunity.',                                                      tag: 'Adjacent' },
    { title: 'Care-Sector Accountancy Practices', text: 'Accountancy firms serving multiple care providers can potentially use RemitMatch as a multi-client reconciliation service.',                                tag: 'Partner Opportunity' },
    { title: 'Residential Care',                  text: 'A future expansion opportunity with related but different invoicing and commissioner reconciliation structures.',                                           tag: 'Future' },
    { title: 'Community & Domiciliary Nursing',   text: 'A potential adjacent use case involving NHS and commissioned healthcare remittance reconciliation.',                                                        tag: 'Future' },
  ]

  const diff = [
    { feature: 'Invoice data',                  acc: true,      care: true,      rm: true  },
    { feature: 'Bulk remittance parsing',        acc: 'Limited', care: 'Limited', rm: true  },
    { feature: 'Invoice-to-payment matching',    acc: 'Limited', care: 'Limited', rm: true  },
    { feature: 'Commissioner rate validation',   acc: false,     care: 'Limited', rm: true  },
    { feature: 'Missing invoice detection',      acc: false,     care: false,     rm: true  },
    { feature: 'Underpayment detection',         acc: 'Limited', care: 'Limited', rm: true  },
    { feature: 'Evidence pack generation',       acc: false,     care: false,     rm: true  },
    { feature: 'Dispute tracking',               acc: false,     care: false,     rm: true  },
  ]

  const Cell = ({ val }) => {
    if (val === true) return <span style={{ display: 'inline-flex', width: 26, height: 26, borderRadius: '50%', background: '#f0fdf4', color: '#059669', alignItems: 'center', justifyContent: 'center' }}><Icon name="Check" size={13} /></span>
    if (val === false) return <span style={{ display: 'inline-flex', width: 26, height: 26, borderRadius: '50%', background: '#f8fafc', color: '#cbd5e1', alignItems: 'center', justifyContent: 'center' }}><Icon name="Minus" size={13} /></span>
    return <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#fffbeb', color: '#b45309' }}>{val}</span>
  }

  return (
    <section id="market" className="section-py" style={{ background: '#fff' }}>
      <div className="container">
        <div className="reveal" style={{ maxWidth: 680, marginBottom: 56 }}>
          <SectionLabel text="Market" />
          <h2 className="h2" style={{ marginBottom: 16 }}>Built Specifically for the UK Care-Commissioning Environment</h2>
          <p style={{ fontSize: 16, lineHeight: 1.72, color: '#64748b' }}>
            RemitMatch is designed around the structure of UK commissioned care, where providers work with multiple commissioners — each with different remittance formats, rates, uplift rules, payment schedules and reporting processes.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 16 }} className="market-stats">
          {stats.map((s, i) => (
            <div key={s.label} className={`reveal delay-${i + 1}`} style={{
              background: 'linear-gradient(135deg,#07142d,#0b2736)',
              borderRadius: 18, padding: '28px 22px', textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 8px 28px rgba(0,0,0,0.18)',
            }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 8 }}>{s.value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1a9ba1', marginBottom: 6, lineHeight: 1.4 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.40)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <p className="reveal" style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', marginBottom: 64, fontStyle: 'italic' }}>
          Market figures reflect the research and assumptions used within the RemitMatch business plan.
        </p>

        {/* Target customer */}
        <div className="reveal" style={{ marginBottom: 56 }}>
          <h3 className="h3" style={{ textAlign: 'center', marginBottom: 28 }}>Primary Target Customer</h3>
          <div style={{
            background: 'linear-gradient(135deg,#f0fafa,#f8fafc)',
            border: '1px solid #c7e8ea', borderRadius: 20,
            padding: '36px 40px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }} className="customer-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg,#157a7f,#0f4e52)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                <Icon name="Building" size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: 19, fontWeight: 800, color: '#0f172a' }}>SME Domiciliary Care Providers</h4>
                <p style={{ fontSize: 13, color: '#64748b' }}>The core RemitMatch target market</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 28 }} className="profile-stats">
              {[
                { label: 'Staff Range',        value: '5–50',               sub: 'Typically 10–30' },
                { label: 'Annual Turnover',    value: '£500k–£5m',          sub: 'Estimated range' },
                { label: 'Commissioners',      value: '2–5+',               sub: 'Local Authorities & NHS ICBs' },
                { label: 'Monthly Invoices',   value: '50–500+',            sub: 'Depending on size' },
                { label: 'Finance Function',   value: '1–2 people',         sub: 'Often a small team' },
                { label: 'Current Method',     value: 'Manual / Spreadsheet',sub: 'Frequently' },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e4eaf2', padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</p>
                  <p style={{ fontWeight: 800, fontSize: 16, color: '#0f172a', letterSpacing: '-0.01em' }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{s.sub}</p>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Key Pain Points</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 8 }}>
                {['Underpayments may go undetected','Manual reconciliation takes time','Multiple commissioner formats','Rate complexity','Difficult dispute preparation','Limited cash-flow visibility','Fragmented financial records'].map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 8, padding: '9px 12px' }}>
                    <span style={{ color: '#ef4444', flexShrink: 0 }}><Icon name="AlertTri" size={13} /></span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#dc2626' }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Secondary markets */}
        <div className="reveal" style={{ marginBottom: 56 }}>
          <h3 className="h3" style={{ textAlign: 'center', marginBottom: 28 }}>Secondary &amp; Future Market Opportunities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="secondary-grid">
            {secondary.map(m => (
              <div key={m.title} className="card" style={{ padding: '22px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', lineHeight: 1.3, paddingRight: 8 }}>{m.title}</h4>
                  <span style={{
                    flexShrink: 0, padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
                    background: m.tag === 'Future' ? '#f1f5f9' : m.tag === 'Partner Opportunity' ? '#f0fafa' : '#eff6ff',
                    color:      m.tag === 'Future' ? '#64748b'  : m.tag === 'Partner Opportunity' ? '#0f766e'  : '#2563eb',
                  }}>{m.tag}</span>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: '#64748b' }}>{m.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="reveal">
          <h3 className="h3" style={{ textAlign: 'center', marginBottom: 28 }}>Where RemitMatch Fits</h3>
          <div style={{ background: '#fff', border: '1px solid #e4eaf2', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e4eaf2' }}>Feature</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e4eaf2' }}>Accounting Software</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e4eaf2' }}>Care Software</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e4eaf2', background: '#f0fafa' }}>RemitMatch</th>
                  </tr>
                </thead>
                <tbody>
                  {diff.map((row, i) => (
                    <tr key={row.feature} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafbfc' }}>
                      <td style={{ padding: '14px 24px', fontSize: 14, fontWeight: 500, color: '#0f172a' }}>{row.feature}</td>
                      <td style={{ padding: '14px 24px', textAlign: 'center' }}><Cell val={row.acc} /></td>
                      <td style={{ padding: '14px 24px', textAlign: 'center' }}><Cell val={row.care} /></td>
                      <td style={{ padding: '14px 24px', textAlign: 'center', background: i % 2 === 0 ? '#f8fffe' : '#f0fafa' }}><Cell val={row.rm} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', marginTop: 12, fontStyle: 'italic' }}>
            "Limited" indicates partial or general-purpose capability not specifically designed for the UK care-commissioning context.
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .market-stats { grid-template-columns: repeat(2,1fr) !important; }
          .secondary-grid { grid-template-columns: repeat(2,1fr) !important; }
          .profile-stats { grid-template-columns: repeat(2,1fr) !important; }
          .customer-card { padding: 24px 20px !important; }
        }
        @media (max-width: 600px) {
          .market-stats { grid-template-columns: repeat(2,1fr) !important; }
          .secondary-grid { grid-template-columns: 1fr !important; }
          .profile-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
function Pricing({ onPilot }) {
  const [annual, setAnnual] = useState(false)

  const plans = [
    {
      name: 'Starter', price: 200, annual: 170,
      invoices: 'Up to 100 invoices/month', comms: 'Up to 2 commissioners',
      bestFor: 'New or very small care providers', badge: null, featured: false,
      features: ['Invoice import','Remittance upload','Automated matching','Rate validation','Discrepancy detection','Evidence pack generation','Dashboard','Audit trail','Reporting'],
    },
    {
      name: 'Growth', price: 300, annual: 255,
      invoices: 'Up to 500 invoices/month', comms: 'Up to 4 commissioners',
      bestFor: 'Most SME domiciliary care providers', badge: 'Most Popular', featured: true,
      features: ['Everything in Starter','Higher reconciliation volume','Multi-commissioner management','Commissioner rate management','Dispute tracking','Expanded reporting','Multi-commissioner financial visibility'],
    },
    {
      name: 'Enterprise', price: 400, annual: 340,
      invoices: '500+ invoices/month', comms: '5+ commissioners',
      bestFor: 'Larger providers and multi-site organisations', badge: null, featured: false,
      features: ['Everything in Growth','High-volume reconciliation','Multiple commissioner workflows','Multi-site suitability','Expanded reporting','Scalable reconciliation workflow','Priority onboarding'],
    },
  ]

  return (
    <section id="pricing" className="section-py" style={{ background: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div className="reveal" style={{ maxWidth: 600, marginBottom: 48, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <SectionLabel text="Pricing" />
          <h2 className="h2" style={{ marginBottom: 14 }}>Straightforward, Transparent Pricing</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#64748b' }}>Choose the plan that fits your provider's scale and commissioner volume.</p>
        </div>

        {/* Toggle */}
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: '#fff', border: '1px solid #e4eaf2',
            borderRadius: 12, padding: 4,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            {[false, true].map(isAnnual => (
              <button key={String(isAnnual)} onClick={() => setAnnual(isAnnual)}
                style={{
                  padding: '9px 20px', borderRadius: 9, border: 'none', cursor: 'pointer',
                  fontSize: 14, fontWeight: 600,
                  background: annual === isAnnual ? '#0f172a' : 'transparent',
                  color: annual === isAnnual ? '#fff' : '#64748b',
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: 7,
                }}>
                {isAnnual ? 'Annual' : 'Monthly'}
                {isAnnual && (
                  <span style={{ fontSize: 10, fontWeight: 700, background: '#f0fafa', color: '#0f766e', padding: '2px 6px', borderRadius: 999 }}>-15%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, marginBottom: 20, alignItems: 'start' }} className="pricing-grid">
          {plans.map((plan, i) => (
            <div key={plan.name} className={`reveal delay-${i + 1}`} style={{
              background: '#fff',
              borderRadius: 20,
              border: plan.featured ? '2px solid #157a7f' : '1px solid #e4eaf2',
              boxShadow: plan.featured ? '0 12px 40px rgba(21,122,127,0.15)' : '0 2px 12px rgba(0,0,0,0.05)',
              overflow: 'hidden',
              transform: plan.featured ? 'translateY(-8px)' : 'none',
              transition: 'box-shadow 0.25s, transform 0.25s',
            }}>
              {plan.badge && (
                <div style={{ background: '#157a7f', color: '#fff', textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '9px 0' }}>
                  {plan.badge}
                </div>
              )}
              <div style={{ padding: '30px 28px' }}>
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{plan.name}</h3>
                  <p style={{ fontSize: 13, color: '#94a3b8' }}>{plan.bestFor}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                  <span style={{ fontSize: 46, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    £{annual ? plan.annual : plan.price}
                  </span>
                  <span style={{ fontSize: 14, color: '#94a3b8', fontWeight: 500 }}>/month</span>
                </div>
                {!annual && <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 20 }}>Or £{plan.annual}/month billed annually</p>}
                {annual && <p style={{ fontSize: 12, color: '#0f766e', fontWeight: 600, marginBottom: 20 }}>Billed annually — save 15%</p>}

                {/* Capacity */}
                <div style={{ background: '#f8fafc', borderRadius: 12, border: '1px solid #e4eaf2', padding: '12px 14px', marginBottom: 22 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: '#94a3b8', flexShrink: 0 }}><Icon name="FileText" size={14} /></span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{plan.invoices}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ color: '#94a3b8', flexShrink: 0 }}><Icon name="Building" size={14} /></span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{plan.comms}</span>
                  </div>
                </div>

                {/* Features */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: '#157a7f', flexShrink: 0, marginTop: 1 }}><Icon name="CheckCircle" size={14} /></span>
                      <span style={{ fontSize: 14, lineHeight: 1.5, color: '#475569' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={plan.featured ? 'btn-primary' : 'btn-dark'}
                  style={{ width: '100%', height: 48, fontSize: 15 }}
                  onClick={onPilot}>
                  Request a Pilot
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 14, color: '#64748b' }}>
            Save 15% with an annual commitment. &nbsp;
            <span style={{ color: '#94a3b8' }}>Annual equivalents: Starter £170/mo · Growth £255/mo · Enterprise £340/mo</span>
          </p>
        </div>

        {/* Success fee */}
        <div className="reveal" style={{
          background: '#fff',
          border: '1px solid #fde68a',
          borderRadius: 18, padding: '30px 36px',
          textAlign: 'center', marginBottom: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, background: '#fef3c7', marginBottom: 14 }}>
            <span style={{ color: '#b45309' }}><Icon name="Star" size={13} /></span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Dispute Recovery Success Fee</span>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>Dispute-Recovery Success Fee</h3>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#475569', maxWidth: 580, margin: '0 auto 10px' }}>
            RemitMatch charges a <strong>6–8% success fee</strong> on underpayments successfully recovered through disputes supported by the platform.
          </p>
          <p style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>Recovery is not guaranteed. The fee applies only to amounts successfully recovered.</p>
        </div>

        {/* Partner tier */}
        <div className="reveal" style={{ background: '#fff', border: '1px solid #e4eaf2', borderRadius: 18, padding: '28px 32px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 999, background: '#f1f5f9', color: '#64748b', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                Planned Year 2+ Offering
              </span>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>For Accountancy Partners</h3>
              <p style={{ fontSize: 14, color: '#64748b', maxWidth: 360, lineHeight: 1.6 }}>A planned future tier for accountancy practices serving multiple care provider clients.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { val: '£199/mo', sub: 'Up to 5 provider clients' },
                { val: '£39/client', sub: 'Per additional provider client' },
              ].map(item => (
                <div key={item.val} style={{ background: '#f8fafc', border: '1px solid #e4eaf2', borderRadius: 12, padding: '14px 18px', textAlign: 'center', minWidth: 130 }}>
                  <p style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>{item.val}</p>
                  <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Future licensing */}
        <div className="reveal" style={{ background: '#f8fafc', border: '1px solid #e4eaf2', borderRadius: 14, padding: '16px 22px', textAlign: 'center' }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', marginRight: 8 }}>Future Year 3+ Partnership Model</span>
          <span style={{ fontSize: 13, color: '#64748b' }}>
            Software Vendor Integration Fee: <strong style={{ color: '#0f172a' }}>£2,000–£5,000</strong>&nbsp;·&nbsp;
            Ongoing Revenue Share: <strong style={{ color: '#0f172a' }}>15–20%</strong>
          </span>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; max-width: 480px; margin-left: auto; margin-right: auto; }
          .pricing-grid > * { transform: none !important; }
        }
      `}</style>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null)

  const faqs = [
    { q: 'What is RemitMatch?', a: 'RemitMatch is a remittance reconciliation and dispute-evidence platform designed for UK SME care providers. It helps match commissioner payments to invoices, validate payment rates, identify discrepancies and organise evidence for payment disputes.' },
    { q: 'Who is RemitMatch designed for?', a: 'RemitMatch is initially designed for SME domiciliary care and support-service providers that invoice multiple Local Authorities and/or NHS Integrated Care Boards.' },
    { q: 'Does RemitMatch replace my existing care-management software?', a: 'No. RemitMatch is designed to complement existing care-management, invoicing and accounting systems rather than replace them.' },
    { q: 'What remittance formats does RemitMatch support?', a: 'The platform is designed to process commissioner remittance information in formats such as PDF, CSV, Excel and selected commissioner portal exports as format coverage expands.' },
    { q: 'How does invoice matching work?', a: 'RemitMatch structures remittance information and matches individual payment lines to issued invoices using reconciliation information such as invoice number, service-user ID, dates and payment amounts.' },
    { q: 'Can RemitMatch identify underpayments?', a: 'Yes. RemitMatch is designed to flag missing invoices, partial payments, incorrect rates and other reconciliation discrepancies.' },
    { q: 'How does RemitMatch check commissioner rates?', a: 'The platform uses commissioner-specific rate schedules and uplift rules to compare received payments with expected payment values.' },
    { q: 'Can RemitMatch generate dispute evidence?', a: 'Yes. The platform is designed to organise invoice information, expected rates, received payment information and shortfall calculations into structured dispute evidence.' },
    { q: 'Can I track disputes?', a: 'Yes. Disputes can be tracked through statuses such as draft, submitted, under review and resolved.' },
    { q: 'Can I manage multiple commissioners?', a: 'Yes. Multi-commissioner reconciliation is a core part of the RemitMatch platform.' },
    { q: 'How much does RemitMatch cost?', a: 'Pricing is £200/month for Starter, £300/month for Growth and £400/month for Enterprise. A 15% annual commitment discount is available. A 6–8% success fee applies to successfully recovered underpayments.' },
    { q: 'Can I request a pilot?', a: "Yes. Complete the Request a Pilot form to register your organisation's interest." },
  ]

  return (
    <section id="faq" className="section-py" style={{ background: '#f8fafc' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 52px' }}>
          <SectionLabel text="FAQ" />
          <h2 className="h2" style={{ marginBottom: 12 }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: 16, color: '#64748b' }}>Common questions about the RemitMatch platform.</p>
        </div>

        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {faqs.map((faq, i) => (
            <div key={i} className="reveal" style={{
              background: '#fff',
              borderBottom: i < faqs.length - 1 ? '1px solid #e8edf4' : 'none',
              borderRadius: i === 0 ? '16px 16px 0 0' : i === faqs.length - 1 ? '0 0 16px 16px' : 0,
              border: i === 0 ? '1px solid #e4eaf2' : i === faqs.length - 1 ? '1px solid #e4eaf2' : undefined,
              borderLeft: '1px solid #e4eaf2', borderRight: '1px solid #e4eaf2',
              overflow: 'hidden',
            }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-${i}`}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  gap: 16,
                }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: open === i ? '#157a7f' : '#f1f5f9',
                  color: open === i ? '#fff' : '#64748b',
                  transition: 'all 0.2s',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                }}>
                  <Icon name="Plus" size={14} />
                </span>
              </button>
              {open === i && (
                <div id={`faq-${i}`} style={{ padding: '0 24px 20px', borderTop: '1px solid #f1f5f9' }}>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: '#64748b', paddingTop: 14 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PILOT FORM ───────────────────────────────────────────────────────────────
function PilotForm({ onClose, isModal = false }) {
  const [form, setForm] = useState({ fullName: '', phoneNumber: '', emailAddress: '', organisationName: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.fullName.trim())          e.fullName = 'Full name is required.'
    if (!form.phoneNumber.trim())       e.phoneNumber = 'Phone number is required.'
    if (!form.emailAddress.trim())      e.emailAddress = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailAddress)) e.emailAddress = 'Please enter a valid email address.'
    if (!form.organisationName.trim())  e.organisationName = 'Organisation name is required.'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    const existingSubmissions = JSON.parse(localStorage.getItem('remitMatchPilotSubmissions')) || []
    const newSubmission = {
      fullName: form.fullName.trim(),
      phoneNumber: form.phoneNumber.trim(),
      emailAddress: form.emailAddress.trim(),
      organisationName: form.organisationName.trim(),
      submissionDateTime: new Date().toISOString(),
    }
    existingSubmissions.push(newSubmission)
    localStorage.setItem('remitMatchPilotSubmissions', JSON.stringify(existingSubmissions))
    setSubmitted(true)
    setForm({ fullName: '', phoneNumber: '', emailAddress: '', organisationName: '' })
    setErrors({})
  }

  const set = (key, val) => {
    setForm(p => ({ ...p, [key]: val }))
    if (errors[key]) setErrors(p => ({ ...p, [key]: undefined }))
  }

  const fields = [
    { key: 'fullName',         label: 'Full Name',          type: 'text',  placeholder: 'e.g. Sarah Williams',    auto: 'name' },
    { key: 'phoneNumber',      label: 'Phone Number',       type: 'tel',   placeholder: 'e.g. 07123 456 789',     auto: 'tel' },
    { key: 'emailAddress',     label: 'Email Address',      type: 'email', placeholder: 'e.g. sarah@care.co.uk',  auto: 'email' },
    { key: 'organisationName', label: 'Organisation Name',  type: 'text',  placeholder: 'e.g. Example Care Ltd',  auto: 'organization' },
  ]

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', boxShadow: '0 4px 16px rgba(16,185,129,0.2)' }}>
        <span style={{ color: '#059669' }}><Icon name="CheckCircle" size={32} /></span>
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Thank You</h3>
      <p style={{ fontSize: 15, color: '#64748b', marginBottom: 24 }}>Your pilot request has been recorded.</p>
      <button className="btn-primary" onClick={() => { setSubmitted(false); if (onClose) onClose() }}>
        {isModal ? 'Close' : 'Submit Another Request'}
      </button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 24 }} className="form-grid">
        {fields.map(f => (
          <div key={f.key}>
            <label htmlFor={`pilot-${f.key}`} style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
              {f.label} <span style={{ color: '#ef4444' }} aria-hidden="true">*</span>
            </label>
            <input
              id={`pilot-${f.key}`}
              type={f.type}
              placeholder={f.placeholder}
              autoComplete={f.auto}
              value={form[f.key]}
              onChange={e => set(f.key, e.target.value)}
              aria-required="true"
              aria-invalid={!!errors[f.key]}
              aria-describedby={errors[f.key] ? `err-${f.key}` : undefined}
              className={`form-input${errors[f.key] ? ' error' : ''}`}
            />
            {errors[f.key] && (
              <p id={`err-${f.key}`} role="alert" style={{ marginTop: 6, fontSize: 12, color: '#ef4444', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icon name="AlertTri" size={12} />{errors[f.key]}
              </p>
            )}
          </div>
        ))}
      </div>
      <button type="submit" className="btn-primary" style={{ width: '100%', height: 50, fontSize: 15, fontWeight: 700 }}>
        Request a Pilot
      </button>
      <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 14 }}>
        Your information is stored only in your browser. No data is sent to any server.
      </p>
      <style>{`@media (max-width: 600px) { .form-grid { grid-template-columns: 1fr !important; } }`}</style>
    </form>
  )
}

// ─── PILOT MODAL ──────────────────────────────────────────────────────────────
function PilotModal({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const onKey = (e) => { if (e.key === 'Escape') onClose() }
      window.addEventListener('keydown', onKey)
      return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
    } else {
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      role="dialog" aria-modal="true" aria-labelledby="modal-title">
      {/* Backdrop */}
      <div onClick={onClose} aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(7,18,41,0.65)', backdropFilter: 'blur(6px)' }} />

      {/* Panel */}
      <div style={{
        position: 'relative', background: '#fff', borderRadius: 22,
        width: '100%', maxWidth: 640, maxHeight: '92vh', overflowY: 'auto',
        boxShadow: '0 32px 80px rgba(0,0,0,0.28)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          padding: '26px 28px 20px',
          borderBottom: '1px solid #f1f5f9',
          position: 'sticky', top: 0, background: '#fff', zIndex: 10,
        }}>
          <div>
            <h2 id="modal-title" style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Request a Pilot</h2>
            <p style={{ fontSize: 13, color: '#94a3b8' }}>Register your organisation's interest in RemitMatch.</p>
          </div>
          <button onClick={onClose} aria-label="Close"
            style={{ width: 34, height: 34, borderRadius: '50%', background: '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', flexShrink: 0 }}>
            <Icon name="X" size={16} />
          </button>
        </div>
        <div style={{ padding: '24px 28px 28px' }}>
          <PilotForm onClose={onClose} isModal />
        </div>
      </div>
    </div>
  )
}

// ─── PILOT CTA ────────────────────────────────────────────────────────────────
function PilotCTA({ onPilot }) {
  return (
    <section id="pilot" style={{ padding: '80px 0', background: '#fff' }}>
      <div className="container">
        <div className="reveal" style={{
          background: 'linear-gradient(135deg,#07142d 0%,#0b1f3b 55%,#0b3941 100%)',
          borderRadius: 24, padding: '60px 48px',
          textAlign: 'center',
          position: 'relative', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.22)',
        }}>
          {/* Glow */}
          <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(circle, rgba(21,122,127,0.18), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: 'rgba(24,190,190,0.12)', border: '1px solid rgba(24,190,190,0.30)', marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a9ba1', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1a9ba1' }}>Get Started</span>
            </div>
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 18, maxWidth: 620, margin: '0 auto 18px' }}>
              Ready to Make Remittance Reconciliation Clearer?
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.68)', maxWidth: 520, margin: '0 auto 32px' }}>
              Request a RemitMatch pilot and explore a more structured approach to commissioner reconciliation, payment discrepancies and dispute evidence.
            </p>
            <button className="btn-primary" onClick={onPilot} style={{ height: 52, padding: '0 32px', fontSize: 15 }}>
              Request a Pilot
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ onPilot }) {
  const navLinks = [
    { id: 'home',         label: 'Home' },
    { id: 'about',        label: 'About' },
    { id: 'platform',     label: 'Platform' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'market',       label: 'Market' },
    { id: 'pricing',      label: 'Pricing' },
    { id: 'faq',          label: 'FAQ' },
  ]
  const goto = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ background: '#07142d', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container" style={{ paddingTop: 64, paddingBottom: 32 }}>
        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 40, marginBottom: 56 }} className="footer-grid">
          {/* Brand */}
          <div>
            <Logo />
            <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.50)', marginTop: 16, maxWidth: 340 }}>
              Automated remittance reconciliation and dispute evidence for UK care providers.
            </p>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,0.30)', marginTop: 12, maxWidth: 340 }}>
              RemitMatch is a specialised reconciliation layer designed to work alongside existing care-management, invoicing and accounting systems.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {navLinks.map(l => (
                <li key={l.id}>
                  <button onClick={() => goto(l.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'rgba(255,255,255,0.55)', padding: 0, transition: 'color 0.2s', textAlign: 'left' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.90)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>Get Started</h4>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.50)', marginBottom: 20 }}>
              Register your organisation's interest in the RemitMatch pilot.
            </p>
            <button className="btn-primary" onClick={onPilot} style={{ height: 42, padding: '0 18px', fontSize: 14 }}>
              Request a Pilot
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>© 2026 RemitMatch. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {['Privacy Policy','Terms of Use','Cookie Policy'].map(l => (
              <a key={l} href="#" onClick={e => e.preventDefault()}
                style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.70)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid > :first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const openPilot  = useCallback(() => setModalOpen(true), [])
  const closePilot = useCallback(() => setModalOpen(false), [])
  useScrollReveal()

  return (
    <>
      <Navbar    onPilot={openPilot} />
      <main>
        <Hero      onPilot={openPilot} />
        <Benefits />
        <About />
        <Platform />
        <HowItWorks />
        <Market />
        <Pricing   onPilot={openPilot} />
        <FAQ />
        <PilotCTA  onPilot={openPilot} />
      </main>
      <Footer    onPilot={openPilot} />
      <PilotModal open={modalOpen} onClose={closePilot} />
    </>
  )
}

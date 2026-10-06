import { useState, useEffect, useRef } from 'react'

// ─── Utility: Scroll Reveal Hook ────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Icons (inline SVG components) ──────────────────────────────────────────
const Icon = {
  CheckCircle: ({ cls = 'w-5 h-5' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Lightning: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Search: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/>
    </svg>
  ),
  Shield: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
    </svg>
  ),
  TrendUp: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
    </svg>
  ),
  FileText: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
  ),
  Upload: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
    </svg>
  ),
  ArrowRight: ({ cls = 'w-5 h-5' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
    </svg>
  ),
  ArrowDown: ({ cls = 'w-5 h-5' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
    </svg>
  ),
  Chart: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
    </svg>
  ),
  Scale: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
    </svg>
  ),
  Clipboard: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
    </svg>
  ),
  Building: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
    </svg>
  ),
  Clock: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/>
    </svg>
  ),
  Users: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  Menu: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  ),
  X: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  ),
  Check: ({ cls = 'w-5 h-5' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
    </svg>
  ),
  Minus: ({ cls = 'w-5 h-5' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"/>
    </svg>
  ),
  AlertTriangle: ({ cls = 'w-5 h-5' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
    </svg>
  ),
  Star: ({ cls = 'w-5 h-5' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  Lock: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  ),
  Database: ({ cls = 'w-6 h-6' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path strokeLinecap="round" d="M21 12c0 1.657-4.03 3-9 3S3 13.657 3 12"/><path strokeLinecap="round" d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5"/>
    </svg>
  ),
  Mail: ({ cls = 'w-5 h-5' }) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  ),
  RM: () => (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-sm">
        <span className="text-white font-bold text-sm leading-none">RM</span>
      </div>
      <span className="font-bold text-xl tracking-tight text-navy-900">
        Remit<span className="text-teal-500">Match</span>
      </span>
    </div>
  ),
}

// ─── Status Chips ────────────────────────────────────────────────────────────
const StatusChip = ({ status }) => {
  const map = {
    Reconciled:   'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Flagged:      'bg-red-50 text-red-700 border border-red-200',
    'Under Review': 'bg-amber-50 text-amber-700 border border-amber-200',
    Resolved:     'bg-teal-50 text-teal-700 border border-teal-200',
    Draft:        'bg-slate-100 text-slate-600 border border-slate-200',
    Submitted:    'bg-blue-50 text-blue-700 border border-blue-200',
    Matched:      'bg-emerald-50 text-emerald-700 border border-emerald-200',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] || 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
      {status}
    </span>
  )
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────
function Navbar({ onPilotClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Platform', href: '#platform' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Market', href: '#market' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = ['home','about','platform','how-it-works','market','pricing','faq']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'}`}
      role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home') }} className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#157a7f] to-[#0f4e52] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm leading-none">RM</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-[#0d1630]">
              Remit<span className="text-[#157a7f]">Match</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
                  ${activeSection === link.href.slice(1)
                    ? 'text-[#157a7f] bg-teal-50'
                    : 'text-slate-600 hover:text-[#0d1630] hover:bg-slate-50'}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={onPilotClick}
              className="px-5 py-2.5 bg-[#157a7f] hover:bg-[#126468] text-white font-semibold text-sm rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              aria-label="Request a Pilot"
            >
              Request a Pilot
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-slate-600 hover:text-[#0d1630] hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <Icon.X cls="w-6 h-6" /> : <Icon.Menu cls="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${activeSection === link.href.slice(1)
                    ? 'text-[#157a7f] bg-teal-50'
                    : 'text-slate-700 hover:bg-slate-50'}`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 pb-1">
              <button
                onClick={() => { setMobileOpen(false); onPilotClick() }}
                className="w-full px-4 py-3 bg-[#157a7f] hover:bg-[#126468] text-white font-semibold text-sm rounded-lg transition-all duration-200"
              >
                Request a Pilot
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── HERO ───────────────────────────────────────────────────────────────────
function Hero({ onPilotClick }) {
  const [activeTab, setActiveTab] = useState(0)

  const invoiceRows = [
    { id: 'INV-2026-0847', commissioner: 'Local Authority A', issue: 'Missing Payment', expected: '£1,600', received: '£0', status: 'Flagged' },
    { id: 'INV-2026-0923', commissioner: 'Local Authority B', issue: 'Rate Difference', expected: '£180', received: '£150', status: 'Flagged' },
    { id: 'INV-2026-0951', commissioner: 'NHS ICB', issue: 'Matched', expected: '£240', received: '£240', status: 'Reconciled' },
    { id: 'INV-2026-0834', commissioner: 'Local Authority A', issue: 'Partial Payment', expected: '£420', received: '£380', status: 'Under Review' },
    { id: 'INV-2026-0790', commissioner: 'NHS ICB', issue: 'Matched', expected: '£310', received: '£310', status: 'Reconciled' },
  ]

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden bg-gradient-to-br from-[#0d1630] via-[#132044] to-[#0f4e52]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-48 w-[600px] h-[600px] bg-teal-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Headline */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-500/20 border border-teal-400/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
              <span className="text-teal-300 text-xs font-semibold tracking-wide uppercase">Built for UK Care Providers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
              Every Invoice<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-400">Matched.</span>
              <br />Every Underpayment<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-400">Found.</span>
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
              RemitMatch automates Local Authority and NHS remittance reconciliation for UK care providers — matching payments to invoices, validating commissioner rates, identifying discrepancies and creating evidence-ready disputes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={onPilotClick}
                className="px-7 py-3.5 bg-[#157a7f] hover:bg-[#1a9ba1] text-white font-semibold text-base rounded-xl transition-all duration-200 shadow-lg shadow-teal-900/40 hover:shadow-teal-700/50 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
              >
                Request a Pilot
              </button>
              <a
                href="#how-it-works"
                onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-base rounded-xl transition-all duration-200 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                See How It Works
              </a>
            </div>

            <p className="text-slate-400 text-sm font-medium">
              Built for UK domiciliary care and support-service providers.
            </p>
          </div>

          {/* Right: Dashboard mock-up */}
          <div className="lg:pl-4">
            <div className="bg-[#0a0f1e]/80 border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden backdrop-blur-sm">
              {/* Dashboard header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#132044] border-b border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                <div className="flex gap-1 ml-4 overflow-x-auto no-scrollbar">
                  {['Dashboard', 'Invoices', 'Disputes'].map((t, i) => (
                    <button key={t} onClick={() => setActiveTab(i)}
                      className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${activeTab === i ? 'bg-[#157a7f] text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4">
                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                  {[
                    { label: 'Outstanding', value: '£47,500', sub: '127 invoices', color: 'text-white' },
                    { label: 'Open Disputes', value: '3', sub: 'This period', color: 'text-amber-400' },
                    { label: 'Disputed Value', value: '£4,050', sub: 'Awaiting review', color: 'text-red-400' },
                    { label: 'Resolved', value: '£12,300', sub: 'This month', color: 'text-emerald-400' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/5 border border-white/8 rounded-xl p-3">
                      <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wide mb-1">{s.label}</p>
                      <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-slate-500 text-[10px]">{s.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Reconciliation progress */}
                <div className="bg-white/5 border border-white/8 rounded-xl p-3 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300 text-xs font-semibold">Reconciliation Status</span>
                    <span className="text-emerald-400 text-sm font-bold">98%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-400 h-2 rounded-full" style={{ width: '98%' }} />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-slate-500 text-[10px]">196 of 200 invoices matched</span>
                    <span className="text-slate-400 text-[10px]">4 flagged</span>
                  </div>
                </div>

                {/* Invoice table */}
                <div className="bg-white/5 border border-white/8 rounded-xl overflow-hidden">
                  <div className="px-3 py-2 border-b border-white/8">
                    <span className="text-slate-300 text-xs font-semibold">Recent Reconciliation</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-white/5">
                          {['Invoice', 'Commissioner', 'Expected', 'Received', 'Status'].map(h => (
                            <th key={h} className="px-3 py-2 text-left text-slate-500 font-medium text-[10px] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceRows.map((row, i) => (
                          <tr key={row.id} className={`border-b border-white/5 last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                            <td className="px-3 py-2 text-slate-300 font-mono font-medium text-[10px]">{row.id}</td>
                            <td className="px-3 py-2 text-slate-400 text-[10px]">{row.commissioner}</td>
                            <td className="px-3 py-2 text-slate-300 font-medium text-[10px]">{row.expected}</td>
                            <td className={`px-3 py-2 font-medium text-[10px] ${row.status === 'Reconciled' ? 'text-emerald-400' : row.status === 'Flagged' ? 'text-red-400' : 'text-amber-400'}`}>{row.received}</td>
                            <td className="px-3 py-2">
                              <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-semibold
                                ${row.status === 'Reconciled' ? 'bg-emerald-900/50 text-emerald-300' :
                                  row.status === 'Flagged' ? 'bg-red-900/50 text-red-300' :
                                  'bg-amber-900/50 text-amber-300'}`}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── BENEFIT CARDS ───────────────────────────────────────────────────────────
function Benefits() {
  const cards = [
    { icon: <Icon.Lightning cls="w-6 h-6" />, title: 'Match Payments Faster', text: 'Automatically reconcile bulk commissioner remittances against individual invoices.', color: 'text-[#157a7f]', bg: 'bg-teal-50' },
    { icon: <Icon.Search cls="w-6 h-6" />, title: 'Detect Underpayments', text: 'Flag missing invoices, short payments and incorrect commissioner rates.', color: 'text-red-600', bg: 'bg-red-50' },
    { icon: <Icon.Shield cls="w-6 h-6" />, title: 'Build Better Evidence', text: 'Turn reconciliation discrepancies into structured dispute evidence packs.', color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: <Icon.TrendUp cls="w-6 h-6" />, title: 'Improve Cash-Flow Visibility', text: 'Track outstanding invoices, disputes, recoveries and commissioner-level reconciliation from one place.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div key={card.title}
              className={`reveal reveal-delay-${i + 1} group p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
              <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {card.icon}
              </div>
              <h3 className="font-bold text-[#0d1630] text-base mb-2">{card.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{card.text}</p>
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
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="reveal text-center mb-16">
          <span className="inline-block px-3 py-1 bg-teal-100 text-[#157a7f] text-xs font-bold uppercase tracking-widest rounded-full mb-4">About RemitMatch</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1630] max-w-3xl mx-auto leading-tight">
            Turning Complex Commissioner Payments Into Financial Clarity
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
          <div className="reveal">
            <p className="text-slate-600 text-base leading-relaxed mb-5">
              UK care providers can issue dozens or hundreds of invoices each month while receiving bulk payments from multiple Local Authorities and NHS commissioners.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-5">
              Finance teams may then need to manually determine which invoices were included, whether the correct commissioner rate was applied and whether any payments are missing or incomplete.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              The traditional process may involve invoice CSV exports, commissioner remittance PDFs, Excel spreadsheets, manual calculations, rate schedules, email threads and repeated cross-checking.
            </p>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <p className="font-semibold text-[#0d1630] mb-4 text-sm uppercase tracking-wide">Traditional manual reconciliation involves:</p>
              <ul className="space-y-2.5">
                {['Invoice CSV exports', 'Commissioner remittance PDFs', 'Excel spreadsheets', 'Manual rate calculations', 'Rate schedule cross-checking', 'Email threads', 'Repeated manual verification'].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="mt-0.5 text-red-400 flex-shrink-0"><Icon.AlertTriangle cls="w-4 h-4" /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="bg-gradient-to-br from-[#0d1630] to-[#0f4e52] rounded-2xl p-8 text-white mb-6 shadow-xl">
              <p className="text-teal-300 text-xs font-bold uppercase tracking-widest mb-3">Core Positioning</p>
              <p className="text-xl font-bold leading-snug mb-4">
                "RemitMatch creates a specialised reconciliation layer between a provider's existing invoicing workflow and the remittances received from commissioners."
              </p>
              <div className="w-12 h-0.5 bg-teal-400 mb-4" />
              <p className="text-slate-300 text-sm leading-relaxed">
                It is not a replacement for care-management software, accounting platforms or invoicing tools — it is designed to complement them.
              </p>
            </div>

            {/* Before vs After */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-red-100 rounded-2xl p-5 shadow-sm">
                <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-4 flex items-center gap-1">
                  <Icon.X cls="w-3.5 h-3.5" /> Without RemitMatch
                </p>
                <ul className="space-y-2.5">
                  {['Issued Invoices', 'Bulk Commissioner Payment', 'Manual Spreadsheet Matching', 'Manual Rate Checking', 'Underpayments Potentially Missed', 'Evidence Collected Manually', 'Email-Based Dispute Tracking'].map((step, i) => (
                    <li key={step} className="flex flex-col items-center text-center">
                      <span className="text-[11px] text-slate-600 leading-tight">{step}</span>
                      {i < 6 && <span className="text-slate-300 text-xs mt-1">↓</span>}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-4 flex items-center gap-1">
                  <Icon.Check cls="w-3.5 h-3.5" /> With RemitMatch
                </p>
                <ul className="space-y-2.5">
                  {['Invoice Data + Commissioner Remittance', 'Automated Parsing', 'Invoice Matching', 'Rate Validation', 'Discrepancy Detection', 'Evidence Generation', 'Resolution Tracking'].map((step, i) => (
                    <li key={step} className="flex flex-col items-center text-center">
                      <span className="text-[11px] text-emerald-700 font-medium leading-tight">{step}</span>
                      {i < 6 && <span className="text-emerald-300 text-xs mt-1">↓</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Founder section */}
        <div className="reveal border-t border-slate-200 pt-16">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-teal-100 text-[#157a7f] text-xs font-bold uppercase tracking-widest rounded-full mb-4">The Founder</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1630]">
              Built From First-Hand Care and Financial Experience
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#132044] to-[#157a7f] flex items-center justify-center shadow-lg mb-3">
                  <span className="text-white text-3xl font-extrabold tracking-tight">HR</span>
                </div>
                <p className="font-bold text-[#0d1630] text-center text-sm">Hetal Rokad</p>
                <p className="text-[#157a7f] text-xs text-center font-medium">Founder &amp; Managing Director</p>
              </div>

              {/* Bio */}
              <div className="flex-1">
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  RemitMatch is founded by Hetal Rokad, whose background combines direct UK care-sector experience with financial-services and business-management expertise. Her professional experience provides an understanding of the operational pressures faced by care providers, while her financial background supports RemitMatch's focus on reconciliation, payment accuracy and financial visibility.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'More than 3 years of UK care-sector experience',
                    'Care Assistant — Helping Hands',
                    'Branch Sales Executive — IndusInd Bank',
                    'MBA in Business Management & Finance, University of West London',
                    'Bachelor of Commerce, Saurashtra University',
                  ].map(item => (
                    <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-[#157a7f] mt-0.5 flex-shrink-0"><Icon.CheckCircle cls="w-4 h-4" /></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PLATFORM ────────────────────────────────────────────────────────────────
function Platform() {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState('Dashboard')
  const showcaseTabs = ['Dashboard', 'Invoices', 'Remittances', 'Reconciliation', 'Disputes', 'Commissioners', 'Reports']

  const modules = [
    {
      icon: <Icon.Upload cls="w-6 h-6" />,
      title: 'Invoice Ingestion',
      desc: 'Import issued invoice data from existing care-management or accounting workflows.',
      points: ['CSV import', 'Structured invoice data', 'Validation before reconciliation', 'Designed to complement existing systems', 'No full software migration required'],
      color: 'text-[#157a7f]', bg: 'bg-teal-50',
    },
    {
      icon: <Icon.FileText cls="w-6 h-6" />,
      title: 'Multi-Format Remittance Parsing',
      desc: 'Convert commissioner remittance documents into structured payment lines.',
      points: ['PDF processing', 'CSV import', 'Excel files', 'Commissioner portal exports'],
      color: 'text-blue-600', bg: 'bg-blue-50',
    },
    {
      icon: <Icon.Lightning cls="w-6 h-6" />,
      title: 'Automated Invoice Matching',
      desc: 'Automatically match individual payment lines from bulk remittances to the invoices they were intended to settle.',
      points: ['Invoice number matching', 'Service-user ID', 'Date matching', 'Amount reconciliation'],
      color: 'text-violet-600', bg: 'bg-violet-50',
    },
    {
      icon: <Icon.Database cls="w-6 h-6" />,
      title: 'Commissioner Rate Library',
      desc: 'Maintain commissioner-specific pricing information in one structured rate library.',
      points: ['Base rates', 'Uplift rules', 'Commissioner-specific rates', 'Rate changes', 'Historical rate versions'],
      color: 'text-amber-600', bg: 'bg-amber-50',
    },
    {
      icon: <Icon.Scale cls="w-6 h-6" />,
      title: 'Automatic Rate Validation',
      desc: 'Validate matched payments against the applicable commissioner rate and agreed uplift rules.',
      points: ['Incorrect base rate detection', 'Missing uplift flags', 'Old rate identification', 'Partial payment detection', 'Rate mismatch alerts'],
      color: 'text-orange-600', bg: 'bg-orange-50',
    },
    {
      icon: <Icon.Search cls="w-6 h-6" />,
      title: 'Underpayment & Discrepancy Detection',
      desc: 'Automatically surface invoices that do not reconcile correctly.',
      points: ['Missing invoices', 'Underpayments', 'Short payments', 'Incorrect rates', 'Partial payments'],
      color: 'text-red-600', bg: 'bg-red-50',
    },
    {
      icon: <Icon.Shield cls="w-6 h-6" />,
      title: 'Evidence-Ready Dispute Packs',
      desc: 'Organise the financial evidence required to support payment disputes.',
      points: ['Original invoice details', 'Commissioner details', 'Applicable rate', 'Expected vs actual payment', 'Shortfall calculation', 'Exportable evidence pack'],
      color: 'text-emerald-600', bg: 'bg-emerald-50',
    },
    {
      icon: <Icon.Clipboard cls="w-6 h-6" />,
      title: 'Dispute Resolution Tracking',
      desc: 'Track discrepancies and disputes from identification through to resolution.',
      points: ['Draft → Submitted → Under Review → Resolved', 'Commissioner tracking', 'Amount tracking', 'Date submitted', 'Recovered amount'],
      color: 'text-[#157a7f]', bg: 'bg-teal-50',
    },
    {
      icon: <Icon.Chart cls="w-6 h-6" />,
      title: 'Reconciliation Dashboard',
      desc: 'Gain visibility across invoices, remittances, commissioners and disputes.',
      points: ['Outstanding invoices', 'Reconciled payments', 'Open disputes', 'Disputed value', 'Recovered amounts', 'Commissioner comparison'],
      color: 'text-blue-600', bg: 'bg-blue-50',
    },
    {
      icon: <Icon.FileText cls="w-6 h-6" />,
      title: 'Reporting & Export',
      desc: 'Review reconciliation performance and export information for financial review.',
      points: ['Monthly reconciliation summary', 'Dispute volume', 'Recovered amount', 'Commissioner comparison', 'CSV and PDF export'],
      color: 'text-violet-600', bg: 'bg-violet-50',
    },
    {
      icon: <Icon.Lock cls="w-6 h-6" />,
      title: 'Complete Audit Trail',
      desc: 'Maintain timestamped records of reconciliation activity, discrepancies, disputes and resolution outcomes.',
      points: ['Full accountability', 'Traceability', 'Financial record keeping', 'Audit readiness'],
      color: 'text-slate-600', bg: 'bg-slate-50',
    },
  ]

  const disputeRows = [
    { id: 'DIS-001', commissioner: 'Local Authority A', amount: '£1,600', date: '01 Oct 2026', status: 'Under Review', recovered: '—' },
    { id: 'DIS-002', commissioner: 'Local Authority B', amount: '£150', date: '29 Sep 2026', status: 'Submitted', recovered: '—' },
    { id: 'DIS-003', commissioner: 'NHS ICB', amount: '£2,300', date: '15 Sep 2026', status: 'Resolved', recovered: '£2,300' },
  ]

  return (
    <section id="platform" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-16">
          <span className="inline-block px-3 py-1 bg-teal-100 text-[#157a7f] text-xs font-bold uppercase tracking-widest rounded-full mb-4">Platform</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1630] mb-4">
            One Reconciliation Workflow.<br className="hidden sm:block" /> From Remittance to Resolution.
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
            RemitMatch combines invoice ingestion, remittance parsing, automated matching, commissioner-specific rate validation, discrepancy detection and dispute evidence generation into one structured workflow.
          </p>
        </div>

        {/* Platform modules grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {modules.map((mod, i) => (
            <div key={mod.title}
              className={`reveal reveal-delay-${(i % 4) + 1} group p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
              <div className={`w-11 h-11 ${mod.bg} ${mod.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {mod.icon}
              </div>
              <h3 className="font-bold text-[#0d1630] text-base mb-2">{mod.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{mod.desc}</p>
              <ul className="space-y-1.5">
                {mod.points.map(p => (
                  <li key={p} className="flex items-start gap-2 text-xs text-slate-500">
                    <span className="text-[#157a7f] mt-0.5 flex-shrink-0"><Icon.CheckCircle cls="w-3.5 h-3.5" /></span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Platform showcase */}
        <div className="reveal bg-gradient-to-br from-[#0d1630] to-[#132044] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <div className="p-4 border-b border-white/10">
            <div className="flex flex-wrap gap-1.5">
              {showcaseTabs.map(tab => (
                <button key={tab} onClick={() => setActiveShowcaseTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200
                    ${activeShowcaseTab === tab ? 'bg-[#157a7f] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                  aria-pressed={activeShowcaseTab === tab}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 lg:p-8">
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
              {[
                { label: 'Outstanding Invoices', value: '£47,500', color: 'text-white' },
                { label: 'Open Disputes', value: '3', color: 'text-amber-400' },
                { label: 'Disputed Value', value: '£4,050', color: 'text-red-400' },
                { label: 'Resolved This Month', value: '£12,300', color: 'text-emerald-400' },
                { label: 'Reconciliation', value: '98%', color: 'text-teal-300' },
              ].map(s => (
                <div key={s.label} className="bg-white/5 border border-white/8 rounded-xl p-4 text-center">
                  <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
                  <p className="text-slate-400 text-[11px] font-medium mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Charts area */}
            <div className="grid lg:grid-cols-3 gap-5 mb-6">
              {/* Payment reconciliation chart */}
              <div className="lg:col-span-2 bg-white/5 border border-white/8 rounded-2xl p-5">
                <p className="text-slate-300 text-xs font-semibold mb-4">Payment Reconciliation — Last 6 Months</p>
                <div className="flex items-end gap-3 h-32">
                  {[
                    { month: 'May', reconciled: 85, disputed: 12 },
                    { month: 'Jun', reconciled: 90, disputed: 8 },
                    { month: 'Jul', reconciled: 88, disputed: 10 },
                    { month: 'Aug', reconciled: 92, disputed: 6 },
                    { month: 'Sep', reconciled: 95, disputed: 4 },
                    { month: 'Oct', reconciled: 98, disputed: 2 },
                  ].map(d => (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex gap-0.5 items-end" style={{ height: '96px' }}>
                        <div className="flex-1 bg-[#157a7f] rounded-t-sm" style={{ height: `${d.reconciled}%` }} title={`Reconciled: ${d.reconciled}%`} />
                        <div className="flex-1 bg-red-500/60 rounded-t-sm" style={{ height: `${d.disputed}%` }} title={`Disputed: ${d.disputed}%`} />
                      </div>
                      <span className="text-slate-500 text-[9px]">{d.month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-3">
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#157a7f]" /><span className="text-slate-400 text-[10px]">Reconciled</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-500/60" /><span className="text-slate-400 text-[10px]">Disputed</span></div>
                </div>
              </div>

              {/* Dispute status donut */}
              <div className="bg-white/5 border border-white/8 rounded-2xl p-5">
                <p className="text-slate-300 text-xs font-semibold mb-4">Dispute Status</p>
                <div className="flex items-center justify-center mb-4">
                  <svg viewBox="0 0 80 80" className="w-24 h-24">
                    <circle cx="40" cy="40" r="28" fill="none" stroke="#1e3570" strokeWidth="14" />
                    <circle cx="40" cy="40" r="28" fill="none" stroke="#157a7f" strokeWidth="14" strokeDasharray="88 88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 40 40)" />
                    <circle cx="40" cy="40" r="28" fill="none" stroke="#f59e0b" strokeWidth="14" strokeDasharray="44 132" strokeDashoffset="-88" strokeLinecap="round" transform="rotate(-90 40 40)" />
                    <circle cx="40" cy="40" r="28" fill="none" stroke="#ef4444" strokeWidth="14" strokeDasharray="22 154" strokeDashoffset="-132" strokeLinecap="round" transform="rotate(-90 40 40)" />
                    <text x="40" y="44" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3</text>
                  </svg>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Resolved', count: 2, color: 'bg-[#157a7f]' },
                    { label: 'Under Review', count: 1, color: 'bg-amber-500' },
                    { label: 'Submitted', count: 0, color: 'bg-red-500' },
                  ].map(d => (
                    <div key={d.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${d.color}`} />
                        <span className="text-slate-400 text-[11px]">{d.label}</span>
                      </div>
                      <span className="text-slate-300 text-[11px] font-semibold">{d.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dispute table */}
            <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/8 flex items-center justify-between">
                <span className="text-slate-300 text-xs font-semibold">Active Disputes</span>
                <span className="text-[#157a7f] text-xs font-medium">View All</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['Dispute ID', 'Commissioner', 'Amount', 'Submitted', 'Status', 'Recovered'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-slate-500 font-medium text-xs uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {disputeRows.map(row => (
                      <tr key={row.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                        <td className="px-5 py-3.5 text-slate-300 font-mono text-xs">{row.id}</td>
                        <td className="px-5 py-3.5 text-slate-400 text-xs">{row.commissioner}</td>
                        <td className="px-5 py-3.5 text-white font-semibold text-xs">{row.amount}</td>
                        <td className="px-5 py-3.5 text-slate-400 text-xs">{row.date}</td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold
                            ${row.status === 'Resolved' ? 'bg-emerald-900/50 text-emerald-300' :
                              row.status === 'Under Review' ? 'bg-amber-900/50 text-amber-300' :
                              'bg-blue-900/50 text-blue-300'}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className={`px-5 py-3.5 text-xs font-semibold ${row.recovered !== '—' ? 'text-emerald-400' : 'text-slate-500'}`}>{row.recovered}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── HOW IT WORKS ────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Import Your Invoices', text: 'Export issued invoices from your existing care-management or accounting workflow and upload the data to RemitMatch.', icon: <Icon.Upload cls="w-7 h-7" /> },
    { num: '02', title: 'Upload the Remittance', text: 'Upload the Local Authority or NHS remittance in a supported format such as PDF, CSV, Excel or commissioner portal export.', icon: <Icon.FileText cls="w-7 h-7" /> },
    { num: '03', title: 'RemitMatch Reconciles', text: 'The system structures the remittance, matches payment lines to invoices and validates the applicable commissioner rates.', icon: <Icon.Lightning cls="w-7 h-7" /> },
    { num: '04', title: 'Review Discrepancies', text: 'Missing invoices, underpayments, partial payments and incorrect rates are highlighted for review.', icon: <Icon.Search cls="w-7 h-7" /> },
    { num: '05', title: 'Generate Evidence & Track Resolution', text: 'Prepare structured evidence for flagged discrepancies and track each dispute through its resolution lifecycle.', icon: <Icon.Clipboard cls="w-7 h-7" /> },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-16">
          <span className="inline-block px-3 py-1 bg-teal-100 text-[#157a7f] text-xs font-bold uppercase tracking-widest rounded-full mb-4">How It Works</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1630] mb-4">
            From Bulk Remittance to Clear Reconciliation
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Five structured steps from invoice import to dispute resolution.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-14 left-[calc(10%+28px)] right-[calc(10%+28px)] h-0.5 bg-gradient-to-r from-slate-200 via-[#157a7f]/30 to-slate-200" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <div key={step.num} className={`reveal reveal-delay-${Math.min(i + 1, 4)} flex flex-col items-center text-center`}>
                <div className="relative mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#157a7f] to-[#0f4e52] flex items-center justify-center text-white shadow-lg shadow-teal-900/20 hover:scale-110 transition-transform duration-200">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#0d1630] border-2 border-white flex items-center justify-center">
                    <span className="text-white text-[9px] font-bold">{step.num.slice(1)}</span>
                  </div>
                </div>
                <h3 className="font-bold text-[#0d1630] text-sm mb-2 leading-snug">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow visual */}
        <div className="reveal mt-20 bg-gradient-to-br from-[#0d1630] to-[#132044] rounded-3xl p-8 lg:p-12 shadow-xl border border-white/10">
          <p className="text-teal-300 text-xs font-bold uppercase tracking-widest text-center mb-8">Reconciliation Workflow</p>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-0 flex-wrap lg:flex-nowrap">
            {[
              { label: 'Issued Invoices', sub: 'Care provider', color: 'bg-white/10 border-white/20', text: 'text-white' },
              { label: '+', sub: '', color: 'bg-transparent border-transparent', text: 'text-teal-400', isOp: true },
              { label: 'Commissioner Remittance', sub: 'LA / NHS ICB', color: 'bg-white/10 border-white/20', text: 'text-white' },
              { label: '→', sub: '', color: 'bg-transparent border-transparent', text: 'text-slate-400', isOp: true },
              { label: 'Parse', sub: '', color: 'bg-teal-900/50 border-teal-700/50', text: 'text-teal-200' },
              { label: '→', sub: '', color: 'bg-transparent border-transparent', text: 'text-slate-400', isOp: true },
              { label: 'Match', sub: '', color: 'bg-teal-900/50 border-teal-700/50', text: 'text-teal-200' },
              { label: '→', sub: '', color: 'bg-transparent border-transparent', text: 'text-slate-400', isOp: true },
              { label: 'Validate', sub: '', color: 'bg-teal-900/50 border-teal-700/50', text: 'text-teal-200' },
              { label: '→', sub: '', color: 'bg-transparent border-transparent', text: 'text-slate-400', isOp: true },
              { label: 'Flag', sub: '', color: 'bg-red-900/40 border-red-700/40', text: 'text-red-300' },
              { label: '→', sub: '', color: 'bg-transparent border-transparent', text: 'text-slate-400', isOp: true },
              { label: 'Evidence', sub: '', color: 'bg-amber-900/40 border-amber-700/40', text: 'text-amber-300' },
              { label: '→', sub: '', color: 'bg-transparent border-transparent', text: 'text-slate-400', isOp: true },
              { label: 'Resolution', sub: '', color: 'bg-emerald-900/40 border-emerald-700/40', text: 'text-emerald-300' },
            ].map((item, i) => (
              item.isOp
                ? <div key={i} className="text-teal-400 font-bold text-lg lg:text-xl px-1">{item.label}</div>
                : (
                  <div key={i} className={`border rounded-xl px-4 py-3 text-center ${item.color}`}>
                    <p className={`font-bold text-xs lg:text-sm ${item.text}`}>{item.label}</p>
                    {item.sub && <p className="text-slate-500 text-[10px] mt-0.5">{item.sub}</p>}
                  </div>
                )
            ))}
          </div>
        </div>

        {/* Example Scenario */}
        <div className="reveal mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1630]">See the Difference</h2>
            <p className="text-slate-500 text-sm mt-2">An illustrative scenario based on the RemitMatch use case.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-10 shadow-sm">
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-center border border-slate-200">
              <p className="text-slate-500 text-sm mb-2">Scenario: A provider receives a</p>
              <p className="text-3xl font-extrabold text-[#0d1630] mb-1">£47,500</p>
              <p className="text-slate-500 text-sm">commissioner remittance covering <strong>200+ invoices</strong></p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Without */}
              <div className="border border-red-100 rounded-2xl p-6 bg-red-50/30">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-7 h-7 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0">
                    <Icon.X cls="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-[#0d1630] text-base">Without RemitMatch</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Finance staff manually compare invoice exports and remittance information',
                    'Several hours may be spent reconciling transactions',
                    'Two missing invoices total £3,200 — potentially undetected',
                    'Two invoices contain £850 of underpayments — potentially undetected',
                    { highlight: true, text: 'Total discrepancy: £4,050 — potentially missed' },
                  ].map((item, i) => (
                    <li key={i} className={`flex items-start gap-2.5 text-sm ${typeof item === 'object' ? 'font-semibold text-red-600' : 'text-slate-600'}`}>
                      <span className="text-red-400 mt-0.5 flex-shrink-0"><Icon.AlertTriangle cls="w-4 h-4" /></span>
                      {typeof item === 'object' ? item.text : item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* With */}
              <div className="border border-emerald-100 rounded-2xl p-6 bg-emerald-50/30">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Icon.Check cls="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-[#0d1630] text-base">With RemitMatch</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Import invoice information',
                    'Upload remittance',
                    'Automatically structure payment data',
                    'Match payments to invoices',
                    'Validate rates',
                    { highlight: true, text: '£4,050 of discrepancies identified and flagged' },
                    'Generate supporting evidence',
                    'Review discrepancy within the same workflow',
                  ].map((item, i) => (
                    <li key={i} className={`flex items-start gap-2.5 text-sm ${typeof item === 'object' ? 'font-semibold text-emerald-700' : 'text-slate-600'}`}>
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0"><Icon.CheckCircle cls="w-4 h-4" /></span>
                      {typeof item === 'object' ? item.text : item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-400 mt-4 italic">Note: Recovery of any discrepancy is not guaranteed. RemitMatch supports the identification and evidence process.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── MARKET ──────────────────────────────────────────────────────────────────
function Market() {
  const stats = [
    { value: '15,232', label: 'CQC-regulated domiciliary care providers', desc: 'Total regulated providers in the UK market' },
    { value: '£679m', label: 'Reported owed to care providers', desc: 'Outstanding more than 30 days late' },
    { value: '9,900', label: 'Estimated serviceable SME-provider market', desc: 'Core target market for RemitMatch' },
    { value: '2–5+', label: 'Typical commissioners per provider', desc: 'Local Authorities and NHS ICBs' },
  ]

  const secondaryMarkets = [
    { title: 'Supported Living Providers', text: 'Providers working under similar commissioned-care structures represent a natural expansion opportunity.', tag: 'Adjacent' },
    { title: 'Care-Sector Accountancy Practices', text: 'Accountancy firms serving multiple care providers can potentially use RemitMatch as a multi-client reconciliation service.', tag: 'Partner Opportunity' },
    { title: 'Residential Care', text: 'A future expansion opportunity with related but different invoicing and commissioner reconciliation structures.', tag: 'Future' },
    { title: 'Community & Domiciliary Nursing', text: 'A potential adjacent use case involving NHS and commissioned healthcare remittance reconciliation.', tag: 'Future' },
  ]

  const differentiators = [
    { feature: 'Invoice data', accounting: true, care: true, remit: true },
    { feature: 'Bulk remittance parsing', accounting: 'Limited', care: 'Limited', remit: true },
    { feature: 'Invoice-to-payment matching', accounting: 'Limited', care: 'Limited', remit: true },
    { feature: 'Commissioner rate validation', accounting: false, care: 'Limited', remit: true },
    { feature: 'Missing invoice detection', accounting: false, care: false, remit: true },
    { feature: 'Underpayment detection', accounting: 'Limited', care: 'Limited', remit: true },
    { feature: 'Evidence pack generation', accounting: false, care: false, remit: true },
    { feature: 'Dispute tracking', accounting: false, care: false, remit: true },
  ]

  const CellIcon = ({ val }) => {
    if (val === true) return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600"><Icon.Check cls="w-3.5 h-3.5" /></span>
    if (val === false) return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400"><Icon.Minus cls="w-3.5 h-3.5" /></span>
    return <span className="text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{val}</span>
  }

  return (
    <section id="market" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-16">
          <span className="inline-block px-3 py-1 bg-teal-100 text-[#157a7f] text-xs font-bold uppercase tracking-widest rounded-full mb-4">Market</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1630] mb-4">
            Built Specifically for the UK Care-Commissioning Environment
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
            RemitMatch is designed around the structure of UK commissioned care, where providers work with multiple commissioners — each with different remittance formats, rates, uplift rules, payment schedules and reporting processes.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {stats.map((s, i) => (
            <div key={s.label} className={`reveal reveal-delay-${i + 1} bg-gradient-to-br from-[#0d1630] to-[#132044] rounded-2xl p-6 text-center border border-white/10 shadow-lg`}>
              <p className="text-3xl font-extrabold text-white mb-2">{s.value}</p>
              <p className="text-teal-300 text-xs font-semibold mb-1">{s.label}</p>
              <p className="text-slate-400 text-xs">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="reveal text-center text-xs text-slate-400 mb-16 italic">Market figures reflect the research and assumptions used within the RemitMatch business plan.</p>

        {/* Primary customer profile */}
        <div className="reveal mb-16">
          <h3 className="text-xl font-bold text-[#0d1630] mb-6 text-center">Primary Target Customer</h3>
          <div className="bg-gradient-to-br from-slate-50 to-teal-50 border border-teal-100 rounded-3xl p-8 lg:p-10 shadow-sm">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#157a7f] to-[#0f4e52] rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                <Icon.Building cls="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#0d1630] text-lg">SME Domiciliary Care Providers</h4>
                <p className="text-slate-500 text-sm">The core RemitMatch target market</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Staff Range', value: '5–50', sub: 'Typically 10–30' },
                { label: 'Annual Turnover', value: '£500k–£5m', sub: 'Estimated range' },
                { label: 'Commissioners', value: '2–5+', sub: 'Local Authorities & NHS ICBs' },
                { label: 'Monthly Invoices', value: '50–500+', sub: 'Depending on size' },
                { label: 'Finance Function', value: '1–2 people', sub: 'Often small team' },
                { label: 'Current Method', value: 'Manual / Spreadsheet', sub: 'Frequently' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <p className="text-xs text-slate-400 font-medium mb-1">{stat.label}</p>
                  <p className="font-bold text-[#0d1630] text-base">{stat.value}</p>
                  <p className="text-[11px] text-slate-400">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="font-semibold text-[#0d1630] text-sm mb-3">Key Pain Points</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {[
                  'Underpayments may go undetected',
                  'Manual reconciliation takes time',
                  'Multiple commissioner formats',
                  'Rate complexity',
                  'Difficult dispute preparation',
                  'Limited cash-flow visibility',
                  'Fragmented financial records',
                ].map(pain => (
                  <div key={pain} className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    <span className="text-red-400 mt-0.5 flex-shrink-0"><Icon.AlertTriangle cls="w-3.5 h-3.5" /></span>
                    <span className="text-red-700 text-xs font-medium">{pain}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Secondary markets */}
        <div className="reveal mb-16">
          <h3 className="text-xl font-bold text-[#0d1630] mb-6 text-center">Secondary & Future Market Opportunities</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {secondaryMarkets.map(m => (
              <div key={m.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-[#0d1630] text-sm leading-snug pr-2">{m.title}</h4>
                  <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide
                    ${m.tag === 'Future' ? 'bg-slate-100 text-slate-500' :
                      m.tag === 'Partner Opportunity' ? 'bg-teal-100 text-[#157a7f]' :
                      'bg-blue-50 text-blue-600'}`}>
                    {m.tag}
                  </span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="reveal">
          <h3 className="text-xl font-bold text-[#0d1630] mb-6 text-center">Where RemitMatch Fits</h3>
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Feature</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">Accounting Software</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">Care Software</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-[#157a7f] uppercase tracking-wide bg-teal-50">RemitMatch</th>
                  </tr>
                </thead>
                <tbody>
                  {differentiators.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="px-6 py-4 text-sm font-medium text-[#0d1630]">{row.feature}</td>
                      <td className="px-6 py-4 text-center"><CellIcon val={row.accounting} /></td>
                      <td className="px-6 py-4 text-center"><CellIcon val={row.care} /></td>
                      <td className="px-6 py-4 text-center bg-teal-50/50"><CellIcon val={row.remit} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center italic">"Limited" indicates partial or general-purpose capability not specifically designed for the UK care-commissioning context.</p>
        </div>
      </div>
    </section>
  )
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
function Pricing({ onPilotClick }) {
  const [annual, setAnnual] = useState(false)

  const plans = [
    {
      name: 'Starter',
      price: 200,
      annualPrice: 170,
      invoices: 'Up to 100 invoices/month',
      commissioners: 'Up to 2 commissioners',
      bestFor: 'New or very small care providers',
      badge: null,
      features: [
        'Invoice import',
        'Remittance upload',
        'Automated matching',
        'Rate validation',
        'Discrepancy detection',
        'Evidence pack generation',
        'Dashboard',
        'Audit trail',
        'Reporting',
      ],
    },
    {
      name: 'Growth',
      price: 300,
      annualPrice: 255,
      invoices: 'Up to 500 invoices/month',
      commissioners: 'Up to 4 commissioners',
      bestFor: 'Most SME domiciliary care providers',
      badge: 'Most Popular',
      features: [
        'Everything in Starter',
        'Higher reconciliation volume',
        'Multi-commissioner management',
        'Commissioner rate management',
        'Dispute tracking',
        'Expanded reporting',
        'Multi-commissioner financial visibility',
      ],
    },
    {
      name: 'Enterprise',
      price: 400,
      annualPrice: 340,
      invoices: '500+ invoices/month',
      commissioners: '5+ commissioners',
      bestFor: 'Larger providers and multi-site organisations',
      badge: null,
      features: [
        'Everything in Growth',
        'High-volume reconciliation',
        'Multiple commissioner workflows',
        'Multi-site suitability',
        'Expanded reporting',
        'Scalable reconciliation workflow',
        'Priority onboarding',
      ],
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-12">
          <span className="inline-block px-3 py-1 bg-teal-100 text-[#157a7f] text-xs font-bold uppercase tracking-widest rounded-full mb-4">Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1630] mb-4">
            Straightforward, Transparent Pricing
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto mb-8">
            Choose the plan that fits your provider's scale and commissioner volume.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${!annual ? 'bg-[#0d1630] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${annual ? 'bg-[#0d1630] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Annual
              <span className="text-[10px] font-bold bg-teal-100 text-[#157a7f] px-1.5 py-0.5 rounded-full">-15%</span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan, i) => (
            <div key={plan.name}
              className={`reveal reveal-delay-${i + 1} relative flex flex-col rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden
                ${plan.badge ? 'border-[#157a7f] ring-2 ring-[#157a7f]/20' : 'border-slate-200 bg-white'}`}>
              {plan.badge && (
                <div className="bg-[#157a7f] text-white text-center text-xs font-bold py-2 tracking-wide uppercase">
                  {plan.badge}
                </div>
              )}
              <div className={`p-7 flex-1 ${plan.badge ? 'bg-white' : 'bg-white'}`}>
                <h3 className="text-lg font-extrabold text-[#0d1630] mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-xs mb-5">{plan.bestFor}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-extrabold text-[#0d1630]">
                    £{annual ? plan.annualPrice : plan.price}
                  </span>
                  <span className="text-slate-400 text-sm font-medium">/month</span>
                </div>
                {annual && (
                  <p className="text-[#157a7f] text-xs font-semibold mb-1">
                    Billed annually (£{plan.annualPrice * 12}/year)
                  </p>
                )}
                {!annual && (
                  <p className="text-slate-400 text-xs mb-1">
                    Or £{plan.annualPrice}/month billed annually
                  </p>
                )}

                <div className="mt-4 py-3 px-4 bg-slate-50 rounded-xl border border-slate-100 mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon.FileText cls="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-600 text-xs font-medium">{plan.invoices}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon.Building cls="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-600 text-xs font-medium">{plan.commissioners}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-7">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-[#157a7f] mt-0.5 flex-shrink-0"><Icon.CheckCircle cls="w-4 h-4" /></span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onPilotClick}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    ${plan.badge
                      ? 'bg-[#157a7f] hover:bg-[#126468] text-white shadow-sm hover:shadow-md focus-visible:ring-[#157a7f]'
                      : 'bg-[#0d1630] hover:bg-[#132044] text-white focus-visible:ring-[#0d1630]'}`}
                >
                  Request a Pilot
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal text-center mb-12">
          <p className="text-slate-500 text-sm font-medium">
            Save 15% with an annual commitment.
            <span className="text-slate-400 ml-2">Annual equivalents: Starter £170/mo · Growth £255/mo · Enterprise £340/mo</span>
          </p>
        </div>

        {/* Success fee */}
        <div className="reveal bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200 rounded-2xl p-7 text-center mb-8 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            <Icon.Star cls="w-3.5 h-3.5" /> Dispute Recovery Success Fee
          </div>
          <h3 className="text-xl font-extrabold text-[#0d1630] mb-3">Dispute-Recovery Success Fee</h3>
          <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
            RemitMatch charges a <strong>6–8% success fee</strong> on underpayments successfully recovered through disputes supported by the platform.
          </p>
          <p className="text-slate-400 text-sm mt-3 italic">Recovery is not guaranteed. The fee applies only to amounts successfully recovered.</p>
        </div>

        {/* Accountancy partner tier */}
        <div className="reveal bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            <div className="flex-shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest rounded-full">
                Planned Year 2+ Offering
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#0d1630] text-lg mb-2">For Accountancy Partners</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                A planned future tier for accountancy practices serving multiple care provider clients.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-2xl font-extrabold text-[#0d1630]">£199<span className="text-sm font-medium text-slate-400">/mo</span></p>
                  <p className="text-slate-500 text-xs mt-1">Up to 5 provider clients</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-2xl font-extrabold text-[#0d1630]">£39<span className="text-sm font-medium text-slate-400">/client</span></p>
                  <p className="text-slate-500 text-xs mt-1">Per additional provider client</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center">
                  <p className="text-slate-500 text-sm leading-relaxed">Multi-client reconciliation service for care-sector accountants</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future licensing */}
        <div className="reveal mt-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-center">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-full mb-2">Future Year 3+ Partnership Model</span>
          <p className="text-slate-500 text-sm">
            Software Vendor Integration Fee: <span className="font-semibold text-[#0d1630]">£2,000–£5,000</span> &nbsp;|&nbsp; Ongoing Revenue Share: <span className="font-semibold text-[#0d1630]">15–20%</span> of RemitMatch subscription revenue generated through the partner platform.
          </p>
        </div>
      </div>
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
    { q: 'Can I request a pilot?', a: 'Yes. Complete the Request a Pilot form to register your organisation\'s interest.' },
  ]

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-16">
          <span className="inline-block px-3 py-1 bg-teal-100 text-[#157a7f] text-xs font-bold uppercase tracking-widest rounded-full mb-4">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1630] mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-base">Common questions about the RemitMatch platform.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="reveal bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500"
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="font-semibold text-[#0d1630] text-sm pr-4">{faq.q}</span>
                <span className={`flex-shrink-0 w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-200 ${open === i ? 'bg-[#157a7f] border-[#157a7f] rotate-180' : 'bg-slate-50 hover:bg-slate-100'}`}>
                  <Icon.ArrowDown cls={`w-4 h-4 ${open === i ? 'text-white' : 'text-slate-500'}`} />
                </span>
              </button>
              {open === i && (
                <div id={`faq-answer-${i}`} className="px-6 pb-5">
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PILOT FORM ──────────────────────────────────────────────────────────────
function PilotForm({ onClose, isModal = false }) {
  const [form, setForm] = useState({ fullName: '', phoneNumber: '', emailAddress: '', organisationName: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required.'
    if (!form.phoneNumber.trim()) e.phoneNumber = 'Phone number is required.'
    if (!form.emailAddress.trim()) {
      e.emailAddress = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailAddress)) {
      e.emailAddress = 'Please enter a valid email address.'
    }
    if (!form.organisationName.trim()) e.organisationName = 'Organisation name is required.'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
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

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const fields = [
    { key: 'fullName', label: 'Full Name', type: 'text', placeholder: 'e.g. Sarah Williams', autocomplete: 'name' },
    { key: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'e.g. 07123 456 789', autocomplete: 'tel' },
    { key: 'emailAddress', label: 'Email Address', type: 'email', placeholder: 'e.g. sarah@care.co.uk', autocomplete: 'email' },
    { key: 'organisationName', label: 'Organisation Name', type: 'text', placeholder: 'e.g. Example Care Ltd', autocomplete: 'organization' },
  ]

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon.CheckCircle cls="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-extrabold text-[#0d1630] mb-2">Thank You</h3>
        <p className="text-slate-600 text-base mb-6">Your pilot request has been recorded.</p>
        <button
          onClick={() => { setSubmitted(false); if (onClose) onClose() }}
          className="px-6 py-2.5 bg-[#157a7f] hover:bg-[#126468] text-white font-semibold text-sm rounded-xl transition-all duration-200"
        >
          {isModal ? 'Close' : 'Submit Another Request'}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        {fields.map(f => (
          <div key={f.key}>
            <label htmlFor={`pilot-${f.key}`} className="block text-sm font-semibold text-[#0d1630] mb-1.5">
              {f.label} <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id={`pilot-${f.key}`}
              type={f.type}
              placeholder={f.placeholder}
              autoComplete={f.autocomplete}
              value={form[f.key]}
              onChange={e => handleChange(f.key, e.target.value)}
              aria-required="true"
              aria-describedby={errors[f.key] ? `error-${f.key}` : undefined}
              aria-invalid={!!errors[f.key]}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#157a7f] focus:border-[#157a7f]
                ${errors[f.key] ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-300'}`}
            />
            {errors[f.key] && (
              <p id={`error-${f.key}`} className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1" role="alert">
                <Icon.AlertTriangle cls="w-3.5 h-3.5 flex-shrink-0" /> {errors[f.key]}
              </p>
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full py-3.5 bg-[#157a7f] hover:bg-[#126468] text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#157a7f] focus-visible:ring-offset-2"
      >
        Request a Pilot
      </button>
      <p className="text-center text-xs text-slate-400 mt-3">Your information is stored only in your browser. No data is sent to any server.</p>
    </form>
  )
}

// ─── PILOT MODAL ─────────────────────────────────────────────────────────────
function PilotModal({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pilot-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-7 py-5 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 id="pilot-modal-title" className="text-xl font-extrabold text-[#0d1630]">Request a Pilot</h2>
            <p className="text-slate-400 text-sm mt-0.5">Register your organisation's interest in RemitMatch.</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#157a7f]"
            aria-label="Close modal"
          >
            <Icon.X cls="w-4 h-4" />
          </button>
        </div>
        <div className="px-7 py-6">
          <PilotForm onClose={onClose} isModal />
        </div>
      </div>
    </div>
  )
}

// ─── PILOT CTA ───────────────────────────────────────────────────────────────
function PilotCTA({ onPilotClick }) {
  return (
    <section id="pilot" className="py-24 bg-gradient-to-br from-[#0d1630] via-[#132044] to-[#0f4e52] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 bg-teal-700/10 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="reveal">
          <span className="inline-block px-3 py-1 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-widest rounded-full mb-6">Get Started</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5 leading-tight">
            Ready to Make Remittance Reconciliation Clearer?
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Request a RemitMatch pilot and explore a more structured approach to commissioner reconciliation, payment discrepancies and dispute evidence.
          </p>
          <button
            onClick={onPilotClick}
            className="px-10 py-4 bg-[#157a7f] hover:bg-[#1a9ba1] text-white font-bold text-base rounded-2xl transition-all duration-200 shadow-xl shadow-teal-900/40 hover:shadow-teal-700/50 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1630]"
          >
            Request a Pilot
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ onPilotClick }) {
  const navLinks = ['Home', 'About', 'Platform', 'How It Works', 'Market', 'Pricing', 'FAQ']
  const legalLinks = ['Privacy Policy', 'Terms of Use', 'Cookie Policy']

  const handleNavClick = (label) => {
    const id = label.toLowerCase().replace(/\s+/g, '-')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0a0f1e] text-slate-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#157a7f] to-[#0f4e52] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm leading-none">RM</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Remit<span className="text-[#1a9ba1]">Match</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-5">
              Automated remittance reconciliation and dispute evidence for UK care providers.
            </p>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              RemitMatch is a specialised reconciliation layer designed to work alongside existing care-management, invoicing and accounting systems.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {navLinks.map(link => (
                <li key={link}>
                  <button
                    onClick={() => handleNavClick(link)}
                    className="text-slate-400 hover:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Get Started</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Register your organisation's interest in the RemitMatch pilot.
            </p>
            <button
              onClick={onPilotClick}
              className="px-5 py-2.5 bg-[#157a7f] hover:bg-[#1a9ba1] text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
            >
              Request a Pilot
            </button>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2026 RemitMatch. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map(link => (
              <a
                key={link}
                href="#"
                onClick={e => e.preventDefault()}
                className="text-slate-500 hover:text-slate-300 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  useScrollReveal()

  return (
    <div className="font-sans antialiased">
      <Navbar onPilotClick={() => setModalOpen(true)} />
      <main>
        <Hero onPilotClick={() => setModalOpen(true)} />
        <Benefits />
        <About />
        <Platform />
        <HowItWorks />
        <Market />
        <Pricing onPilotClick={() => setModalOpen(true)} />
        <FAQ />
        <PilotCTA onPilotClick={() => setModalOpen(true)} />
      </main>
      <Footer onPilotClick={() => setModalOpen(true)} />
      <PilotModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}

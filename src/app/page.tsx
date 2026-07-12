'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Leaf,
  Heart,
  Store,
  Building2,
  ArrowRight,
  Shield,
  Handshake,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'
import { useT, T, TBr, useI18n, LangSelector } from '@/lib/i18n/I18nProvider'

export default function LandingPage() {
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const t = useT()
  const { lang } = useI18n()

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
    fetch(`${API_URL}/api/auth/me`, { signal: controller.signal, credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        const user = data?.data?.user ?? data?.user ?? data?.data ?? null
        setUser(user)
      })
      .catch(() => setUser(null))
      .finally(() => clearTimeout(timeout))
  }, [])

  // Schema JSON-LD in current language
  const schemaLang = lang.toUpperCase()
  const faqItems = [
    { name: t('faq.items.0.q'), text: t('faq.items.0.a') },
    { name: t('faq.items.1.q'), text: t('faq.items.1.a') },
    { name: t('faq.items.2.q'), text: t('faq.items.2.a') },
    { name: t('faq.items.3.q'), text: t('faq.items.3.a') },
    { name: t('faq.items.4.q'), text: t('faq.items.4.a') },
    { name: t('faq.items.5.q'), text: t('faq.items.5.a') },
    { name: t('faq.items.6.q'), text: t('faq.items.6.a') },
    { name: t('faq.items.7.q'), text: t('faq.items.7.a') },
  ]

  const stepsData = [
    { title: t('howItWorks.steps.0.title'), desc: t('howItWorks.steps.0.desc'), detail: t('howItWorks.steps.0.detail'), icon: Store },
    { title: t('howItWorks.steps.1.title'), desc: t('howItWorks.steps.1.desc'), detail: t('howItWorks.steps.1.detail'), icon: Heart },
    { title: t('howItWorks.steps.2.title'), desc: t('howItWorks.steps.2.desc'), detail: t('howItWorks.steps.2.detail'), icon: Handshake },
  ]

  const cycleStepsData = [
    { step: '1', title: t('howItWorks.cycleSteps.0.title'), desc: t('howItWorks.cycleSteps.0.desc'), color: 'emerald' as const },
    { step: '2', title: t('howItWorks.cycleSteps.1.title'), desc: t('howItWorks.cycleSteps.1.desc'), color: 'amber' as const },
    { step: '3', title: t('howItWorks.cycleSteps.2.title'), desc: t('howItWorks.cycleSteps.2.desc'), color: 'blue' as const },
    { step: '4', title: t('howItWorks.cycleSteps.3.title'), desc: t('howItWorks.cycleSteps.3.desc'), color: 'emerald' as const },
  ]

  const badgesList = [
    t('hero.badges.0'),
    t('hero.badges.1'),
    t('hero.badges.2'),
    t('hero.badges.3'),
  ]

  const diffItems = [
    { title: t('differentiation.items.0.title'), desc: t('differentiation.items.0.desc') },
    { title: t('differentiation.items.1.title'), desc: t('differentiation.items.1.desc') },
    { title: t('differentiation.items.2.title'), desc: t('differentiation.items.2.desc') },
    { title: t('differentiation.items.3.title'), desc: t('differentiation.items.3.desc') },
  ]

  const benefitItems = [
    {
      title: t('benefits.commerce.title'),
      subtitle: t('benefits.commerce.subtitle'),
      items: [
        t('benefits.commerce.items.0'),
        t('benefits.commerce.items.1'),
        t('benefits.commerce.items.2'),
        t('benefits.commerce.items.3'),
      ],
      icon: Store,
      color: 'emerald' as const,
    },
    {
      title: t('benefits.ngo.title'),
      subtitle: t('benefits.ngo.subtitle'),
      items: [
        t('benefits.ngo.items.0'),
        t('benefits.ngo.items.1'),
        t('benefits.ngo.items.2'),
        t('benefits.ngo.items.3'),
        t('benefits.ngo.items.4'),
      ],
      icon: Building2,
      color: 'amber' as const,
    },
    {
      title: t('benefits.planet.title'),
      subtitle: t('benefits.planet.subtitle'),
      items: [
        t('benefits.planet.items.0'),
        t('benefits.planet.items.1'),
        t('benefits.planet.items.2'),
        t('benefits.planet.items.3'),
      ],
      icon: Leaf,
      color: 'emerald' as const,
    },
  ]

  return (
    <>
      {/* Schema JSON-LD inline */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://comidaconecta.org/#organization",
                "name": "ComidaConecta",
                "url": "https://comidaconecta.org",
                "description": t('meta.description'),
                "foundingDate": "2026",
                "isAccessibleForFree": true,
                "areaServed": { "@type": "Country", "name": "España" },
              },
              {
                "@type": "WebSite",
                "@id": "https://comidaconecta.org/#website",
                "url": "https://comidaconecta.org",
                "name": "ComidaConecta",
                "description": t('meta.ogDescription'),
                "publisher": { "@id": "https://comidaconecta.org/#organization" },
                "inLanguage": lang,
                "isAccessibleForFree": true,
                "potentialAction": [{ "@type": "RegisterAction", "target": "https://comidaconecta.org/register" }],
              },
              {
                "@type": "WebPage",
                "@id": "https://comidaconecta.org/#webpage",
                "url": "https://comidaconecta.org",
                "name": t('meta.ogTitle'),
                "description": t('meta.ogDescription'),
                "isPartOf": { "@id": "https://comidaconecta.org/#website" },
                "about": { "@type": "Thing", "name": t('stats.title') },
                "mentions": [
                  { "@type": "Thing", "name": t('benefits.commerce.title') },
                  { "@type": "Thing", "name": t('benefits.ngo.title') },
                  { "@type": "Thing", "name": t('benefits.planet.subtitle') },
                  { "@type": "Thing", "name": t('differentiation.items.1.title') },
                  { "@type": "Thing", "name": t('about.tags.1') },
                ],
                "dateModified": "2026-06-21",
              },
              {
                "@type": "FAQPage",
                "@id": "https://comidaconecta.org/#faq",
                "mainEntity": faqItems.slice(0, 6).map((item) => ({
                  "@type": "Question",
                  "name": item.name,
                  "acceptedAnswer": { "@type": "Answer", "text": item.text },
                })),
              },
              {
                "@type": "HowTo",
                "@id": "https://comidaconecta.org/#howto",
                "name": t('howItWorks.title'),
                "description": t('howItWorks.subtitle'),
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "EUR", "value": "0" },
                "step": stepsData.map((s, i) => ({
                  "@type": "HowToStep",
                  "position": i + 1,
                  "name": s.title,
                  "text": s.desc,
                  "url": `https://comidaconecta.org/register?role=commerce`,
                })),
                "inLanguage": lang,
                "isAccessibleForFree": true,
              },
            ],
          }),
        }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icon-mark.svg" alt="ComidaConecta" className="w-9 h-9" />
            <span className="font-bold text-lg">ComidaConecta</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <LangSelector />
            <a href="#como-funciona" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              <T k="nav.howItWorks" />
            </a>
            <a href="#faq" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              <T k="nav.faq" />
            </a>
            <a href="#quienes-somos" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              <T k="nav.about" />
            </a>
            <Link href="/colabora" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
              <T k="nav.collaborate" />
            </Link>
            {user ? (
              <Link
                href="/comercio/dashboard"
                className="text-sm bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <T k="nav.dashboard" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  <T k="nav.login" />
                </Link>
                <Link
                  href="/register"
                  className="text-sm bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <T k="nav.joinFree" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger + lang */}
          <div className="flex items-center gap-2 md:hidden">
            <LangSelector />
            <button
              className="text-zinc-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-4 flex flex-col gap-4">
            <a href="#como-funciona" className="text-zinc-400 hover:text-zinc-100" onClick={() => setMobileMenuOpen(false)}>
              <T k="nav.howItWorks" />
            </a>
            <a href="#faq" className="text-zinc-400 hover:text-zinc-100" onClick={() => setMobileMenuOpen(false)}>
              <T k="nav.faq" />
            </a>
            <a href="#quienes-somos" className="text-zinc-400 hover:text-zinc-100" onClick={() => setMobileMenuOpen(false)}>
              <T k="nav.about" />
            </a>
            <Link href="/colabora" className="text-emerald-400 hover:text-emerald-300 font-medium" onClick={() => setMobileMenuOpen(false)}>
              <T k="nav.collaborate" /> 💚
            </Link>
            {user ? (
              <Link href="/comercio/dashboard" className="bg-emerald-600 text-white text-center px-4 py-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                <T k="nav.dashboard" />
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-zinc-400 hover:text-zinc-100 text-center" onClick={() => setMobileMenuOpen(false)}>
                  <T k="nav.login" />
                </Link>
                <Link href="/register" className="bg-emerald-600 text-white text-center px-4 py-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  <T k="nav.joinFree" />
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* ============ HERO ============ */}
      <section className="min-h-svh flex flex-col items-center justify-center px-4 pt-16 pb-16 text-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-900/40 border border-emerald-700/30 rounded-full text-emerald-300 text-xs font-medium mb-6">
            <Handshake className="w-3.5 h-3.5" />
            <T k="hero.badge" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <T k="hero.title" />{' '}
            <span className="text-emerald-400"><T k="hero.titleHighlight" /></span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            <T k="hero.subtitle" /> <strong><T k="hero.subtitleBold1" /></strong>.<br />
            <strong> <T k="hero.subtitleBold2" /></strong>
          </p>
          {/* Social proof badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {badgesList.map((badge, i) => (
              <span key={i} className="px-3 py-1.5 bg-zinc-800/40 border border-zinc-700/20 rounded-full text-xs text-zinc-400">
                {badge}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?role=commerce"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-all hover:scale-105"
            >
              <Store className="w-5 h-5" />
              <TBr k="hero.commerceBtn" />
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register?role=ngo"
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 px-8 py-3.5 rounded-xl font-semibold text-lg transition-all hover:scale-105"
            >
              <Building2 className="w-5 h-5" />
              <TBr k="hero.ngoBtn" />
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-zinc-500 text-sm mt-4"><T k="hero.disclaimer" /></p>
          <p className="text-zinc-600 text-xs mt-3 max-w-xl mx-auto">
            <T k="hero.note" />
          </p>
        </div>
      </section>

      {/* ============ CÓMO FUNCIONA ============ */}
      <section id="como-funciona" className="py-24 px-4 bg-zinc-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4"><T k="howItWorks.title" /></h2>
          <p className="text-zinc-400 text-center mb-4 max-w-2xl mx-auto">
            <strong><T k="howItWorks.subtitle" /></strong>
          </p>
          <p className="text-zinc-500 text-center mb-16 max-w-xl mx-auto text-sm">
            <T k="howItWorks.subtitle2" />
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {stepsData.map((item, i) => (
              <div
                key={i}
                className="bg-zinc-800/50 border border-zinc-700/30 rounded-xl p-8 text-center hover:border-emerald-700/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-900/40 border border-emerald-700/30 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-emerald-400 text-sm font-bold mb-2">{t('howItWorks.steps.' + i + '.title')}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">{item.desc}</p>
                <span className="text-xs text-emerald-500/70">{item.detail}</span>
              </div>
            ))}
          </div>

          {/* Match cycle */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-center mb-2"><T k="howItWorks.cycleTitle" /></h3>
            <p className="text-zinc-500 text-sm text-center mb-8"><T k="howItWorks.cycleSubtitle" /></p>
            <div className="space-y-4">
              {cycleStepsData.map((item) => (
                <div key={item.step} className="flex items-start gap-4 bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    item.color === 'emerald' ? 'bg-emerald-900/40 border border-emerald-700/30 text-emerald-400' :
                    item.color === 'amber' ? 'bg-amber-900/40 border border-amber-700/30 text-amber-400' :
                    'bg-blue-900/40 border border-blue-700/30 text-blue-400'
                  }`}>
                    <span className="font-bold text-sm">{item.step}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-zinc-200">{item.title}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-zinc-800/20 border border-zinc-700/20 rounded-xl p-4 text-center">
              <p className="text-xs text-zinc-500 leading-relaxed">
                <strong className="text-zinc-400"><T k="howItWorks.matchComplete" /></strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BENEFICIOS ============ */}
      <section id="beneficios" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4"><T k="benefits.title" /></h2>
          <p className="text-zinc-400 text-center mb-16 max-w-xl mx-auto">
            <T k="benefits.subtitle" />
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitItems.map((item) => (
              <div key={item.title} className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-1">
                  <item.icon className={`w-5 h-5 ${item.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`} />
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                </div>
                <p className="text-xs text-zinc-500 mb-4 ml-8">{item.subtitle}</p>
                <ul className="space-y-2">
                  {item.items.map((sub) => (
                    <li key={sub} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className={`mt-0.5 ${item.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`}>✓</span>
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-6 lg:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold text-lg"><T k="benefits.transparency.title" /></h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                <T k="benefits.transparency.text" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ESTADÍSTICAS ============ */}
      <section className="py-24 px-4 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4"><T k="stats.title" /></h2>
          <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
            <T k="stats.subtitle" />
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            { [0, 1, 2].map((i) => (
              <div key={i} className="bg-zinc-800/40 border border-zinc-700/30 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2"><T k={`stats.items.${i}.number`} /></div>
                <p className="text-sm text-zinc-400"><T k={`stats.items.${i}.text`} /></p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-xs text-zinc-600"><T k="stats.sources" /></p>
          </div>
        </div>
      </section>

      {/* ============ DIFERENCIACIÓN ============ */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4"><T k="differentiation.title" /></h2>
          <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
            <T k="differentiation.subtitle" />
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {diffItems.map((item, i) => (
              <div key={i} className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-900/40 border border-emerald-700/30 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 font-bold">{['∞', '✓', '⚡', '❤'][i]}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4"><T k="faq.title" /></h2>
          <p className="text-zinc-400 text-center mb-12 max-w-xl mx-auto">
            <T k="faq.subtitle" />
          </p>
          <div className="space-y-3">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-800/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-sm md:text-base"><T k={`faq.items.${i}.q`} /></span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-zinc-700/30 pt-4">
                    <T k={`faq.items.${i}.a`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ QUIÉNES SOMOS ============ */}
      <section id="quienes-somos" className="py-24 px-4 bg-zinc-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6"><T k="about.title" /></h2>
          <p className="text-zinc-400 leading-relaxed mb-6"><T k="about.p1" /></p>
          <p className="text-zinc-400 leading-relaxed mb-6"><T k="about.p2" /></p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/30 rounded-full text-xs text-zinc-400">
              <T k="about.tags.0" />
            </span>
            <span className="px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/30 rounded-full text-xs text-zinc-400">
              <T k="about.tags.1" />
            </span>
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="py-24 px-4 bg-gradient-to-b from-zinc-950 to-zinc-900">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-900/40 border border-emerald-700/30 rounded-full text-emerald-300 text-xs font-medium mb-6">
            <T k="cta.badge" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <T k="cta.title" /> <span className="text-emerald-400"><T k="cta.titleHighlight" /></span>
          </h2>
          <p className="text-zinc-400 mb-4"><T k="cta.subtitle" /></p>
          <p className="text-zinc-500 text-sm mb-10 italic"><T k="cta.quote" /></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?role=commerce"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105"
            >
              <T k="cta.commerceBtn" />
            </Link>
            <Link
              href="/register?role=ngo"
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105"
            >
              <T k="cta.ngoBtn" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-12 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold"><T k="footer.name" /></span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/condiciones" className="hover:text-zinc-300 transition-colors">
              <T k="footer.terms" />
            </Link>
            <Link href="/aviso-legal" className="hover:text-zinc-300 transition-colors">
              <T k="footer.legal" />
            </Link>
            <Link href="/privacidad" className="hover:text-zinc-300 transition-colors">
              <T k="footer.privacy" />
            </Link>
            <Link href="/cookies" className="hover:text-zinc-300 transition-colors">
              <T k="footer.cookies" />
            </Link>
            <Link href="/colabora" className="hover:text-zinc-300 transition-colors text-emerald-500">
              <T k="footer.collaborate" />
            </Link>
            <Link href="/login" className="hover:text-zinc-300 transition-colors">
              <T k="footer.login" />
            </Link>
          </div>
          <p className="text-xs text-zinc-600">© 2026 <T k="footer.name" />. <T k="footer.copyright" /></p>
        </div>
      </footer>
    </>
  )
}

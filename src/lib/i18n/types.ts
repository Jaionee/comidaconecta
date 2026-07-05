export const SUPPORTED_LANGUAGES = [
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
  { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'eu', name: 'Euskara', flag: '🇪🇸', dir: 'ltr' },
] as const

export type LangCode = (typeof SUPPORTED_LANGUAGES)[number]['code']

export type Translations = {
  meta: {
    title: string
    description: string
    keywords: string[]
    ogTitle: string
    ogDescription: string
  }
  nav: {
    howItWorks: string
    faq: string
    about: string
    collaborate: string
    dashboard: string
    joinFree: string
    login: string
  }
  hero: {
    badge: string
    title: string
    titleHighlight: string
    subtitle: string
    subtitleBold1: string
    subtitleBold2: string
    badges: string[]
    commerceBtn: string
    ngoBtn: string
    disclaimer: string
    note: string
  }
  howItWorks: {
    title: string
    subtitle: string
    subtitle2: string
    steps: Array<{ title: string; desc: string; detail: string }>
    cycleTitle: string
    cycleSubtitle: string
    cycleSteps: Array<{ title: string; desc: string }>
    matchComplete: string
  }
  benefits: {
    title: string
    subtitle: string
    commerce: { title: string; subtitle: string; items: string[] }
    ngo: { title: string; subtitle: string; items: string[] }
    planet: { title: string; subtitle: string; items: string[] }
    transparency: { title: string; text: string }
  }
  stats: {
    title: string
    subtitle: string
    items: Array<{ number: string; text: string }>
    sources: string
  }
  differentiation: {
    title: string
    subtitle: string
    items: Array<{ title: string; desc: string }>
  }
  faq: {
    title: string
    subtitle: string
    items: Array<{ q: string; a: string }>
  }
  about: {
    title: string
    p1: string
    p2: string
    tags: string[]
  }
  cta: {
    badge: string
    title: string
    titleHighlight: string
    subtitle: string
    quote: string
    commerceBtn: string
    ngoBtn: string
  }
  footer: {
    terms: string
    legal: string
    privacy: string
    cookies: string
    collaborate: string
    login: string
    copyright: string
    name: string
  }
}

export type TranslationsMap = Record<LangCode, Translations>

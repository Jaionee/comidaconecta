'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { Translations, LangCode } from './types'
import { SUPPORTED_LANGUAGES } from './types'
import allTranslations from './translations'

/* ==============================
   COOKIE HELPERS
   ============================== */

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? decodeURIComponent(match[2]) : null
}

function setCookie(name: string, value: string, days = 365) {
  const d = new Date()
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`
}

/* ==============================
   DETECT LANGUAGE
   ============================== */

function detectLanguage(): LangCode {
  // 1. URL param (for testing/sharing)
  if (typeof window !== 'undefined') {
    const urlLang = new URLSearchParams(window.location.search).get('lang')
    if (urlLang && SUPPORTED_LANGUAGES.some(l => l.code === urlLang)) {
      setCookie('lang', urlLang)
      return urlLang as LangCode
    }
  }

  // 2. Cookie (persisted choice)
  const cookieLang = getCookie('lang')
  if (cookieLang && SUPPORTED_LANGUAGES.some(l => l.code === cookieLang)) {
    return cookieLang as LangCode
  }

  // 3. Browser language
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language?.split('-')[0]
    if (browserLang && SUPPORTED_LANGUAGES.some(l => l.code === browserLang)) {
      return browserLang as LangCode
    }
  }

  // 4. Fallback
  return 'es'
}

/* ==============================
   CONTEXT
   ============================== */

type I18nCtx = {
  lang: LangCode
  dir: 'ltr' | 'rtl'
  t: Translations
  switchLang: (code: LangCode) => void
}

const I18nContext = createContext<I18nCtx | null>(null)

/* ==============================
   PROVIDER
   ============================== */

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LangCode>('es')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const detected = detectLanguage()
    setLang(detected)
    setMounted(true)
  }, [])

  const switchLang = useCallback((code: LangCode) => {
    setLang(code)
    setCookie('lang', code)
    // Update HTML lang and dir attributes
    document.documentElement.lang = code
    const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === code)
    if (langInfo) {
      document.documentElement.dir = langInfo.dir
    }
  }, [])

  const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === lang) ?? SUPPORTED_LANGUAGES[0]
  const t = allTranslations[lang] ?? allTranslations.es

  // Avoid flash of untranslated content
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <I18nContext.Provider value={{ lang, dir: langInfo.dir, t, switchLang }}>
      {children}
    </I18nContext.Provider>
  )
}

/* ==============================
   HOOKS
   ============================== */

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    // Fallback during SSR / static generation
    return { lang: 'es', dir: 'ltr' as const, t: allTranslations.es, switchLang: (() => {}) as any }
  }
  return ctx
}

/**
 * /!\ BEWARE: this is a minimal type-level key path resolver.
 * It works by traversing the Translations object at runtime.
 * Usage: `t("hero.title")` → gets `translations.hero.title`
 */
function getByPath(obj: any, path: string): unknown {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

export function useT() {
  const { t: translations } = useI18n()
  return useCallback(
    (key: string): string => {
      const val = getByPath(translations, key)
      if (typeof val === 'string') return val
      // If it's an array or object, try to convert
      if (val !== undefined && val !== null) return String(val)
      console.warn(`[i18n] Missing translation key: ${key}`)
      return key
    },
    [translations],
  )
}

/* ==============================
   T COMPONENT
   ============================== */

type TProps = {
  k: string
  /** HTML tag to wrap the text (default: span) */
  as?: React.ElementType
  className?: string
} & Omit<React.HTMLAttributes<HTMLElement>, 'children'>

export function T({ k, as: Tag = 'span', className, ...rest }: TProps) {
  const t = useT()
  return (
    <Tag className={className} {...rest}>
      {t(k)}
    </Tag>
  )
}

/* ==============================
   LANGUAGE SELECTOR
   ============================== */

export function LangSelector({ className = '' }: { className?: string }) {
  const { lang, switchLang } = useI18n()
  const [open, setOpen] = useState(false)

  const current = SUPPORTED_LANGUAGES.find(l => l.code === lang) ?? SUPPORTED_LANGUAGES[0]

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors px-2 py-1.5 rounded-lg hover:bg-zinc-800/50"
        aria-label="Change language"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full right-0 mt-1 z-20 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl py-1 min-w-[160px]">
            {SUPPORTED_LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { switchLang(l.code as LangCode); setOpen(false) }}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-zinc-800 transition-colors ${
                  lang === l.code ? 'text-emerald-400' : 'text-zinc-300'
                }`}
                dir={l.dir}
              >
                <span>{l.flag}</span>
                <span>{l.name}</span>
                {l.dir === 'rtl' && <span className="text-xs text-zinc-500 ml-auto">RTL</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

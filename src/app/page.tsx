'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Leaf,
  Heart,
  Store,
  Building2,
  ArrowRight,
  Shield,
  BarChart3,
  Handshake,
  Menu,
  X,
} from 'lucide-react'

export default function LandingPage() {
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    try {
      const supabase = createClient()
      supabase.auth.getUser().then(({ data }) => setUser(data.user))
    } catch {
      // Supabase not configured yet
    }
  }, [])

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-lg">ComidaConecta</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#como-funciona" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              Cómo funciona
            </a>
            <a href="#beneficios" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              Beneficios
            </a>
            {user ? (
              <Link
                href="/comercio/dashboard"
                className="text-sm bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Ir al panel
              </Link>
            ) : (
              <Link
                href="/register"
                className="text-sm bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Unirse gratis
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-zinc-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-4 flex flex-col gap-4">
            <a
              href="#como-funciona"
              className="text-zinc-400 hover:text-zinc-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cómo funciona
            </a>
            <a
              href="#beneficios"
              className="text-zinc-400 hover:text-zinc-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Beneficios
            </a>
            {user ? (
              <Link
                href="/comercio/dashboard"
                className="bg-emerald-600 text-white text-center px-4 py-2 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ir al panel
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-zinc-400 hover:text-zinc-100 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-emerald-600 text-white text-center px-4 py-2 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Unirse gratis
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="min-h-svh flex flex-col items-center justify-center px-4 pt-16 pb-16 text-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-900/40 border border-emerald-700/30 rounded-full text-emerald-300 text-xs font-medium mb-6">
            <Handshake className="w-3.5 h-3.5" />
            Reducción del desperdicio alimentario en Bizkaia
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Conectamos{' '}
            <span className="text-emerald-400">excedente alimentario</span>{' '}
            con quien más lo necesita
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Una plataforma simple y gratuita para que comercios donen su excedente
            y entidades sociales lo recojan. Sin comisiones, sin burocracia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?role=commerce"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-all hover:scale-105"
            >
              <Store className="w-5 h-5" />
              Soy comercio
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register?role=ngo"
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 px-8 py-3.5 rounded-xl font-semibold text-lg transition-all hover:scale-105"
            >
              <Building2 className="w-5 h-5" />
              Soy entidad social
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-zinc-500 text-sm mt-4">Sin compromiso. Gratis para siempre para entidades sociales.</p>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-24 px-4 bg-zinc-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Cómo funciona</h2>
          <p className="text-zinc-400 text-center mb-16 max-w-xl mx-auto">
            Tres pasos simples para que el excedente alimentario llegue a quien lo necesita.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Publica',
                desc: 'El comercio publica el excedente disponible: tipo, cantidad, horario de recogida.',
                icon: Store,
              },
              {
                step: '2',
                title: 'Conecta',
                desc: 'Las entidades sociales ven las donaciones disponibles en tiempo real y reservan la recogida.',
                icon: Heart,
              },
              {
                step: '3',
                title: 'Recoge',
                desc: 'La entidad recoge, el comercio confirma y todo queda registrado con trazabilidad.',
                icon: Handshake,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-zinc-800/50 border border-zinc-700/30 rounded-xl p-8 text-center hover:border-emerald-700/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-900/40 border border-emerald-700/30 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-emerald-400 text-sm font-bold mb-2">Paso {item.step}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Para todos los que participan</h2>
          <p className="text-zinc-400 text-center mb-16 max-w-xl mx-auto">
            Una plataforma que beneficia a comercios, entidades y al planeta.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Para comercios',
                items: [
                  'Reducir desperdicio y costes de gestión',
                  'Informes de impacto mensuales',
                  'Sello de compromiso social',
                  'Cero coste — sin comisiones',
                ],
                icon: Store,
                color: 'emerald',
              },
              {
                title: 'Para entidades sociales',
                items: [
                  'Acceso gratuito sin límites',
                  'Donaciones verificadas y seguras',
                  'Gestión sencilla desde el móvil',
                  'Trazabilidad completa',
                ],
                icon: Building2,
                color: 'amber',
              },
              {
                title: 'Para el planeta',
                items: [
                  'Menos desperdicio alimentario',
                  'Apoyo a la economía circular',
                  'Reducción de emisiones',
                  'Fortalecimiento comunitario',
                ],
                icon: Leaf,
                color: 'emerald',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <item.icon className={`w-5 h-5 ${item.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`} />
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                </div>
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
                <h3 className="font-semibold text-lg">Compromiso con la transparencia</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                ComidaConecta facilita la conexión entre donantes y entidades, pero no asume
                responsabilidad sobre el transporte, la manipulación ni la calidad de los alimentos
                donados. Cada donación queda registrada con trazabilidad completa. Los informes de
                impacto son herramientas de gestión, no documentos fiscales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section className="py-24 px-4 bg-gradient-to-b from-zinc-900/50 to-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Impacto en Bizkaia</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '0', label: 'Kg de alimento redirigido', sub: 'Empieza hoy' },
              { num: '0', label: 'Comercios activos', sub: 'Sé el primero' },
              { num: '0', label: 'Entidades registradas', sub: 'Únete ahora' },
              { num: '0', label: 'Donaciones gestionadas', sub: 'Primera donación' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">{item.num}</div>
                <div className="text-sm text-zinc-400">{item.label}</div>
                <div className="text-xs text-zinc-600 mt-1">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para empezar a reducir el desperdicio?
          </h2>
          <p className="text-zinc-400 mb-10">
            Únete gratis. Sin compromiso. Sin cuotas. Sin burocracia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?role=commerce"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105"
            >
              Registrarme como comercio
            </Link>
            <Link
              href="/register?role=ngo"
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105"
            >
              Registrarme como entidad social
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold">ComidaConecta</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Términos legales
            </Link>
            <Link href="/login" className="hover:text-zinc-300 transition-colors">
              Iniciar sesión
            </Link>
          </div>
          <p className="text-xs text-zinc-600">© 2026 ComidaConecta. Reduciendo el desperdicio, una donación a la vez.</p>
        </div>
      </footer>
    </>
  )
}

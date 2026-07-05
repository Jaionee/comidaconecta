'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Leaf,
  Heart,
  ArrowLeft,
  Wallet,
  Smartphone,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  CreditCard,
} from 'lucide-react'

const BIZUM_NUMBER = '639175446'
const BEP20_ADDRESS = '0xd808Ff238e09FFb0243904b444f05d73f2Ce36C6'

export default function ColaboraPage() {
  const [copiedBizum, setCopiedBizum] = useState(false)
  const [cryptoOpen, setCryptoOpen] = useState(false)

  const copyBizum = async () => {
    try {
      await navigator.clipboard.writeText(BIZUM_NUMBER)
    } catch {
      // fallback
    }
    setCopiedBizum(true)
    setTimeout(() => setCopiedBizum(false), 2000)
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-lg">ComidaConecta</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16 px-4 text-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-900/40 border border-emerald-700/30 rounded-full text-emerald-300 text-xs font-medium mb-6">
            <Heart className="w-3.5 h-3.5" />
            Contribución voluntaria
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Ayuda a mantener{' '}
            <span className="text-emerald-400">ComidaConecta</span> activa
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
            La plataforma es <strong>gratuita para entidades sociales</strong> y
            de uso gratuito para comercios durante la fase inicial.{' '}
            Si te resulta útil y quieres contribuir a que siga funcionando,
            cualquier aportación voluntaria es bienvenida.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/30 rounded-full text-xs text-zinc-400">
              💚 Sin contrato ni permanencia
            </span>
            <span className="px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/30 rounded-full text-xs text-zinc-400">
              🎯 100% a la plataforma
            </span>
            <span className="px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/30 rounded-full text-xs text-zinc-400">
              🤝 Ayuda a conectar más donaciones
            </span>
          </div>
        </div>
      </section>

      {/* MÉTODOS DE PAGO */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">

            {/* BIZUM */}
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-2xl p-8 hover:border-emerald-700/30 transition-colors flex flex-col">
              <div className="w-14 h-14 rounded-full bg-emerald-900/40 border border-emerald-700/30 flex items-center justify-center mb-6">
                <Smartphone className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Bizum</h2>
              <p className="text-zinc-400 text-sm mb-6 flex-1">
                Desde tu app bancaria. Rápido, sin comisiones.
              </p>

              <button
                onClick={copyBizum}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-xl transition-all duration-200 shadow-lg ${
                  copiedBizum
                    ? 'bg-emerald-600 text-white shadow-emerald-700/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30 hover:shadow-emerald-700/30'
                }`}
              >
                {copiedBizum ? (
                  <>
                    <Check className="w-5 h-5" />
                    ¡Número copiado!
                  </>
                ) : (
                  <>
                    <Smartphone className="w-5 h-5" />
                    Donar con Bizum
                  </>
                )}
              </button>

              <p className="text-xs text-zinc-500 mt-4 text-center leading-relaxed">
                Abre tu app bancaria → «Enviar dinero» → «A un número» → pega el número (se copia al hacer clic)
              </p>
            </div>

            {/* PAYPAL */}
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-2xl p-8 hover:border-emerald-700/30 transition-colors flex flex-col">
              <div className="w-14 h-14 rounded-full bg-blue-900/40 border border-blue-700/30 flex items-center justify-center mb-6">
                <CreditCard className="w-7 h-7 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">PayPal</h2>
              <p className="text-zinc-400 text-sm mb-6 flex-1">
                Tarjeta o cuenta PayPal. Seguro y rápido.
              </p>

              <a
                href="https://paypal.me/ComidaConecta"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 hover:shadow-blue-700/30 transition-all duration-200"
                >
                <CreditCard className="w-5 h-5" />
                Donar con PayPal
                </a>

                <p className="text-xs text-zinc-500 mt-4 text-center leading-relaxed">
                Se abre PayPal en una ventana segura. No guardamos tus datos de pago.
                </p>
            </div>

          </div>

          {/* CRIPTO — colapsable, secundario */}
          <div className="mt-8 max-w-2xl mx-auto">
            <button
              onClick={() => setCryptoOpen(!cryptoOpen)}
              className="w-full flex items-center justify-between gap-3 px-6 py-4 bg-zinc-800/20 border border-zinc-700/20 rounded-xl hover:bg-zinc-800/40 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <Wallet className="w-5 h-5 text-zinc-500" />
                <span className="text-sm text-zinc-400 font-medium">
                  Donar con cripto (BEP20)
                </span>
              </div>
              {cryptoOpen ? (
                <ChevronUp className="w-5 h-5 text-zinc-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-zinc-500" />
              )}
            </button>

            {cryptoOpen && (
              <div className="mt-3 bg-zinc-800/20 border border-zinc-700/20 rounded-xl p-6 transition-all">
                <p className="text-sm text-zinc-400 mb-4">
                  USDT, BNB o cualquier token en <strong>Binance Smart Chain</strong>.
                </p>

                <div className="bg-zinc-900/50 border border-zinc-700/30 rounded-lg p-4 mb-4">
                  <p className="text-xs text-zinc-500 mb-2 font-mono truncate" title={BEP20_ADDRESS}>
                    {BEP20_ADDRESS.slice(0, 12)}...{BEP20_ADDRESS.slice(-6)}
                  </p>
                  <button
                    onClick={() => {
                      try { navigator.clipboard.writeText(BEP20_ADDRESS) } catch {}
                    }}
                    className="flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copiar dirección
                  </button>
                </div>

                <div className="bg-amber-900/20 border border-amber-700/20 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Wallet className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-amber-300/80 leading-relaxed">
                      <strong>⚠️ Solo BEP20 (Binance Smart Chain).</strong> Otras redes
                      pueden resultar en pérdida de fondos.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* NOTA INFORMATIVA */}
          <div className="mt-12 max-w-2xl mx-auto bg-zinc-800/20 border border-zinc-700/20 rounded-xl p-6 text-center">
            <Heart className="w-6 h-6 text-emerald-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">No olvides que lo esencial es gratis</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              ComidaConecta es <strong>gratuita para entidades sociales</strong> y de uso gratuito
              para comercios durante la fase inicial. Más adelante podrá establecerse una
              contribución voluntaria o plan de mantenimiento, siempre avisado previamente.{' '}
              <strong className="text-zinc-400"> Lo importante es que sigas conectando excedente con necesidad</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-12 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold">ComidaConecta</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/aviso-legal" className="hover:text-zinc-300 transition-colors">
              Aviso Legal
            </Link>
            <Link href="/privacidad" className="hover:text-zinc-300 transition-colors">
              Privacidad
            </Link>
            <Link href="/cookies" className="hover:text-zinc-300 transition-colors">
              Cookies
            </Link>
            <Link href="/condiciones" className="hover:text-zinc-300 transition-colors">
              Condiciones
            </Link>
          </div>
          <p className="text-xs text-zinc-600">© 2026 ComidaConecta. Reduciendo el desperdicio, una donación a la vez.</p>
        </div>
      </footer>
    </>
  )
}

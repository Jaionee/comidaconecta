import Link from 'next/link'
import { Leaf, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-900/40 border border-emerald-700/30 mb-6">
          <Leaf className="w-8 h-8 text-emerald-400" />
        </div>

        <h1 className="text-6xl font-bold text-zinc-100 mb-2">404</h1>
        <p className="text-lg text-zinc-400 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            Ir al inicio
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg font-medium transition-colors border border-zinc-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Leaf, Store, Building2, ArrowLeft } from 'lucide-react'
import { signup } from '@/app/actions/auth'

function RegisterForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const defaultRole = searchParams.get('role') || 'commerce'
  const [role, setRole] = useState<'commerce' | 'ngo'>(defaultRole as 'commerce' | 'ngo')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const form = new FormData(e.currentTarget)
      form.set('role', role)
      const result = await signup(form)
      if (result?.error) setError(result.error)
    } catch {
      setError('Error al crear la cuenta. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-4 py-8 bg-zinc-950">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Leaf className="w-6 h-6 text-emerald-400" />
        <span className="font-bold text-xl">ComidaConecta</span>
      </Link>

      <div className="w-full max-w-sm">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver
        </Link>

        <h1 className="text-2xl font-bold mb-2">Crear cuenta</h1>
        <p className="text-zinc-400 text-sm mb-6">
          Elige tu perfil y completa los datos básicos
        </p>

        {/* Role selector */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setRole('commerce')}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
              role === 'commerce'
                ? 'bg-emerald-900/30 border-emerald-600/50 text-emerald-300'
                : 'bg-zinc-800/30 border-zinc-700/30 text-zinc-500 hover:border-zinc-600'
            }`}
          >
            <Store className="w-5 h-5" />
            <span className="text-xs font-medium">Comercio</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('ngo')}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
              role === 'ngo'
                ? 'bg-amber-900/30 border-amber-600/50 text-amber-300'
                : 'bg-zinc-800/30 border-zinc-700/30 text-zinc-500 hover:border-zinc-600'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-xs font-medium">Entidad social</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">
              Nombre completo / Entidad *
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Tu nombre o nombre de la entidad"
              className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-600/50 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Email *</label>
            <input
              name="email"
              type="email"
              required
              placeholder="tu@email.com"
              className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-600/50 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Teléfono</label>
            <input
              name="phone"
              type="tel"
              placeholder="+34 600 00 00 00"
              className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-600/50 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Contraseña *</label>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="Mínimo 8 caracteres"
              className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-600/50 text-sm"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900/20 border border-red-800/30 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-2.5 rounded-lg font-medium transition-colors mt-2"
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta gratuita'}
          </button>
        </form>

        <p className="text-xs text-zinc-600 mt-4 text-center">
          Al registrarte aceptas nuestros{' '}
          <Link href="/terms" className="text-zinc-400 hover:text-zinc-300 underline">
            términos y condiciones
          </Link>
        </p>

        <p className="text-center text-sm text-zinc-500 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-emerald-400 hover:text-emerald-300">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-svh flex items-center justify-center bg-zinc-950">Cargando...</div>}>
      <RegisterForm />
    </Suspense>
  )
}

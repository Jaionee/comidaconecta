'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Leaf, Store, Building2, Eye, EyeOff } from 'lucide-react'
import { login } from '@/app/actions/auth'

function LoginForm() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = new FormData(e.currentTarget)

    try {
      // Use the server action which sets the cookie in the response and does a proper redirect
      const result = await login(form)

      // If we get here, login didn't redirect (error case)
      if (result?.error) {
        setError(result.error)
      } else {
        setError('Error al iniciar sesión')
      }
      setLoading(false)
    } catch (err: any) {
      // Server action redirect() throws a redirect error — ignore it
      // If it's a real error, show it
      if (err?.digest?.startsWith('NEXT_REDIRECT')) {
        // Successful login — the redirect is handled by Next.js
        // No need to do anything else
        return
      }
      setError('Error de conexión con el servidor. ¿Estás conectado a internet?')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-4 bg-zinc-950">
      <Link href="/" className="flex items-center gap-2 mb-12">
        <Leaf className="w-6 h-6 text-emerald-400" />
        <span className="font-bold text-xl">ComidaConecta</span>
      </Link>

      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-2">Iniciar sesión</h1>
        <p className="text-zinc-400 text-center text-sm mb-8">
          Accede a tu cuenta de comercio o entidad social
        </p>

        {role && (
          <div className="flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-zinc-800/50 border border-zinc-700/30 rounded-lg text-sm">
            {role === 'commerce' ? (
              <><Store className="w-4 h-4 text-emerald-400" /> Cuenta de comercio</>
            ) : (
              <><Building2 className="w-4 h-4 text-amber-400" /> Cuenta de entidad social</>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-zinc-300">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="tu@email.com"
              className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-600/50 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-zinc-300">Contraseña</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pr-10 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-600/50 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900/20 border border-red-800/30 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-2.5 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-6">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-emerald-400 hover:text-emerald-300">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-svh flex items-center justify-center bg-zinc-950">
        <div className="text-zinc-500">Cargando...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

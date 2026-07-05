import Link from 'next/link'
import { Leaf } from 'lucide-react'

export default function CookiesPage() {
  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
          <Leaf className="w-5 h-5 text-emerald-400" />
          <span className="font-bold">ComidaConecta</span>
        </Link>

        <h1 className="text-3xl font-bold mb-8">Política de Cookies</h1>

        <div className="prose prose-invert prose-sm max-w-none text-zinc-300 space-y-6">

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu navegador cuando
              visitas un sitio web. Permiten recordar tus preferencias y mejorar tu experiencia
              de navegación.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">2. Cookies utilizadas</h2>
            <p>En ComidaConecta utilizamos únicamente las siguientes cookies:</p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left py-2 pr-4 text-zinc-400 font-medium">Cookie</th>
                    <th className="text-left py-2 pr-4 text-zinc-400 font-medium">Tipo</th>
                    <th className="text-left py-2 pr-4 text-zinc-400 font-medium">Finalidad</th>
                    <th className="text-left py-2 text-zinc-400 font-medium">Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-800">
                    <td className="py-2 pr-4 font-mono text-xs">lang</td>
                    <td className="py-2 pr-4">Técnica</td>
                    <td className="py-2 pr-4">Recordar el idioma seleccionado</td>
                    <td className="py-2">1 año</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-2 pr-4 font-mono text-xs">session</td>
                    <td className="py-2 pr-4">Técnica</td>
                    <td className="py-2 pr-4">Mantener la sesión iniciada</td>
                    <td className="py-2">Sesión</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4">
              No utilizamos cookies de terceros, cookies de publicidad ni cookies de tracking.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">3. Gestión de cookies</h2>
            <p>
              Puedes gestionar o desactivar las cookies desde la configuración de tu navegador.
              Ten en cuenta que si desactivas las cookies técnicas, algunas funcionalidades de la
              plataforma podrían no funcionar correctamente (como el inicio de sesión).
            </p>
            <p className="mt-3">
              Enlaces para gestionar cookies en los navegadores más comunes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li><Link href="https://support.google.com/chrome/answer/95647" target="_blank" className="text-emerald-400 hover:text-emerald-300">Chrome</Link></li>
              <li><Link href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" className="text-emerald-400 hover:text-emerald-300">Firefox</Link></li>
              <li><Link href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" className="text-emerald-400 hover:text-emerald-300">Safari</Link></li>
              <li><Link href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" className="text-emerald-400 hover:text-emerald-300">Edge</Link></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">4. Actualización</h2>
            <p>
              Esta política de cookies puede actualizarse periódicamente. Te recomendamos revisarla
              cada cierto tiempo. Fecha de la última actualización: julio de 2026.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

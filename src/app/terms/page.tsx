import Link from 'next/link'
import { Leaf } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <Leaf className="w-5 h-5 text-emerald-400" />
          <span className="font-bold">ComidaConecta</span>
        </Link>

        <h1 className="text-3xl font-bold mb-8">Términos legales y condiciones de uso</h1>

        <div className="prose prose-invert prose-sm max-w-none text-zinc-300 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">1. Naturaleza de la plataforma</h2>
            <p>
              ComidaConecta es una plataforma tecnológica que actúa como intermediaria para conectar
              comercios con excedente alimentario y entidades sociales. No participamos en la
              manipulación, transporte, almacenamiento ni distribución de los alimentos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">2. Responsabilidades</h2>
            <p>
              Los comercios son responsables de la calidad, seguridad e higiene de los alimentos
              donados. Las entidades sociales son responsables de la recogida, transporte y
              manipulación posterior. ComidaConecta no asume ninguna responsabilidad sobre estos
              procesos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">3. Informes de impacto</h2>
            <p>
              Los informes mensuales generados por la plataforma son herramientas informativas
              de trazabilidad y gestión. No constituyen documentos fiscales, certificaciones
              oficiales ni justificantes de donación ante la Agencia Tributaria. Cada comercio
              debe consultar con su asesoría fiscal sobre posibles deducciones.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">4. Verificación de cuentas</h2>
            <p>
              ComidaConecta se reserva el derecho de verificar la identidad y actividad de
              comercios y entidades registradas. Las cuentas que no cumplan con los requisitos
              podrán ser desactivadas sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">5. Gratuidad</h2>
            <p>
              ComidaConecta es <strong>gratuita para entidades sociales</strong>. Para comercios,
              el uso es gratuito durante la fase inicial; más adelante podrá existir una contribución
              voluntaria o plan de mantenimiento, siempre avisado previamente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">6. Protección de datos</h2>
            <p>
              Los datos personales se tratan conforme al Reglamento General de Protección de
              Datos (RGPD). Puedes solicitar la eliminación de tu cuenta y datos en cualquier
              momento contactando con nosotros.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

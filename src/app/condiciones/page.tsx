import Link from 'next/link'
import { Leaf } from 'lucide-react'

export default function CondicionesPage() {
  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
          <Leaf className="w-5 h-5 text-emerald-400" />
          <span className="font-bold">ComidaConecta</span>
        </Link>

        <h1 className="text-3xl font-bold mb-8">Condiciones de Uso</h1>

        <div className="prose prose-invert prose-sm max-w-none text-zinc-300 space-y-6">

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">1. Aceptación</h2>
            <p>
              Al registrarte y utilizar la plataforma ComidaConecta, aceptas las presentes
              Condiciones de Uso. Si no estás de acuerdo, no debes utilizar la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">2. Naturaleza de la plataforma</h2>
            <p>
              ComidaConecta es una plataforma tecnológica que actúa como intermediaria para conectar
              comercios con excedente alimentario y entidades sociales. No participamos en la
              manipulación, transporte, almacenamiento ni distribución de los alimentos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">3. Gratuidad</h2>
            <p>
              ComidaConecta es <strong>gratuita para entidades sociales</strong>. Para comercios,
              el uso es gratuito durante la fase inicial; más adelante podrá existir una contribución
              voluntaria o plan de mantenimiento, siempre avisado previamente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">4. Responsabilidades</h2>
            <h3 className="text-base font-semibold text-zinc-200 mt-4 mb-2">Comercios</h3>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Declarar que los alimentos publicados son aptos para el consumo humano.</li>
              <li>Garantizar que los alimentos han sido correctamente conservados e identificados.</li>
              <li>Facilitar la recogida en el horario y condiciones acordados.</li>
            </ul>
            <h3 className="text-base font-semibold text-zinc-200 mt-4 mb-2">Entidades sociales</h3>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Responsabilizarse de la recogida, transporte y manipulación posterior de los alimentos.</li>
              <li>Disponer de los medios adecuados para garantizar la cadena de frío cuando sea necesario.</li>
              <li>La entidad puede rechazar una donación si considera que no cumple condiciones de seguridad, transporte o conservación.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">5. Verificación de cuentas</h2>
            <p>
              ComidaConecta se reserva el derecho de verificar la identidad y actividad de
              comercios y entidades registradas. Las cuentas que no cumplan con los requisitos
              podrán ser desactivadas sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">6. Propiedad intelectual</h2>
            <p>
              El nombre, logotipo y diseño de ComidaConecta están protegidos. Queda prohibido su
              uso sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">7. Modificaciones</h2>
            <p>
              ComidaConecta se reserva el derecho de modificar estas condiciones en cualquier momento.
              Los cambios serán notificados a los usuarios registrados con antelación suficiente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">8. Legislación aplicable</h2>
            <p>
              Estas condiciones se rigen por la legislación española. Para cualquier controversia,
              las partes se someten a los juzgados y tribunales del domicilio del titular.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">9. Contacto</h2>
            <p>
              Para cualquier consulta sobre estas condiciones, puedes escribirnos a hola@comidaconecta.org.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

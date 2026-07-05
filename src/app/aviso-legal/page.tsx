import Link from 'next/link'
import { Leaf } from 'lucide-react'

export default function AvisoLegalPage() {
  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
          <Leaf className="w-5 h-5 text-emerald-400" />
          <span className="font-bold">ComidaConecta</span>
        </Link>

        <h1 className="text-3xl font-bold mb-8">Aviso Legal</h1>

        <div className="prose prose-invert prose-sm max-w-none text-zinc-300 space-y-6">

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">1. Titularidad</h2>
            <p>
              En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información
              y de Comercio Electrónico (LSSI-CE), se informa:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li><strong>Denominación:</strong> ComidaConecta</li>
              <li><strong>Titular:</strong> [Nombre del titular / entidad responsable]</li>
              <li><strong>NIF/CIF:</strong> [NIF del titular]</li>
              <li><strong>Domicilio:</strong> [Dirección física]</li>
              <li><strong>Correo electrónico:</strong> [email de contacto]</li>
              <li><strong>Teléfono:</strong> [teléfono de contacto]</li>
              <li><strong>Registro:</strong> [Datos de inscripción registral, si procede]</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">2. Objeto</h2>
            <p>
              El presente Aviso Legal regula el uso del sitio web <strong>comidaconecta.org</strong>,
              una plataforma tecnológica cuya finalidad es conectar comercios con excedente alimentario
              y entidades sociales para facilitar la donación de alimentos. ComidaConecta no participa
              en la manipulación, transporte, almacenamiento ni distribución de los alimentos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">3. Condiciones de acceso y uso</h2>
            <p>
              El acceso al sitio web y su uso es gratuito, sin perjuicio de los modelos de contribución
              voluntaria que puedan establecerse para comercios, siempre comunicados con antelación.
              El usuario se compromete a hacer un uso adecuado de la plataforma y a no emplearla para
              actividades ilícitas o contrarias a la buena fe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">4. Propiedad intelectual</h2>
            <p>
              Todos los contenidos del sitio web (textos, imágenes, logotipos, diseño) son propiedad
              de ComidaConecta o cuentan con la correspondiente licencia de uso. Queda prohibida su
              reproducción total o parcial sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">5. Exclusión de responsabilidad</h2>
            <p>
              ComidaConecta no se responsabiliza de los daños o perjuicios derivados del uso indebido
              de la plataforma, de la calidad de los alimentos donados, ni de las actuaciones de los
              comercios o entidades sociales registradas. La plataforma actúa exclusivamente como
              intermediaria tecnológica.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">6. Legislación aplicable</h2>
            <p>
              Las presentes condiciones se rigen por la legislación española. Para cualquier
              controversia derivada del uso del sitio web, las partes se someten a los juzgados
              y tribunales del domicilio del titular.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

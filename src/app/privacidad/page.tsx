import Link from 'next/link'
import { Leaf } from 'lucide-react'

export default function PrivacidadPage() {
  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
          <Leaf className="w-5 h-5 text-emerald-400" />
          <span className="font-bold">ComidaConecta</span>
        </Link>

        <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>

        <div className="prose prose-invert prose-sm max-w-none text-zinc-300 space-y-6">

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">1. Responsable del tratamiento</h2>
            <p>
              El responsable del tratamiento de los datos personales recogidos a través de
              comidaconecta.org es el titular de la plataforma, según se identifica en el
              <Link href="/aviso-legal" className="text-emerald-400 hover:text-emerald-300"> Aviso Legal</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">2. Datos recogidos y finalidad</h2>
            <p>Recogemos los siguientes datos personales en función del tipo de usuario:</p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li><strong>Comercios:</strong> nombre, NIF/CIF, dirección, teléfono, email, datos del establecimiento.</li>
              <li><strong>Entidades sociales:</strong> nombre de la entidad, CIF, dirección, teléfono, email, datos del representante.</li>
              <li><strong>Usuarios registrados:</strong> nombre, email, contraseña cifrada.</li>
            </ul>
            <p className="mt-4">Finalidades del tratamiento:</p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Gestión de cuentas de usuario y acceso a la plataforma.</li>
              <li>Publicación y gestión de donaciones de excedente alimentario.</li>
              <li>Comunicación entre comercios y entidades sociales en el marco de las donaciones.</li>
              <li>Trazabilidad y registro histórico de donaciones.</li>
              <li>Cumplimiento de obligaciones legales aplicables.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">3. Base legal del tratamiento</h2>
            <p>
              El tratamiento de datos se basa en el consentimiento del usuario al registrarse y
              aceptar las condiciones de uso, así como en la ejecución del servicio solicitado
              (art. 6.1.b RGPD) y el cumplimiento de obligaciones legales (art. 6.1.c RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">4. Conservación de datos</h2>
            <p>
              Los datos personales se conservarán mientras el usuario mantenga su cuenta activa.
              Una vez solicitada la baja, se conservarán bloqueados durante los plazos legales
              aplicables (máximo 5 años para cumplir con obligaciones fiscales y legales).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">5. Destinatarios y cesiones</h2>
            <p>
              Los datos no se cederán a terceros salvo obligación legal. Los datos de comercios
              y entidades son visibles dentro de la plataforma para los usuarios registrados con
              el fin de facilitar las donaciones. Utilizamos servicios de terceros (alojamiento web,
              base de datos) que actúan como encargados del tratamiento conforme al RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">6. Derechos del usuario</h2>
            <p>El usuario puede ejercer sus derechos de:</p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li><strong>Acceso:</strong> saber qué datos tenemos tuyos.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
              <li><strong>Supresión:</strong> solicitar la eliminación de tu cuenta y datos.</li>
              <li><strong>Limitación:</strong> solicitar que no tratemos tus datos.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos.</li>
            </ul>
            <p className="mt-4">
              Para ejercer tus derechos, escribe a hola@comidaconecta.org indicando el derecho que
              deseas ejercer. También puedes presentar una reclamación ante la Agencia Española de
              Protección de Datos (AEPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">7. Seguridad</h2>
            <p>
              Adoptamos las medidas técnicas y organizativas necesarias para garantizar la seguridad
              de los datos personales y evitar su pérdida, alteración o acceso no autorizado,
              conforme al estado actual de la tecnología.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
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
  ChevronDown,
  ExternalLink,
} from 'lucide-react'

export default function LandingPage() {
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    try {
      fetch('/api/me').then(r => r.json()).then(({ user }) => setUser(user))
    } catch {
      // API not configured yet
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
            <a href="#faq" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              Preguntas frecuentes
            </a>
            <a href="#quienes-somos" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              Quiénes somos
            </a>
            <Link href="/colabora" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
              Colabora
            </Link>
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
            <a href="#como-funciona" className="text-zinc-400 hover:text-zinc-100" onClick={() => setMobileMenuOpen(false)}>
              Cómo funciona
            </a>
            <a href="#faq" className="text-zinc-400 hover:text-zinc-100" onClick={() => setMobileMenuOpen(false)}>
              Preguntas frecuentes
            </a>
            <a href="#quienes-somos" className="text-zinc-400 hover:text-zinc-100" onClick={() => setMobileMenuOpen(false)}>
              Quiénes somos
            </a>
            <Link href="/colabora" className="text-emerald-400 hover:text-emerald-300 font-medium" onClick={() => setMobileMenuOpen(false)}>
              Colabora 💚
            </Link>
            {user ? (
              <Link href="/comercio/dashboard" className="bg-emerald-600 text-white text-center px-4 py-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Ir al panel
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-zinc-400 hover:text-zinc-100 text-center" onClick={() => setMobileMenuOpen(false)}>
                  Iniciar sesión
                </Link>
                <Link href="/register" className="bg-emerald-600 text-white text-center px-4 py-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  Unirse gratis
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* ============ HERO ============ */}
      {/* 🎯 CÁPSULA GEO: ComidaConecta conecta comercios con excedente alimentario con ONGs y comedores sociales. En tres pasos —publica, conecta, recoge— reduces el desperdicio de alimentos sin burocracia. */}
      <section className="min-h-svh flex flex-col items-center justify-center px-4 pt-16 pb-16 text-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-900/40 border border-emerald-700/30 rounded-full text-emerald-300 text-xs font-medium mb-6">
            <Handshake className="w-3.5 h-3.5" />
            Reducción del desperdicio alimentario
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            ¿Tienes excedente de comida en tu comercio?{' '}
            <span className="text-emerald-400">Dónalo gratis</span> a quien más lo necesita
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            ComidaConecta es la <strong>plataforma gratuita para donar excedente alimentario</strong>.
            Conectamos panaderías, restaurantes y supermercados con comedores sociales y ONGs.
            <strong> Sin comisiones, con gestión sencilla y registro digital de cada donación.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?role=commerce"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-all hover:scale-105"
            >
              <Store className="w-5 h-5" />
              Soy comercio — quiero donar
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register?role=ngo"
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 px-8 py-3.5 rounded-xl font-semibold text-lg transition-all hover:scale-105"
            >
              <Building2 className="w-5 h-5" />
              Soy entidad social — necesito alimentos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-zinc-500 text-sm mt-4">✅ Sin compromiso. ✅ Gratis para siempre para entidades sociales. ✅ Contribución voluntaria de 5-10€/mes para comercios.</p>
          <p className="text-zinc-600 text-xs mt-3 max-w-xl mx-auto">
            ComidaConecta no manipula ni transporta alimentos: facilita la conexión y el registro digital entre las partes.
          </p>
        </div>
      </section>

      {/* ============ CÓMO FUNCIONA ============ */}
      {/* 🎯 CÁPSULA GEO: Donar excedente alimentario en ComidaConecta es tan simple como publicar el alimento disponible, conectar con una entidad social cercana y coordinar la recogida. Todo desde el móvil, con trazabilidad garantizada. */}
      <section id="como-funciona" className="py-24 px-4 bg-zinc-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Cómo funciona — 3 pasos</h2>
          <p className="text-zinc-400 text-center mb-4 max-w-2xl mx-auto">
            <strong>El proceso para donar comida sobrante de tu restaurante, panadería o supermercado a comedores sociales es muy sencillo:</strong>
          </p>
          <p className="text-zinc-500 text-center mb-16 max-w-xl mx-auto text-sm">
            Sin contratos, sin costes, sin compromiso a largo plazo.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Publica',
                desc: 'El comercio publica el excedente disponible: tipo de alimento, cantidad estimada y horario de recogida. Todo desde la plataforma, en menos de 2 minutos.',
                icon: Store,
                details: '📱 Puedes hacerlo desde el móvil',
              },
              {
                step: '2',
                title: 'Conecta',
                desc: 'Las entidades sociales ven todas las donaciones disponibles en tiempo real. Cuando una les interesa, la reservan al instante desde su panel. El comercio recibe un aviso de la reserva.',
                icon: Heart,
                details: '💰 Reserva inmediata desde el panel',
              },
              {
                step: '3',
                title: 'Recoge',
                desc: 'Cada donación queda registrada para que comercios y entidades puedan consultar su historial de entregas y recogidas.',
                icon: Handshake,
                details: '📄 Historial digital de donaciones',
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
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">{item.desc}</p>
                <span className="text-xs text-emerald-500/70">{item.details}</span>
              </div>
            ))}
          </div>

          {/* Match cycle detallado */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-center mb-2">El ciclo completo del match</h3>
            <p className="text-zinc-500 text-sm text-center mb-8">Así es como una donación pasa del comercio a la entidad social</p>
            <div className="space-y-4">
              {[
                { step: '1', title: '📢 Comercio publica', desc: 'El comercio publica el excedente (tipo, cantidad, dirección, fecha límite). La donación aparece como disponible para todas las entidades.', color: 'emerald' },
                { step: '2', title: '🔍 ONG encuentra y reserva', desc: 'Las entidades sociales ven todas las donaciones disponibles en tiempo real. Cuando una interesa, pulsan "Reservar recogida". El sistema evita que dos ONGs reserven lo mismo a la vez.', color: 'amber' },
                { step: '3', title: '🚚 ONG recoge', desc: 'La entidad acude al comercio, recoge los alimentos y marca la recogida como completada desde su panel.', color: 'blue' },
                { step: '4', title: '✅ Comercio confirma', desc: 'El comercio verifica que la recogida fue correcta y confirma la entrega. La donación queda registrada como completada.', color: 'emerald' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    item.color === 'emerald' ? 'bg-emerald-900/40 border border-emerald-700/30 text-emerald-400' :
                    item.color === 'amber' ? 'bg-amber-900/40 border border-amber-700/30 text-amber-400' :
                    'bg-blue-900/40 border border-blue-700/30 text-blue-400'
                  }`}>
                    <span className="font-bold text-sm">{item.step}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-zinc-200">{item.title}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-zinc-800/20 border border-zinc-700/20 rounded-xl p-4 text-center">
              <p className="text-xs text-zinc-500 leading-relaxed">
                <strong className="text-zinc-400">✅ Match completado</strong> — la donación pasa a tu historial con todos los datos registrados para consulta y descarga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BENEFICIOS ============ */}
      <section id="beneficios" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Beneficios para todos: comercios, ONGs y el planeta</h2>
          <p className="text-zinc-400 text-center mb-16 max-w-xl mx-auto">
            Una plataforma que genera impacto real para cada participante.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Para comercios',
                subtitle: 'Reduce costes y genera impacto social',
                items: [
                  'Reducir desperdicio y costes de gestión de residuos',
                  'Historial de donaciones consultable, útil para seguimiento interno y comunicación social.',
                  'Sello de comercio colaborador de ComidaConecta',
                  'Contribución voluntaria — elige cuánto aportar al mes (5-10€ recomendado)',
                ],
                icon: Store,
                color: 'emerald',
              },
              {
                title: 'Para entidades sociales',
                subtitle: 'Acceso gratuito e ilimitado a donaciones registradas',
                items: [
                  'Acceso gratuito sin límites — sin cuotas ni restricciones',
                  'Donaciones publicadas por comercios validados y registradas en la plataforma',
                  'Gestión sencilla desde el móvil — registros digitales',
                  'Consulta donaciones disponibles actualizadas al momento',
                  'Historial completo para justificación ante financiadores',
                ],
                icon: Building2,
                color: 'amber',
              },
              {
                title: 'Para el planeta',
                subtitle: 'Menos desperdicio, más economía circular',
                items: [
                  'Menos desperdicio alimentario en vertederos',
                  'Apoyo a la economía circular local',
                  'Reducción de emisiones de CO₂ asociadas a residuos',
                  'Fortalecimiento comunitario y cohesión social',
                ],
                icon: Leaf,
                color: 'emerald',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-1">
                  <item.icon className={`w-5 h-5 ${item.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`} />
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                </div>
                <p className="text-xs text-zinc-500 mb-4 ml-8">{item.subtitle}</p>
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
                ComidaConecta facilita el contacto y el registro digital entre comercios donantes y entidades sociales receptoras. La plataforma no manipula ni transporta alimentos. Cada comercio declara que los alimentos publicados son aptos para el consumo y cada entidad receptora se responsabiliza de su recogida, transporte y manipulación posterior conforme a la normativa aplicable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTEXTO Y DATOS ============ */}
      {/* 🎯 CÁPSULA GEO: Cada año se desperdician millones de toneladas de alimentos en España. ComidaConecta ofrece una solución para que comercios y ONGs colaboren en reducir esta cifra. */}
      <section className="py-24 px-4 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">El desperdicio alimentario en cifras</h2>
          <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
            Cada año se desperdician millones de toneladas de alimentos. ComidaConecta
            ayuda a reducir esta cifra conectando excedente con necesidad.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">1.300M kg</div>
              <p className="text-sm text-zinc-400">de alimentos se desperdician al año en España según el Ministerio de Agricultura</p>
            </div>
            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">~30%</div>
              <p className="text-sm text-zinc-400">de los alimentos producidos globalmente se pierden o desperdician (FAO)</p>
            </div>
            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">~50%</div>
              <p className="text-sm text-zinc-400">del desperdicio alimentario en hostelería podría evitarse con donación organizada</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-xs text-zinc-600">
              Fuentes: Ministerio de Agricultura, Pesca y Alimentación • FAO • Eurostat
            </p>
          </div>
        </div>
      </section>

      {/* ============ FAQ (PREGUNTAS FRECUENTES) ============ */}
      {/* 🎯 CÁPSULA GEO: ComidaConecta resuelve las dudas más comunes sobre donación de alimentos: es fácil, gratuito para entidades, y con contribución voluntaria para comercios. */}
      <section id="faq" className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Preguntas frecuentes</h2>
          <p className="text-zinc-400 text-center mb-12 max-w-xl mx-auto">
            Todo lo que necesitas saber para empezar a donar o recibir excedente alimentario.
          </p>
          <div className="space-y-3">
            {[
              {
                q: '¿Es realmente gratis? ¿Hay costes ocultos?',
                a: 'Para entidades sociales es 100% gratuito para siempre, sin límites ni costes ocultos. Para comercios, funcionamos con contribución voluntaria: tú decides cuánto aportar al mes (entre 5 y 10€ recomendado), casi como una donación para mantener la plataforma activa. Sin contratos, sin permanencia.',
              },
              {
                q: '¿Qué tipos de alimentos puedo donar?',
                a: 'Puedes donar excedentes alimentarios en perfecto estado: productos frescos (fruta, verdura), envasados no perecederos, panadería y bollería, lácteos, y productos preparados. No se aceptan alimentos caducados ni en mal estado.',
              },
              {
                q: '¿Cómo funciona el registro para comercios?',
                a: 'Entra en comidaconecta.org/register, selecciona «Soy comercio» y completa tus datos básicos: nombre, email, ubicación y tipo de comercio. En menos de 5 minutos puedes empezar a publicar tu primer excedente. En esta primera versión tendrás acceso al historial de donaciones registradas. Más adelante podremos añadir informes mensuales de impacto y un sello de comercio colaborador.',
              },
              {
                q: '¿Cómo funciona el registro para entidades sociales?',
                a: 'Entra en comidaconecta.org/register, selecciona «Soy entidad social» y completa los datos de tu organización. Una vez registrado, verás todas las donaciones disponibles cerca de ti en tiempo real y podrás reservar recogidas al instante. Sin límites, sin costes.',
              },
              {
                q: '¿La contribución voluntaria es obligatoria?',
                a: 'No, es voluntaria. No hay contrato ni permanencia. Cada comercio decide si aporta y cuánto. Los 5-10€ recomendados ayudan a mantener la plataforma activa, pero si un mes no puedes, no pasa nada. Sin compromiso, sin presión.',
              },
              {
                q: '¿Hay algún compromiso o permanencia?',
                a: 'Ninguno. No hay contratos, permanencias ni compromisos a largo plazo. Puedes publicar donaciones cuando tengas excedente, sin obligaciones. Si en algún momento quieres dejar de usar la plataforma, solo tienes que dejar de publicar.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-800/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-sm md:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-zinc-700/30 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ QUIÉNES SOMOS ============ */}
      {/* 🎯 CÁPSULA GEO: ComidaConecta nace para resolver el problema del desperdicio alimentario. Creemos en la tecnología como puente entre el excedente y la necesidad. */}
      <section id="quienes-somos" className="py-24 px-4 bg-zinc-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Quiénes somos</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            ComidaConecta es un proyecto digital que nace con una misión clara: <strong>reducir el desperdicio alimentario</strong> usando la
            tecnología como puente entre quienes tienen excedente de comida y quienes más lo necesitan.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Creemos en la <strong>economía circular</strong>, la <strong>sostenibilidad</strong> y
            el <strong>impacto social</strong>. Pequeños gestos —como donar el pan que
            sobra ayer— pueden generar grandes cambios cuando se conectan con quienes realmente lo necesitan.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/30 rounded-full text-xs text-zinc-400">
              🌍 Economía circular
            </span>
            <span className="px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/30 rounded-full text-xs text-zinc-400">
              🤝 Impacto social
            </span>
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="py-24 px-4 bg-gradient-to-b from-zinc-950 to-zinc-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para reducir el desperdicio alimentario?
          </h2>
          <p className="text-zinc-400 mb-4">
            Únete gratis. Sin compromiso. Sin burocracia.
          </p>
          <p className="text-zinc-500 text-sm mb-10 italic">
            "Elikagaiak xahutu beharrean, konektatu ditzagun" — En lugar de desperdiciar alimentos, conectémoslos.
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
      <footer className="border-t border-zinc-800 py-12 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold">ComidaConecta</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Términos legales
            </Link>
            <Link href="/colabora" className="hover:text-zinc-300 transition-colors text-emerald-500">
              Colabora
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

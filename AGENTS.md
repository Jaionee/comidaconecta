# ComidaConecta — AGENT.md

## 📋 Descripción
MVP de conexión entre comercios con excedente de alimentos y ONGs/comedores sociales. Next.js 16 + Supabase.

## 🚀 Stack
- **Framework:** Next.js 16.2.9 (Turbopack)
- **UI:** React 19 + Tailwind CSS 4
- **Backend:** Supabase (PostgreSQL, Auth, Row Level Security)
- **Forms:** react-hook-form + zod
- **Íconos:** lucide-react
- **Hosting:** Vercel (https://comidaconecta.vercel.app)

## 🗂️ Estructura del proyecto
```
src/
├── app/
│   ├── page.tsx              # Home (landing pública)
│   ├── layout.tsx            # Layout global + providers
│   ├── login/                # Inicio de sesión
│   ├── register/             # Registro de usuarios
│   ├── terms/                # Términos legales
│   ├── auth/callback/        # callback OAuth de Supabase
│   ├── admin/                # Panel admin
│   │   ├── dashboard/        # Dashboard admin
│   │   ├── donaciones/       # Gestión de donaciones
│   │   └── usuarios/         # Gestión de usuarios
│   ├── comercio/             # Panel comercio
│   │   ├── dashboard/        # Dashboard comercio
│   │   ├── donar/            # Publicar donación
│   │   ├── historial/        # Historial de donaciones
│   │   ├── informe/          # Informes/estadísticas
│   │   └── perfil/           # Editar perfil comercio
│   ├── ong/                  # Panel ONG
│   │   ├── dashboard/        # Dashboard ONG
│   │   ├── donaciones/       # Buscar donaciones
│   │   ├── historial/        # Historial de reservas
│   │   └── perfil/           # Editar perfil ONG
│   └── actions/              # Server Actions
│       ├── auth.ts           # Auth (login, register, logout)
│       ├── profiles.ts       # CRUD perfiles
│       ├── donations.ts      # CRUD donaciones
│       ├── reservations.ts   # Reservas (reserve_donation)
│       └── admin.ts          # Acciones de admin
├── lib/
│   └── supabase/
│       ├── client.ts         # Cliente Supabase browser
│       └── server.ts         # Cliente Supabase server
├── components/
│   └── toaster.tsx           # Toast notifications
└── types/
    └── supabase.ts           # Tipos TypeScript de Supabase
```

## 🗄️ Base de datos (Supabase)
**Proyecto:** `ouyvkdzwpvcztxybwrku`

### Tablas
1. **profiles** — Extiende auth.users (id, email, role, name, phone)
2. **commerces** — Perfiles de comercios (business_name, business_type, address, city)
3. **ngos** — Perfiles de ONGs (organization_name, organization_type, accepted_food_types)
4. **donations** — Donaciones de alimentos (commerce_id, title, food_type, quantity, pickup_deadline, status)
5. **reservations** — Reservas de ONGs (donation_id, ngo_id, status)

### Roles
- `commerce` — Empresa que dona alimentos
- `ngo` — ONG/comedor que recibe
- `admin` — Superadministrador

### Funciones
- `reserve_donation(uuid, uuid)` — Reserva atómica con control de concurrencia

## 🔐 Variables de entorno
```env
NEXT_PUBLIC_SUPABASE_URL=https://ouyvkdzwpvcztxybwrku.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (anon key pública)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (service role - SOLO server)
```

## 🌐 URLs
- **Producción:** https://comidaconecta.vercel.app
- **GitHub:** https://github.com/Jaionee/comidaconecta
- **Supabase:** https://supabase.com/dashboard/project/ouyvkdzwpvcztxybwrku

## 🧪 Datos de prueba (seed.sql)
Para crear usuarios de prueba:
1. Crear usuario en Supabase Auth → SQL Editor
2. Ejecutar `supabase/seed.sql` reemplazando los UUIDs

## 🛠️ Comandos útiles
```bash
# Desarrollo local
npm run dev

# Build
npm run build

# Deploy a Vercel
npx vercel --prod --token <token>

# Migración Supabase
npx supabase db push
```

## 📌 Convenciones
- Server Actions en `src/app/actions/`
- Componentes reutilizables en `src/components/`
- Clientes Supabase en `src/lib/supabase/`
- Middleware de autenticación en `src/middleware.ts`
- Estilos con Tailwind CSS v4
- Tipos compartidos en `src/types/`

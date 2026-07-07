// Client-side API client for ComidaConecta Worker API
// Works in both server and browser contexts

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

function getBaseUrl(): string {
  if (API_URL) return API_URL
  return ''
}

export async function apiRequest<T = any>(
  method: string,
  path: string,
  data?: any,
  token?: string | null
): Promise<ApiResponse<T>> {
  const baseUrl = getBaseUrl()
  if (!baseUrl && typeof window === 'undefined') {
    return { success: false, error: 'API_URL no configurada. Define NEXT_PUBLIC_API_URL' }
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    })
    const json = await res.json()
    return json as ApiResponse<T>
  } catch (err: any) {
    return { success: false, error: err.message || 'Error de conexión con el servidor' }
  }
}

// ─── Auth ──────────────────────────────────────────────
export const api = {
  auth: {
    register: (email: string, password: string, name: string, phone: string, role: string) =>
      apiRequest('POST', '/api/auth/register', { email, password, name, phone, role }),

    login: (email: string, password: string) =>
      apiRequest<{ token: string; user: { id: string; email: string; name: string; role: string } }>(
        'POST', '/api/auth/login', { email, password }
      ),

    me: (token: string) =>
      apiRequest<{ id: string; email: string; name: string; phone: string; role: string }>(
        'GET', '/api/auth/me', undefined, token
      ),
  },

  // ─── Commerces ───────────────────────────────────────
  commerces: {
    create: (data: any, token: string) =>
      apiRequest('POST', '/api/commerces', data, token),

    get: (id: string, token: string) =>
      apiRequest('GET', `/api/commerces/${id}`, undefined, token),

    update: (id: string, data: any, token: string) =>
      apiRequest('PUT', `/api/commerces/${id}`, data, token),
  },

  // ─── NGOs ────────────────────────────────────────────
  ngos: {
    create: (data: any, token: string) =>
      apiRequest('POST', '/api/ngos', data, token),

    get: (id: string, token: string) =>
      apiRequest('GET', `/api/ngos/${id}`, undefined, token),

    update: (id: string, data: any, token: string) =>
      apiRequest('PUT', `/api/ngos/${id}`, data, token),
  },

  // ─── Donations ───────────────────────────────────────
  donations: {
    list: (token?: string) =>
      apiRequest('GET', '/api/donations', undefined, token),

    create: (data: any, token: string) =>
      apiRequest('POST', '/api/donations', data, token),

    reserve: (id: string, token: string) =>
      apiRequest('POST', `/api/donations/${id}/reserve`, undefined, token),

    collect: (id: string, token: string) =>
      apiRequest('PUT', `/api/donations/${id}/collect`, undefined, token),

    delete: (id: string, token: string) =>
      apiRequest('DELETE', `/api/donations/${id}`, undefined, token),
  },

  // ─── Reservations ────────────────────────────────────
  reservations: {
    list: (token: string) =>
      apiRequest('GET', '/api/reservations', undefined, token),

    pickup: (id: string, token: string) =>
      apiRequest('PUT', `/api/reservations/${id}/pickup`, undefined, token),
  },

  // ─── Admin ──────────────────────────────────────────
  admin: {
    verifyCommerce: (id: string, token: string) =>
      apiRequest('POST', `/api/admin/commerces/${id}/verify`, undefined, token),

    dashboard: (token: string) =>
      apiRequest('GET', '/api/admin/dashboard', undefined, token),
  },

  // ─── Dashboards ────────────────────────────────────
  dashboards: {
    commerce: (token: string) =>
      apiRequest('GET', '/api/comercio/dashboard', undefined, token),

    ngo: (token: string) =>
      apiRequest('GET', '/api/ong/dashboard', undefined, token),
  },
}

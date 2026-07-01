// Auth callback is no longer needed with JWT-based auth.
// This route previously handled Supabase's OAuth redirect callback.
// Now login is handled directly via server actions.
import { redirect } from 'next/navigation'

export async function GET() {
  redirect('/login')
}

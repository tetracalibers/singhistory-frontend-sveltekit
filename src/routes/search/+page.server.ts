import type { PageServerLoad } from './$types'
import { getSpotifyAccessToken } from '@/lib/server/auth-spotify'

export const load: PageServerLoad = async () => {
  const token = await getSpotifyAccessToken()
  return { spotify: { token } }
}

import { useExternalApi } from '$lib/external-api'
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private'

/* CONSTANTS ---------------------------------- */

const SPOTIFY_AUTH_TOKEN = Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString(
  'base64'
)

const SPOTIFY_AUTH_API_BASE = 'https://accounts.spotify.com/api/token'

/* ENTITIES ----------------------------------- */

interface AccessToken {
  value: string
  type: string
}
/* RESPONSE TYPE ------------------------------ */

interface SpotifyAuthResponse {
  access_token: string
  token_type: string
}

/* METHODS ------------------------------------ */

export const getSpotifyAccessToken = async (): Promise<AccessToken> => {
  const headers: HeadersInit = {}
  headers['Authorization'] = `Basic ${SPOTIFY_AUTH_TOKEN}`
  headers['Content-Type'] = 'application/x-www-form-urlencoded'
  const api = useExternalApi(SPOTIFY_AUTH_API_BASE, headers)
  const body = { grant_type: 'client_credentials' }
  const result = await api<SpotifyAuthResponse>('/', { method: 'POST', body })
  return {
    value: result.access_token,
    type: result.token_type
  }
}

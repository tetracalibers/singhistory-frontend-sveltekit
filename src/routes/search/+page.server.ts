import type { PageServerLoad } from './$types'
import { getSpotifyAccessToken } from '@/lib/server/auth-spotify'
import { SINGHIS_ACCESS_TOKEN_KEY } from '@/lib/constants'
import * as api from '$lib/api-client'

interface History {
  id: string
  artistName: string
  songName: string
  jacketUrl?: string
  singDate: Date
  singKey: number
  rating: number
  score?: number
  memo?: string
  createdAt: Date
  updatedAt: Date
}

export const load: PageServerLoad = async ({ cookies }) => {
  const spotify_token = await getSpotifyAccessToken()
  const token = cookies.get(SINGHIS_ACCESS_TOKEN_KEY)
  // TODO: 実際には、ページネーションの1ページ目のみ（最初に表示する分だけ）取得する
  const history = await api.get<History>('sing-history', token)
  return { spotify: { token: spotify_token }, data: { history: history.data } }
}

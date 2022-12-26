import { useExternalApi } from './external-api'

/* CONSTANTS ---------------------------------- */

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1/'

/* ENTITIES ----------------------------------- */

interface AccessToken {
  value: string
  type: string
}

export interface Artist {
  id: string
  name: string
}

export interface Album {
  id: string
  name: string
  release_date: `${number}-${number}-${number}`
  release_date_precision: 'day'
  total_tracks: number
  artists: Artist[]
  images: {
    height: 640 | 300 | 64
    width: 640 | 300 | 64
    url: string
  }[]
}

export interface Track {
  id: string
  name: string
  album: Album
  artists: Artist[]
}

interface SpotifyArtistsResponse {
  artists: {
    items: Artist[]
  }
}

interface SpotifyTracksResponse {
  tracks: {
    items: Track[]
  }
}

/* METHODS ------------------------------------ */

// 全角文字を含むか
// eslint-disable-next-line no-control-regex
const hasMultiByte = (str: string) => !!str.match(/[^\x01-\x7E\uFF61-\uFF9F]+/)

const formatQuery = (artistQ: string, songQ: string) => {
  return (
    [
      { query: artistQ, type: 'artist' },
      { query: songQ, type: 'track' }
    ]
      .map((info) => ({ ...info, query: info.query.trim() }))
      .filter(({ query }) => query.length > 0)
      .map((info) => ({ ...info, zenkaku: hasMultiByte(info.query) }))
      // 全角は前に集める
      .sort((a, b) => {
        if (a.zenkaku && !b.zenkaku) return -1
        if (!a.zenkaku && b.zenkaku) return 1
        return 0
      })
      .map(({ query, type, zenkaku }) => (zenkaku ? query : type + ':' + query))
      .join(' ')
  )
}

export class SpotifySearch {
  #api: ReturnType<typeof useExternalApi>

  constructor(token: AccessToken) {
    const headers: HeadersInit = {}
    headers['Authorization'] = `${token.type} ${token.value}`
    this.#api = useExternalApi(SPOTIFY_API_BASE, headers)
  }

  async artistSearch(artistQuery: string) {
    const query = formatQuery(artistQuery, '')
    const data = await this.#api<SpotifyArtistsResponse>('/search?type=artist&q=' + query)
    return data?.artists?.items ?? []
  }

  async songSearch(songQuery: string, artistQuery: string) {
    const query = formatQuery(artistQuery, songQuery)
    const data = await this.#api<SpotifyTracksResponse>(`/search?type=track&q=${query}`)
    return data?.tracks?.items ?? []
  }

  async getArtistTracks(artistName: string, songQuery?: string) {
    const query = formatQuery(artistName, songQuery ?? '')
    const data = await this.#api<SpotifyTracksResponse>(`/search?type=track&q=${query}`)
    return data?.tracks?.items ?? []
  }
}

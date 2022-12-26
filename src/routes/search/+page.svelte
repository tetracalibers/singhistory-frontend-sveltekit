<script lang="ts">
  import { SpotifySearch, type Artist, type Track } from '@/lib/spotify'
  import type { PageData } from './$types'

  export let data: PageData

  const spotify = new SpotifySearch(data.spotify.token)

  let artistQuery = ''
  let songQuery = ''
  let tracks: Track[] = []
  let artists: Artist[] = []
  let track: Track | null = null
  let artist: Artist | null = null

  const artistSearch = async () => {
    const result = await spotify.artistSearch(artistQuery)
    artists = result
    const isExistTrackOwner = artists.some((_artist) => track?.artists?.[0]?.id === _artist.id)
    if (!isExistTrackOwner) {
      songQuery = ''
      track = null
    }
  }

  const songSearch = async () => {
    const matchSongs = tracks.filter((track) => track.name.includes(songQuery))
    if (matchSongs.length > 0) {
      tracks = matchSongs
      return
    }
    const result = await spotify.songSearch(songQuery, artistQuery)
    tracks = result
  }

  const selectArtist = async (_artist: Artist) => {
    artist = _artist
    artistQuery = _artist.name
    artists = []
    const hasSongs = await spotify.getArtistTracks(artist.name, songQuery)
    tracks = hasSongs
  }

  const selectTrack = (_track: Track) => {
    track = _track
    songQuery = _track.name
    tracks = []
    const thisArtist = _track.artists[0]
    const matchArtist = artists.find((_artist) => _artist.id === thisArtist.id)
    if (matchArtist) {
      artist = matchArtist
      artistQuery = matchArtist.name
      artists = []
    }
  }
</script>

<label for="artist-query">Artist</label>
<div>selected: {artist?.name ?? ''}</div>
<input id="artist-query" type="text" bind:value={artistQuery} on:change={artistSearch} />
<ul>
  {#each artists as _artist}
    <li>
      <button type="button" on:click={() => selectArtist(_artist)}>
        {_artist.name}
      </button>
    </li>
  {/each}
</ul>

<label for="song-query">Song</label>
<div>selected: {track?.name ?? ''}</div>
<input id="song-query" type="text" bind:value={songQuery} on:change={songSearch} />
<ul>
  {#each tracks as _track}
    <li>
      <button type="button" on:click={() => selectTrack(_track)}>
        {_track.name}
      </button>
    </li>
  {/each}
</ul>

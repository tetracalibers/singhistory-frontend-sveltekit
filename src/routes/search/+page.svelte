<script lang="ts">
  import { SpotifySearch, type Artist, type Track } from '@/lib/spotify'
  import type { PageData } from './$types'

  export let data: PageData

  const spotify = new SpotifySearch(data.spotify.token)

  let query: { track: string; artist: string } = { track: '', artist: '' }
  let suggests: { track: Track[]; artist: Artist[] } = { track: [], artist: [] }
  let selected: { track: Track | null; artist: Artist | null } = { track: null, artist: null }

  // TODO: artistInputにfocusが当たったら登録済みartistを候補に出す？

  // TODO: songの入力値はそのままで、songのsuggestは閉じる
  // TODO: 登録したことのあるartistから取得する
  // TODO: [API] 登録したことのあるartistをDBから取得する必要がある
  const onArtistInput = async () => {
    const result = await spotify.artistSearch(query.artist)
    suggests.artist = result
    // song選択中の場合、その曲のartistが今表示しているsuggest内に存在しないなら、song選択をリセットする
    const isExistTrackOwner = suggests.artist.some(
      (_artist) => selected.track?.artists?.[0]?.id === _artist.id
    )
    if (!isExistTrackOwner) {
      query.track = ''
      selected.track = null
    }
  }

  // TODO: 選択済みartistの楽曲のみに絞り込む
  // TODO: 選択済みartistの楽曲のうち、登録したことがあるsongからsuggest
  // TODO: [API] artist選択の時点でそのartistの登録済みsongをDBから取得する必要がある
  const onTrackInput = async () => {
    // まずはsuggest中の曲から絞り込む
    const matchSongs = suggests.track.filter((track) => track.name.includes(query.track))
    if (matchSongs.length > 0) {
      suggests.track = matchSongs
      return
    }
    // suggest中の曲に合致するものがない場合、fetch
    const result = await spotify.songSearch(query.track, query.artist)
    suggests.track = result
  }

  // TODO: 選択済みのsongが選択済みartistの曲でないなら、song選択はリセットする
  const onSelectArtist = async (_artist: Artist) => {
    selected.artist = _artist
    // 選択したartist名を自動入力
    query.artist = _artist.name
    suggests.artist = []
    // song未選択の場合、選択したartistの曲でsong入力値に合致するものがないか調べる
    const hasSongs = await spotify.getArtistTracks(selected.artist.name, query.track)
    suggests.track = hasSongs
  }

  // TODO: 登録したことのあるsongなら、その最新の履歴のsingkeyをデフォルト入力する
  // TODO: [API] その曲の歌唱履歴をDBから取得する必要がある
  const onSelectTrack = (_track: Track) => {
    selected.track = _track
    // 選択したsong名を自動入力
    query.track = _track.name
    suggests.track = []
    const thisArtist = _track.artists[0]
    // 選択した曲のartistを選択状態にする
    const matchArtist = suggests.artist.find((_artist) => _artist.id === thisArtist.id)
    if (matchArtist) {
      selected.artist = matchArtist
      query.artist = matchArtist.name
      suggests.artist = []
    }
  }
</script>

<label for="artist-query">Artist</label>
<div>selected: {selected.artist?.name ?? ''}</div>
<input id="artist-query" type="text" bind:value={query.artist} on:change={onArtistInput} />
<ul>
  {#each suggests.artist as _artist}
    <li>
      <button type="button" on:click={() => onSelectArtist(_artist)}>
        {_artist.name}
      </button>
    </li>
  {/each}
</ul>

<label for="song-query">Song</label>
<div>selected: {selected.track?.name ?? ''}</div>
<input id="song-query" type="text" bind:value={query.track} on:change={onTrackInput} />
<ul>
  {#each suggests.track as _track}
    <li>
      <button type="button" on:click={() => onSelectTrack(_track)}>
        {_track.name}
      </button>
    </li>
  {/each}
</ul>

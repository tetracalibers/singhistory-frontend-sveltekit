<script lang="ts">
  import CrossIcon from '@/icons/cross-icon.svelte'
  import StarIcon from '@/icons/star-icon.svelte'

  const MAX_STAR = 5
  const stars = [...new Array(MAX_STAR)].map((_, i) => i + 1)

  let w: number
  let h: number
  let value = 0
  let coloredMax = 0
  $: landscape = w > h

  const updateColoredStar = (i: number) => (coloredMax = i)
  const uncolorStar = () => updateColoredStar(0)
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />

<div class:landscape class="icon-group" on:mouseout={uncolorStar} on:blur={uncolorStar}>
  <input
    value={0}
    id="rating-0"
    bind:group={value}
    type="radio"
    name="rating"
    class="visually-hidden"
  />
  <label for="rating-0" class="icon --reset">
    <span class="visually-hidden">0 Stars</span>
    <CrossIcon />
  </label>

  {#each stars as i}
    {@const colored = i <= Math.max(value, coloredMax)}
    <input
      value={i}
      id={`rating-${i}`}
      bind:group={value}
      type="radio"
      name="rating"
      class="visually-hidden"
    />
    <label
      for={`rating-${i}`}
      class="icon --star"
      class:colored
      on:mouseover={() => updateColoredStar(i)}
      on:focus={() => updateColoredStar(i)}
    >
      <span class="visually-hidden">{i} Stars</span>
      <StarIcon />
    </label>
  {/each}
</div>

<style>
  .icon-group {
    display: flex;
    gap: 0.1rem;
  }

  .icon {
    font-size: 7vw;
    color: #b8c6db80;
    padding: 0.5rem;
    cursor: pointer;
  }
  /* 横長の場合 */
  .landscape .icon {
    font-size: 7vh;
  }

  .icon.--reset:hover,
  input:focus + .icon.--reset {
    color: #ec4899;
    filter: drop-shadow(0px 0px 6px ivory);
  }

  .icon.--star.colored {
    color: #ebf928;
    filter: drop-shadow(0px 0px 6px ivory);
  }
</style>

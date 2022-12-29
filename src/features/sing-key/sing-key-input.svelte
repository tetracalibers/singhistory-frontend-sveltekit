<script lang="ts">
  import FlatIcon from '@/icons/flat-icon.svelte'
  import SharpIcon from '@/icons/sharp-icon.svelte'

  const LIMIT = 6
  const sharpNumbers = [...new Array(LIMIT)].map((_, i) => i + 1)
  const flatNumbers = [...sharpNumbers].reverse()
  const flatColors = [
    'rgba(4,93,233,1.0)',
    'rgba(13,105,250,1.0)',
    'rgba(40,122,251,1.0)',
    'rgba(67,138,251,1.0)',
    'rgba(93,155,252,1.0)',
    'rgba(120,172,252,1.0)'
  ]
  const sharpColors = [
    'rgba(240,116,187,1.0)',
    'rgba(237,88,174,1.0)',
    'rgba(235,60,160,1.0)',
    'rgba(232,32,147,1.0)',
    'rgba(212,21,131,1.0)',
    'rgba(185,19,114,1.0)'
  ]

  let value = 0
  let w: number
  let h: number
  $: landscape = w > h
</script>

<svelte:window />

<div class:landscape class="group">
  <span class="icon --flat" aria-hidden="true">
    <FlatIcon />
  </span>
  {#each flatNumbers as v, i}
    {@const id = `sing-key-flat-${v}`}
    {@const active = -1 * v === value}
    <input
      value={v * -1}
      {id}
      bind:group={value}
      type="radio"
      name="sing-key"
      class="visually-hidden"
    />
    <label for={id} style:--color={flatColors[i]} class="number --flat" class:active>
      <span class="visually-hidden">flat {v}</span>
      <span>{v}</span>
    </label>
  {/each}
  <input
    value={0}
    id="sing-key-0"
    bind:group={value}
    type="radio"
    name="sing-key"
    class="visually-hidden"
  />
  <label for="sing-key-0" class="number --zero" class:active={value === 0}>
    <span class="visually-hidden">default key</span>
    <span>0</span>
  </label>
  {#each sharpNumbers as v, i}
    {@const id = `sing-key-sharp-${v}`}
    {@const active = v === value}
    <input value={v} {id} bind:group={value} type="radio" name="sing-key" class="visually-hidden" />
    <label for={id} style:--color={sharpColors[i]} class="number --sharp" class:active>
      <span class="visually-hidden">sharp {v}</span>
      <span>{v}</span>
    </label>
  {/each}
  <span class="icon --sharp" aria-hidden="true">
    <SharpIcon />
  </span>
</div>

<style>
  .group {
    display: grid;
    grid-template-columns: repeat(15, 1fr);
    filter: blur(0.25px) opacity(0.65);
    gap: 1px;
  }
  .icon {
    width: 100%;
    height: 100%;
    display: grid;
    align-items: center;
  }
  .icon.--flat {
    justify-items: flex-end;
    color: rgba(4, 93, 233, 1);
  }
  .icon.--sharp {
    justify-items: flex-start;
    color: rgba(185, 19, 114, 1);
  }
  .icon :global(> svg) {
    width: 70%;
    height: 70%;
    stroke-width: 20px;
    stroke: white;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(1px 1px 5px #eef1ff);
    opacity: 0.75;
  }
  .number {
    font-family: 'Emilys Candy';
    line-height: 1;
    border-radius: 50%;
    cursor: pointer;
    aspect-ratio: 1 / 1;
    font-size: 3vw;
    display: grid;
    place-content: center;
    box-shadow: rgb(25 75 124 / 35%) 0px -2px 6px 0px inset;
  }
  .landscape .number {
    font-size: 3vh;
  }
  .number.--flat,
  .number.--sharp {
    background: var(--color);
  }
  .number.--zero {
    background: linear-gradient(289deg, rgba(243, 144, 201, 1) 0%, rgba(147, 188, 253, 1) 100%);
  }
  /** auto contrast */
  .number > span {
    background: inherit;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: invert(100%) grayscale(100%) contrast(100);
  }
  input:hover + .number,
  input:focus + .number {
    box-shadow: ivory 0px 0px 10px, ivory 0px 0px 10px inset;
  }
  .number.active {
    box-shadow: ivory 0px 0px 10px, ivory 0px 0px 17px 9px inset;
    cursor: default;
    background: rgba(255, 255, 255, 0.25);
  }
  .number.active > span {
    color: rgb(72, 84, 97);
    filter: none;
  }
</style>

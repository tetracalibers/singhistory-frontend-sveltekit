<script lang="ts">
  export let dir: 'left' | 'right' | 'up' | 'down'
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  preserveAspectRatio="xMidYMid meet"
  viewBox="0 0 24 24"
  aria-hidden="true"
  class:left={dir === 'left'}
  class:right={dir === 'right'}
  class:up={dir === 'up'}
>
  <path
    fill="currentColor"
    d="M12 14.975q-.2 0-.387-.075q-.188-.075-.313-.2l-4.6-4.6q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7l-4.6 4.6q-.15.15-.325.212q-.175.063-.375.063Z"
  />
</svg>

<style>
  .up {
    transform: rotate(180deg);
  }
  .left {
    transform: rotate(90deg);
  }
  .right {
    transform: rotate(-90deg);
  }
</style>

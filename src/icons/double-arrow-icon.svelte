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
  class:right={dir === 'right'}
  class:up={dir === 'up'}
  class:down={dir === 'down'}
>
  <path
    fill="currentColor"
    d="m16.9 17.3l-4.6-4.6q-.15-.15-.212-.325q-.063-.175-.063-.375t.063-.375q.062-.175.212-.325l4.6-4.6q.275-.275.687-.288Q18 6.4 18.3 6.7q.275.275.275.7q0 .425-.275.7L14.425 12l3.875 3.9q.275.275.287.687q.013.413-.287.713q-.275.275-.7.275q-.425 0-.7-.275Zm-6.6 0l-4.6-4.6q-.15-.15-.212-.325q-.063-.175-.063-.375t.063-.375q.062-.175.212-.325l4.6-4.6q.275-.275.688-.288q.412-.012.712.288q.275.275.275.7q0 .425-.275.7L7.825 12l3.875 3.9q.275.275.288.687Q12 17 11.7 17.3q-.275.275-.7.275q-.425 0-.7-.275Z"
  />
</svg>

<style>
  .right {
    transform: rotate(180deg);
  }
  .up {
    transform: rotate(90deg);
  }
  .down {
    transform: rotate(-90deg);
  }
</style>

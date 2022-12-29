<script>
  import StarRatingInput from '@/features/rating/star-rating-input.svelte'
</script>

<div class="app-root">
  <div class="modal-root">
    <StarRatingInput />
  </div>
</div>

<style>
  .app-root {
    width: 100vw;
    min-height: 100vh;
    position: relative;
    background-image: linear-gradient(
        221deg,
        rgba(12, 186, 186, 0.9) 0%,
        rgba(100, 125, 238, 0.9) 74%
      ),
      url(image/texture/twinkle-back.jpg);
    background-size: cover;
  }

  .modal-root {
    background-color: rgba(255, 255, 255, 0);
    background-image: linear-gradient(
      315deg,
      rgba(249, 197, 209, 0.49) 0%,
      rgba(151, 149, 239, 0.48) 74%
    );
    backdrop-filter: blur(20px) drop-shadow(white 2px 4px 6px);
  }
</style>

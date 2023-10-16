<script>
  export let pdfLoading;
  export let pcSetting;
  import { refCollage, styleDims } from '$lib/store';
  import { PCCollage } from '$lib/components/export/images';
  let width = $styleDims[0];
  let height = $styleDims[1];
</script>

{#if pdfLoading}
  <p> Loading . . .</p>
{:else}
  <div
    bind:this={$refCollage}
    id='div_collage'
    style="--width: {width}; --height: {height}">
    <PCCollage {pcSetting} />
  </div>
{/if}

<style>
  #div_collage {
    height: var(--height);
    width: var(--width);
  }
</style>
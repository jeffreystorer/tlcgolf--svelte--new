<script>
  export let pcSetting;
  import { refCollage, styleDims } from '$lib/store';
  import { PCCollage } from '$lib/components/export/images';
  let width = $styleDims[0];
  let height = $styleDims[1];
</script>

<div
  bind:this={$refCollage}
  id='div_collage'
  style="--width: {width}; --height: {height}">
  <PCCollage {pcSetting} />
</div>

<style>
  #div_collage {
    height: var(--height);
    width: var(--width);
  }
</style>
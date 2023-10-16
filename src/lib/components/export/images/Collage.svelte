<script>
  export let pdfLoading, pcSetting;
  import { refCollage, styleDims} from '$lib/store';
  import { PCCollage } from '$lib/components/export/images';
</script>

{#if pdfLoading}
  <p> Loading . . .</p>
{:else}  
  <div
    bind:this={$refCollage}
    id='div_collage'
    style={{
      width: $styleDims[0],
      height: $styleDims[1],
    }}>
    <PCCollage {pcSetting} />
  </div>
{/if}
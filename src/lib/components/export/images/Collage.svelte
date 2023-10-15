<script>
  export let pdfLoading, pcSetting, styleDims;
  import { ref } from '$lib/store';
  import { PCCollage } from '$lib/components/export/images';
</script>

{#if pdfLoading}
  <p> Loading . . .</p>
{:else}
  <div class='background-white center'>
    <h1>PLEASE IGNORE THE COLLAGE BELOW.</h1>
    <h1>IT IS USED FOR CREATING THE PDF.</h1>
  </div>
  <div
    bind:this={$ref}
    id='div_collage'
    class='center'
    style={{
      width: styleDims[0],
      height: styleDims[1],
    }}>
    <PCCollage {pcSetting} />
  </div>
{/if}
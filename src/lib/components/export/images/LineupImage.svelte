<script>
  import { onMount } from 'svelte';
  import { ref, screenshotUrl} from '$lib/store';
  let jpgImageRef;
  onMount(() => {
    $ref = jpgImageRef;
  });
  let dataUrl = $screenshotUrl;
</script>


<h1>PLEASE IGNORE THE IMAGE BELOW.</h1>
<h1>IT IS USED FOR COPYING TO THE CLIPBOARD.</h1>
<div bind:this={jpgImageRef} id='lineupToCopy'>
  <img
    src={dataUrl}
    class='img'
    alt='Loading Lineup to Copy . . . '
  />
</div>
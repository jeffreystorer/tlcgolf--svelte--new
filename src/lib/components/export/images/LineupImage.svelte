<script>
  import { refLineup, screenshotUrl} from '$lib/store';
</script>


<div bind:this={$refLineup} id='lineupToCopy'>
  <img
    src={$screenshotUrl}
    class='img'
    alt='Loading Lineup to Copy . . . '
  />
</div>
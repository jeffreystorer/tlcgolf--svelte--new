<script>
  import { refLineup} from '$lib/store';
  import { getScreenshotUrl} from '$lib/components/export/utils';
</script>


<div bind:this={$refLineup} id='lineupToCopy'>
  <img
    src={getScreenshotUrl()}
    class='img'
    alt='Loading Lineup to Copy . . . '
  />
</div>
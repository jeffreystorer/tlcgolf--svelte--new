<script>
  import '$lib/styles/modal.css';
  import { missingPlayerMessage, currentLineupKey, currentLineupIndex, currentLineup, playersInLineup, lineupTitle, sortOrder} from '$lib/store';
  import { deleteLineup } from '$lib/components/lineup/utils/lineupService';

  const clearLineup = () => {
    $playersInLineup = [];
    $currentLineupIndex = -1;
    $currentLineupKey = '';
    $currentLineup = null;
    $lineupTitle =  'New Lineup';
    $sortOrder = 'alphabetical';
    window.location.href = '/lineup';
  };

  const handleDelete = () => {
    deleteLineup($currentLineupKey);
    clearLineup();
  };

</script>


<div id='missingplayermodal' class='modal'>
  <!-- svelte-ignore a11y-missing-content -->
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href='#' class='modalClose' hidden></a>
  <section>
    <header>
      <h2>Oops!</h2>
      <!-- svelte-ignore a11y-missing-content -->
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href='#' class='modalClose' hidden></a>
    </header>
    <p>{$missingPlayerMessage}</p>
    <footer>
      <button class='not-stacked' on:click={clearLineup}>
        Cancel
      </button>
      <a type='button' href='/edittable'>
        Edit Table
      </a>
      <button class='not-stacked' on:click={handleDelete}>
        Delete
      </button>
    </footer>
  </section>
</div>

<style>
  section {
    max-width: fit-content;
  }
</style>
<script>
  import { deleteAll, currentLineupKey, currentLineupIndex, currentLineup, playersInLineup, lineupTitle, sortOrder} from '$lib/store';
  import { deleteLineup, deleteAllLineups } from '$lib/components/lineup/utils/lineupService';
  
  const handleDeleteAll = () => {
    deleteAllLineups();
    clearLineup();
  };

  const handleDeleteLineup = () => {
    deleteLineup($currentLineupKey);
    clearLineup();
  };

  const clearLineup = () => {
    $playersInLineup = [];
    $currentLineupIndex = -1;
    $currentLineupKey = '';
    $currentLineup = null;
    $lineupTitle =  'New Lineup';
    $sortOrder = 'alphabetical';
    window.location.href = '/lineup';
  };
  </script>

    <div id='confirmdeletemodal' class='modal'>
      <!-- svelte-ignore a11y-missing-content -->
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href='#' class='modalClose' hidden></a>
      <section>
        <header>
          <h2>Heads up!</h2>
          <!-- svelte-ignore a11y-missing-content -->
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a href='#' class='modalClose' hidden></a>
        </header>
        {#if $deleteAll}
          <p>Are you sure you want to delete all Lineups?</p>
        {:else}
          <p>Are you sure you want to delete this Lineup?</p>
        {/if}
        <footer>
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a type='button' class='not-stacked modalClose' href='#'>
            Cancel
          </a>
          {#if $deleteAll}
            <button class='not-stacked' on:click={handleDeleteAll}>
              Delete All
            </button>
          {:else}
            <button class='not-stacked' on:click={handleDeleteLineup}>
              Delete
            </button>
          {/if}
        </footer>
      </section>
    </div>
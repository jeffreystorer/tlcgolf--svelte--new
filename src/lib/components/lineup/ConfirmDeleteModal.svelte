<script>
  import { goto  } from '$app/navigation';
  import '$lib/styles/modal.css';
  import { textareaValue, deleteAll, currentLineupKey, currentLineupIndex, currentLineup, playersInLineup, lineupTitle, sortOrder, playingDate, teeTimeCount, linkTime, progs069, progAdj, teamTables, showAddTeamMember} from '$lib/store';
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
    $textareaValue = '';
    $playersInLineup = [];
    $currentLineupIndex = -1;
    $currentLineupKey = '';
    $currentLineup = null;
    $lineupTitle = "New Lineup";
    $sortOrder = 'alphabetical';
    $playingDate = 'Date';
    $teeTimeCount = '';
    $linkTime = 'Set Link Time Above';
    $progs069 = '';
    $progAdj = '';
    $teamTables = {
      teeAssignments: [1],
      team0: [],
      team1: [],
      team2: [],
      team3: [],
      team4: [],
      team5: [],
      team6: [],
      team7: [],
      team8: [],
      team9: []
    };
    $showAddTeamMember = {
      team0: false,
      team1: false,
      team2: false,
      team3: false,
      team4: false,
      team5: false,
      team6: false,
      team7: false,
      team8: false,
      team9: false
    };
    goto('/export');
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

<style>
  section {
    max-width: fit-content;
  }
</style>
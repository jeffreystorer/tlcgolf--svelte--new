<script>
  import '$lib/styles/modal.css';
  import { textareaValue, playingDate, teeTimeCount, linkTime, progs069, progAdj, teamTables, showAddTeamMember, missingPlayerMessage, currentLineupKey, currentLineupIndex, currentLineup, playersInLineup, lineupTitle, sortOrder} from '$lib/store';
  import { deleteLineup } from '$lib/components/lineup/utils/lineupService';

  
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
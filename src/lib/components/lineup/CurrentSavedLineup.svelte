<script>
  export let lineupSnapshot;
  import { goto } from '$app/navigation';
  import {onMount}  from 'svelte';
  import {playersInLineup,currentLineupIndex,currentLineup,lineupTitle,sortOrder,playingDate,teeTimeCount,linkTime,progs069,progAdj,currentLineupKey,deleteAll, teamTables, showAddTeamMember} from '$lib/store';
  import { ConfirmDeleteModal } from '$lib/components/lineup';
  import { loadSavedLineup } from '$lib/components/lineup/utils';

  const editLineup = () => {
    $sortOrder = 'alphabetical';
    try {
      let aLineup = lineupSnapshot;
      let title = aLineup.title;
      let savedLineup = aLineup.lineup;
      savedLineup.title = title;
      loadSavedLineup(savedLineup);

    } catch (error) {
      console.log('error loading lineup from firebase', error);
    }
  };

  onMount(() => {
    if (lineupSnapshot) editLineup();
  });

  const exportLineup = () => {
    editLineup();
    goto('/export');
  };

  const clearLineup = () => {
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

  function handleDelete(e) {
    e.preventDefault;
    $deleteAll = false;
    window.location.href = '#confirmdeletemodal';
  }

</script>

{#if lineupSnapshot}
  <div class='buttons'>
    <button class='stacked' on:click={exportLineup}>
      Export
    </button>
    <button class='stacked' on:click={clearLineup}>
      Clear
    </button>
    <button class='stacked' on:click={handleDelete}>
      Delete
    </button>
    <ConfirmDeleteModal />
  </div>
{/if}

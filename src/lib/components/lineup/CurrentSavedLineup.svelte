<script>
  export let lineupSnapshot;
  import { goto } from '$app/navigation';
  import {onMount}  from 'svelte';
  import {playersInLineup,currentLineupIndex,currentLineup,lineupTitle,sortOrder,playingDate,teeTimeCount,linkTime,progs069,progAdj,currentLineupKey,deleteAll} from '$lib/store';
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
    editLineup();
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
    <button type='button' on:click={handleDelete}>
      Delete
    </button>
    <ConfirmDeleteModal />
  </div>
{/if}

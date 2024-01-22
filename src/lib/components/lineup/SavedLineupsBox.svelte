<script>
  export let snapshots;
  import { onMount } from 'svelte'
  import { textareaValue, currentLineup, currentLineupKey, currentLineupIndex, deleteAll, lineupTitle, playersInLineup, sortOrder, playingDate, teeTimeCount, linkTime, progs069, progAdj, teamTables, showAddTeamMember} from '$lib/store';
  let currentSnapshot = [];
  onMount(() => {
    $currentLineupIndex = snapshots.length -1;
    if ($currentLineupIndex > -1) {
      /* if (captainGHINNumber === realGHINNumber) {
        $currentLineupIndex = $nextLineupIndex
      } */
      currentSnapshot = snapshots[$currentLineupIndex];
      $currentLineupKey = currentSnapshot.key;
      $currentLineup = {
        key: currentSnapshot.key,
        lineup: currentSnapshot.lineup,
        title: currentSnapshot.title
      };
      $lineupTitle = currentSnapshot.title;
    }
  });

  function handleClick(currentSnapshot, index) {
    $currentLineupKey= currentSnapshot.key;
    $currentLineupIndex = index;
    $currentLineup = {
      key: currentSnapshot.key,
      lineup: currentSnapshot.lineup,
      title: currentSnapshot.title
    };
    $lineupTitle = currentSnapshot.title;
  }
  

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

  function handleDeleteAll(e) {
    e.preventDefault;
    clearLineup;
    $deleteAll= true;
    window.location.href = '#confirmdeletemodal';
  }

</script>


<div class='titled_outer'>
  <h2>Saved Lineups</h2>
  {#if snapshots.length > 0}
          <button type='button' class='stacked' on:click={handleDeleteAll}>
            Delete All
          </button>
          <p>Click on a lineup to edit, export, or delete</p>
          <div class='divider'></div>
          <ul>
            {#each snapshots as snapshot, index}
              <li>
                <a href='#ul' class={index === $currentLineupIndex ? 'active_li' : 'li'}
                on:click={() => handleClick(snapshot, index)}>
                  {snapshot.title}
                </a>
              </li>
            {/each}
          </ul>
      {/if}
</div>

<style>
  p {
    font-size: var(--step-0);
    font-style: italic;
  }

  a {
    font-size: var(--step-0);
    margin: 0 auto;
    text-align: left;
    text-decoration: none;
  }

  .active_li,
  .li {
    background-color: var(--background-white);
    color: var(--color-black);
  }

  .active_li {
    font-weight: 700;
  }

  

li:first-of-type {
  padding: 0.5em 0;
}

li:not(first-of-type) {
  padding: 0 0 0.5em 0;
}
</style>

      
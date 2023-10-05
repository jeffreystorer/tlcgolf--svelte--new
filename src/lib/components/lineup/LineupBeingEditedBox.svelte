<script>
  import { snapshots, playersInLineup, linkTime, currentLineupIndex, currentLineup, lineupTitle, sortOrder, playingDate, teeTimeCount, progs069, progAdj, currentLineupKey, teamTables, showAddTeamMember, showAddDeletePlayersButton, showAddDeletePlayers, showChangeTees, okToSave, okToAddPlayers, group} from '$lib/store';
  import { GroupAndCourseDropdowns } from '$lib/components/common';
  import {
    AddDeletePlayersInLineup,
    CurrentSavedLineup,
    ChangeTees,
  } from '$lib/components/lineup';
  import {
    AddDeletePlayersButton,
    ChangeTeesButton,
    ClearPlayersFromTeamsButton,
    WednesdayButton,
  } from '$lib/components/lineup/buttons';
  import { LineupDropdowns } from '$lib/components/lineup/dropdowns';
  import { get } from '$lib/components/common/utils';
  const ghinNumber = get('ghinNumber');

  const clearLineup = () => {
    $playersInLineup = [];
    $currentLineupIndex = -1;
    $currentLineupKey = '';
    $currentLineup = null;
    $lineupTitle = "New Lineup";
    $sortOrder = 'alphabetical';
    $playingDate = 'Date';
    $teeTimeCount = 0;
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

</script>

<div class='titled_outer'>
  <h2>{$lineupTitle}</h2>
  {#if $currentLineup}
    <CurrentSavedLineup lineupSnapshot={$snapshots[currentLineupIndex]} />
  {/if}
  {#if (!currentLineup && playersInLineup.length > 0 && linkTime !== 'Set Link Time Above')}
      <button class='stacked' on:click={clearLineup}>
        Clear
      </button>
  {/if}
  <GroupAndCourseDropdowns />
  <LineupDropdowns />
  <div class='buttons_stacked'>
    {#if okToAddPlayers}
      {#if (ghinNumber === '585871' && group === 'Wednesday')}
        <WednesdayButton />
      {/if}
      {#if !showChangeTees}
        <ChangeTeesButton />
      {/if}
      {#if showChangeTees}
        <ChangeTees />
      {/if}
      {#if showAddDeletePlayersButton}
        <AddDeletePlayersButton />
      {/if}
      {#if showAddDeletePlayers}
        <AddDeletePlayersInLineup />
      {/if}
    {/if}
    {#if okToSave}
      <ClearPlayersFromTeamsButton />
    {/if}
  </div>
</div>

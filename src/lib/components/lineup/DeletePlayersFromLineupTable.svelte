<script>
  import {idsInLineup, teamTables, teeTimeCount, playersInLineup, sortOrder} from '$lib/store';
  import * as _ from 'lodash';
  import { getPlayersInGroup } from '$lib/components/common/utils';
  import { SortOrderDropdown } from '$lib/components/lineup/dropdowns';
  const playersInGroup = getPlayersInGroup('createLineupTable');
  const deletePlayerCount = $playersInLineup.length;

  function deletePlayersFromTeams(idsToBeDeleted) {
    let _teamTables = _.cloneDeep($teamTables);
    idsToBeDeleted.forEach(deletePlayer);
    $teamTables = _teamTables;

    function deletePlayer(item) {
      let id = parseInt(item);
      let i, j;
      for (i = 0; i < $teeTimeCount; i++) {
        let teamName = 'team' + i;
        let memberCount = _teamTables[teamName].length;
        for (j = 0; j < memberCount; j++) {
          _teamTables = processTeamTables(_teamTables, teamName);
        }
      }

      function processTeamTables(_teamTables, teamName) {
        _teamTables[teamName] = _teamTables[teamName].filter(
            (player) => player.id !== id
          );
        return _teamTables;
      };      
    }
  };

  const handleClick = (idToBeDeleted) => (event) => {
    const idsToBeDeleted = [idToBeDeleted.toString()];
    let newIdsInLineup = [];
    $idsInLineup.forEach((id) => {
      if (idsToBeDeleted.includes(id) === false) {
        newIdsInLineup.push(id);
      }
    });
    let newPlayersInLineupArray = [];
    playersInGroup.forEach((player) => {
      if (newIdsInLineup.includes(player.id.toString()) === true) {
        newPlayersInLineupArray.push(player);
      }
    });
    $playersInLineup = newPlayersInLineupArray;
    deletePlayersFromTeams(idsToBeDeleted);
  };  

  function handleClear() {
    $playersInLineup = [];
    $sortOrder = 'alphabetical';
  };
</script>

<div>
  <h4>{deletePlayerCount} In Lineup</h4>
  <ul>
    {#each $playersInLineup as player}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li on:click={handleClick(player.id)}>
        {player.playerName}
      </li>
    {/each}
  </ul>
  <br />
  <div class='titled_inner'>
    <h3>Sort Order</h3>
  <SortOrderDropdown />
  </div>
  <button class='stacked' on:click={handleClear}>
    Clear Lineup
  </button>
</div>

  <style>    
    div {
      padding: 0 0.25em;
      width: 50%;

      & > h4 {
        font-size: var(--step-0);
        text-decoration: underline;
      }
      & > ul {
        list-style: none;
      }

      & > ul > li {
        font-size: var(--step-0);
        text-align: center;
      }
    }
  </style>
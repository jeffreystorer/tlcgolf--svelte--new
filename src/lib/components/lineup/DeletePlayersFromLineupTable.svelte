<script>
  import {idsInLineup, teamTables, teeTimeCount, playersInLineup} from '$lib/store';
  import { v4 as uuidv4 } from 'uuid';
  import * as _ from 'lodash';
  import { getPlayersInGroup } from '$lib/components/common/utils';
  import { SortOrderDropdown } from '$lib/components/lineup/dropdowns';
  import { get } from '$lib/components/common/utils';
  const playersInGroup = getPlayersInGroup('createLineupTable');
  const deletePlayerCount = $playersInLineup.length;

  function deletePlayersFromTeams(idsToBeDeleted) {
    let newTeamTables = _.cloneDeep($teamTables);
    idsToBeDeleted.forEach(deletePlayer);
    $teamTables = newTeamTables;

    function deletePlayer(item, index) {
      let id = parseInt(item);
      let i, j;
      for (i = 0; i < teeTimeCount; i++) {
        let teamName = 'team' + i;
        let memberCount = newTeamTables[teamName].length;
        for (j = 0; j < memberCount; j++) {
          newTeamTables = processTeamTables(newTeamTables, teamName);
        }
      }

      function processTeamTables(newTeamTables, teamName) {
        return {
          ...newTeamTables,
          [teamName]: newTeamTables[teamName].filter(
            (player) => player.id !== id
          ),
        };
      }
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
    $playersInLineup = [];;
  };
</script>

    <div class='players'>
      <h4>{deletePlayerCount} In Lineup</h4>
      <ul>
        {#each $playersInLineup as player (uuidv4())}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <li on:click={handleClick(player.id)}>
            {player.playerName}
          </li>
        {/each}
      </ul>
      <div class='divider'></div>
      <SortOrderDropdown />
      <button class='stacked' on:click={handleClear}>
        Clear
      </button>
    </div>
  );
}

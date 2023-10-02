//child of TeamTable
<script>
  export let manualCH;
  export let playerId;
  export let teamNumber;
  import { v4 as uuidv4 } from 'uuid';
  import { teamTables } from '$lib/store';
  import * as _ from 'lodash';
  import { recomputeTeamTables } from '$lib/components/lineup/utils';
  import { manualCHList } from '$lib/components/lineup/optionitems';
  let newTeamTables = _.cloneDeep($teamTables);
  let teamName, playerIndex;

  const handleManualCHChange = (event) => {
    const aManualCH = event.target.value;
    const anId = Number(event.target.name);
    const aTeamNumber = event.target.id;
    teamName = 'team' + aTeamNumber;
    playerIndex = teamTables[teamName].findIndex(
      (player) => player.id === Number(anId)
    );
    newTeamTables[teamName][playerIndex].manualCH = aManualCH;
    recomputeTeamTables(playerIndex, newTeamTables, teamName);
  };

</script>

<td>
  <select
    id={teamNumber}
    name={playerId}
    bind:value={manualCH}
    on:change={handleManualCHChange}>
    {#each manualCHList as manualCH (uuidv4())}
      <option value={manualCH.value}>
        {manualCH.text}
      </option>
    {/each}
  </select>
</td>
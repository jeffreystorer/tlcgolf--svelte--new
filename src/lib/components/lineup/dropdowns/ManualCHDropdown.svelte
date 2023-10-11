<script>
  export let playerId;
  export let teamNumber;
  import { v4 as uuidv4 } from 'uuid';
  import { teamTables } from '$lib/store';
  import * as _ from 'lodash';
  import { recomputeTeamTables } from '$lib/components/lineup/utils';
  import { manualCHList } from '$lib/components/lineup/optionitems';
  let manualCH;
  let teamName, playerIndex;

  const handleManualCHChange = (event) => {
    let _teamTables = _.cloneDeep($teamTables);
    const aManualCH = event.target.value;
    const anId = Number(event.target.name);
    const aTeamNumber = event.target.id;
    teamName = 'team' + aTeamNumber;
    playerIndex = _teamTables[teamName].findIndex(
      (player) => player.id === Number(anId)
    );
    _teamTables[teamName][playerIndex].manualCH = aManualCH;
    recomputeTeamTables(playerIndex, _teamTables, teamName);
  };

</script>

<td>
  <select
    id={teamNumber}
    name={playerId}
    bind:value={manualCH}
    on:change={handleManualCHChange}>
    {#each manualCHList() as ch (uuidv4())}
      <option value={ch.value}>
        {ch.text}
      </option>
    {/each}
  </select>
</td>
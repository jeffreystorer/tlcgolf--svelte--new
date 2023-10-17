<script>
  export let playerId;
  export let teamNumber;
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
    teamName = 'team' + teamNumber;
    playerIndex = _teamTables[teamName].findIndex(
      (player) => player.id === Number(anId)
    );
    _teamTables[teamName][playerIndex].manualCH = aManualCH;
    recomputeTeamTables(playerIndex, _teamTables, teamName);
  };

</script>

<td>
  <select
    name={playerId}
    bind:value={manualCH}
    on:change={handleManualCHChange}>
    {#each manualCHList() as ch}
      <option value={ch.value}>
        {ch.text}
      </option>
    {/each}
  </select>
</td>
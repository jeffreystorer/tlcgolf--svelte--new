<script>
  export let playerId;
  export let teamNumber;
  export let baseTee;
  import { course, teesSelected, teamTables } from '$lib/store';
  import { v4 as uuidv4 } from 'uuid';
  import * as _ from 'lodash';
  import { recomputeTeamTables } from '$lib/components/lineup/utils';
  import { buildTeeArray } from '$lib/components/common/utils';
  const teesSelectedArray = buildTeeArray($teesSelected[$course]);
  let teamName, playerIndex;
  
  function handleTeeChoiceChange(event) {
    let _teamTables = _.cloneDeep($teamTables);
    const aTeeChoice = event.target.value;
    const anId = Number(event.target.name);
    const aTeamNumber = event.target.id;
    teamName = 'team' + aTeamNumber;
    playerIndex = _teamTables[teamName].findIndex(
      (player) => player.id === Number(anId)
    );
    _teamTables[teamName][playerIndex].teeChoice = aTeeChoice;
    recomputeTeamTables(playerIndex, _teamTables, teamName);
  }

</script>

<td>
  <select
    class='embedded_tee'
    name={playerId}
    bind:value={baseTee}
    on:change={handleTeeChoiceChange}>
    {#each teesSelectedArray as tee (uuidv4())}
    <option value={tee}>
      {tee}
    </option>
    {/each}
  </select>
</td>

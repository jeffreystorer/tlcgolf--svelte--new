//child of TeamTable
<script>
  export let walk;
  export let playerId;
  export let teamNumber;
  import { teamTables } from '$lib/store';
  import { v4 as uuidv4 } from 'uuid';
  import * as _ from 'lodash';
  let walkRideArray = ['W', 'R'];
  let newTeamTables = _.cloneDeep($teamTables);
  let teamName, playerIndex;

  function handleWalkRideChange(event) {
    const walkRide = event.target.value;
    const anId = Number(event.target.name);
    const aTeamNumber = event.target.id;
    teamName = 'team' + aTeamNumber;
    playerIndex = $teamTables[teamName].findIndex(
      (player) => player.id === Number(anId)
    );
    newTeamTables[teamName][playerIndex].walk = walkRide;
    $teamTables = newTeamTables;
  }
</script>

<td>
  <select
    id={teamNumber}
    name={playerId}
    bind:offsetWidth={walk}
    on:change={handleWalkRideChange}>
      {#each walkRideArray as wr (uuidv4())}
        <option value={wr}>
          {wr}
        </option>
      {/each}
  </select>
</td>
<script>
  export let walk;
  export let playerId;
  export let teamNumber;
  import { teamTables } from '$lib/store';
  import * as _ from 'lodash';
  let walkRideArray = ['W', 'R'];
  let newTeamTables = _.cloneDeep($teamTables);
  let teamName, playerIndex;

  function handleWalkRideChange(event) {
    const walkRide = event.target.value;
    const anId = Number(event.target.name);
    const aTeamNumber = event.target.id;
    teamName = 'team' + teamNumber;
    playerIndex = $teamTables[teamName].findIndex(
      (player) => player.id === Number(anId)
    );
    newTeamTables[teamName][playerIndex].walk = walkRide;
    $teamTables = newTeamTables;
  }
</script>

<td>
  <select
    name={playerId}
    bind:offsetWidth={walk}
    on:change={handleWalkRideChange}>
      {#each walkRideArray as wr}
        <option value={wr}>
          {wr}
        </option>
      {/each}
  </select>
</td>
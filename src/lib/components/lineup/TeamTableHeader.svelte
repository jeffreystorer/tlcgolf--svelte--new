<script>
  export let teamNumber;
  import {course, teesSelected, playersNotInTeeTime, teeTimeCount, linkTime, playersInLineup, teamTables,showAddTeamMember} from '$lib/store';
  import { ChevronDown } from 'react-feather';
  import { ChevronUp } from 'react-feather';
  import * as _ from 'lodash';
  import { returnHeaderRow, getTeeTimes } from '$lib/components/common/utils';
  import {teeAssignments} from '$lib/components/lineup/optionitems';
  //playerCount is used to size the box
  console.log("😊😊 $playersNotInTeeTime", $playersNotInTeeTime)
  const playersNotInTeeTimeCount = $playersNotInTeeTime.length;
  const times = getTeeTimes($linkTime, $teeTimeCount);
  const teamName = 'team' + teamNumber;
  function handleAddTeamMember(name, idToBeAddedToTeam) {
    const optionValues = [idToBeAddedToTeam];
    optionValues.forEach(addPlayer);
    function addPlayer(item, index) {
      let newPlayerObj = playersInLineup.find(
        (player) => player.id === Number(item)
      );
      $teamTables = ({
        ...$teamTables,
        [name]: $teamTables[name].concat(newPlayerObj),
      });
    }
  }

  function handleMoveTeamUp(event, teamNumber) {
    event.preventDefault();
    if (teamNumber > 0) moveTeamUp(teamNumber);
  }

  function moveTeamUp(teamNumber) {
    let newTeamTables = _.cloneDeep($teamTables);
    let teams = [];
    let i;
    let teamName = '';
    for (i = 0; i < teeTimeCount; i++) {
      teamName = 'team' + i;
      teams.push(newTeamTables[teamName]);
    }
    let teamNameGoingUp = 'team' + teamNumber;
    let teamNameGoingDown = 'team' + (teamNumber - 1);
    newTeamTables[teamNameGoingUp] = teams[teamNumber - 1];
    newTeamTables[teamNameGoingDown] = teams[teamNumber];
    $teamTables = newTeamTables;
  }

  function handleTeeTimeClick() {
    $showAddTeamMember = ({
      ...$showAddTeamMember,
      [teamName]: true,
    });
  }

  function handleTeeAssignmentChange(e) {
    let newTeamTables = _.cloneDeep(teamTables);
    newTeamTables.teeAssignments[teamNumber] = e.target.value;
    $teamTables = newTeamTables;
  }

  function handleDoneClick() {
    $showAddTeamMember = ({
      ...$showAddTeamMember,
      [teamName]: false,
    });
  }

  const handleClick = (idToBeAddedToTeam) => (event) => {
    event.preventDefault();
    handleAddTeamMember(teamName, idToBeAddedToTeam);
  };

  let cols = returnHeaderRow($teesSelected[$course]);
  cols.shift();
  const keys = cols;

</script>


<thead>
  {#if ($showAddTeamMember[teamName] && playersNotInTeeTimeCount > 0)}
    <tr>
      <th scope='col' colSpan={$teesSelected[$course].length + 4}>
        <div class='titled_inner'>
          <h3>{'Add to ' + times[teamNumber] + ' Team'}</h3>
          <ul>
            {#each $playersNotInTeeTime as player}
              <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <li on:click={handleClick(player.id)}>
                {player.playerName}
              </li>
            {/each}
          </ul>
          <button class='not-stacked' on:click={handleDoneClick}>
            Done
          </button>
        </div>
      </th>
    </tr>
  {/if}
  <tr>
    <th scope='col' on:click={(e) => handleMoveTeamUp(e, teamNumber)}>
      {#if teamNumber > 0}
        <ChevronUp size='24' strokeWidth='3px' />
      {:else }
        <ChevronUp size='24' strokeWidth='3px' color='white' />
      {/if}
    </th>
    <th scope='col' on:click={handleTeeTimeClick}>
      {times[teamNumber]}
      {#if playersNotInTeeTimeCount > 0}
        <span>
          <ChevronDown size='24' strokeWidth='3px' />
        </span>
      {/if}
      {#if times[teamNumber].includes('Shotgun')}
        <div class='select-dropdown-container'>
          <select
            name='teeAssignmentDropdown'
            value={teamTables.teeAssignments[teamNumber]}
            on:change={handleTeeAssignmentChange}>
            {#each teeAssignments as teeAssignment}
              <option value={teeAssignment}>
                {teeAssignment}
              </option>
            {/each}
          </select>
        </div>
      {/if}
    </th>
    {#each keys as key}
      <th scope='col'>
        {key}
      </th>
    {/each}
  </tr>
</thead>

<style>  
  ul > li {
    font-size: var(--step-0);
    font-weight: normal;
  }
</style>
<script>
  export let teamNumber;
  import {course, teesSelected, playersNotInTeeTime, teeTimeCount, linkTime, playersInLineup, teamTables,showAddTeamMember} from '$lib/store';
  import ChevronUpBlack from '$lib/components/lineup/assets/chevron-up_black.svg'
  import ChevronUpWhite from '$lib/components/lineup/assets/chevron-up_white.svg'
  import ChevronDown from '$lib/components/lineup/assets/chevron-down_black.svg'
  import * as _ from 'lodash';
  import { returnHeaderRow, getTeeTimes } from '$lib/components/common/utils';
  import {teeAssignments} from '$lib/components/lineup/optionitems';
  //playerCount is used to size the box
  const playersNotInTeeTimeCount = $playersNotInTeeTime.length;
  const times = getTeeTimes($linkTime, $teeTimeCount);
  const teamName = 'team' + teamNumber;
  function handleAddTeamMember(name, idToBeAddedToTeam) {
    const optionValues = [idToBeAddedToTeam];
    optionValues.forEach(addPlayer);
    function addPlayer(item, index) {
      let _teamTables = _.cloneDeep($teamTables);
      let newPlayerObj = $playersInLineup.find(
        (player) => player.id === Number(item)
      );      
      _teamTables[name].push(newPlayerObj);
      $teamTables = _teamTables;
    }
  }

  function handleMoveTeamUp(event, teamNumber) {
    event.preventDefault();
    if (teamNumber > 0) moveTeamUp(teamNumber);
  }

  function moveTeamUp(teamNumber) {
    let _teamTables = _.cloneDeep($teamTables);
    let teams = [];
    let i;
    let teamName = '';
    for (i = 0; i < $teeTimeCount; i++) {
      teamName = 'team' + i;
      teams.push(_teamTables[teamName]);
    }
    let teamNameGoingUp = 'team' + teamNumber;
    let teamNameGoingDown = 'team' + (teamNumber - 1);
    _teamTables[teamNameGoingUp] = teams[teamNumber - 1];
    _teamTables[teamNameGoingDown] = teams[teamNumber];
    $teamTables = _teamTables;
  }

  function handleTeeTimeClick() {
    $showAddTeamMember = ({
      ...$showAddTeamMember,
      [teamName]: true,
    });
  }

  function handleTeeAssignmentChange(e) {
    let _teamTables = _.cloneDeep(teamTables);
    _teamTables.teeAssignments[teamNumber] = e.target.value;
    $teamTables = _teamTables;
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
        <img src={ChevronUpBlack} alt='Chevron Up Black'/>
      {:else }
        <img src={ChevronUpWhite} alt='Chevron up White' />
      {/if}
    </th>
    <th scope='col' on:click={handleTeeTimeClick}>
      {times[teamNumber]}
      {#if playersNotInTeeTimeCount > 0}
        <span>
          <img src={ChevronDown} alt='Chevron Down' />
        </span>
      {/if}
      {#if times[teamNumber].includes('Shotgun')}
        <div class='select-dropdown-container'>
          <select
            name='teeAssignmentDropdown'
            bind:value={$teamTables.teeAssignments[teamNumber]}
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
  img {
    height: 24px;
    width: 24px;
  }
</style>
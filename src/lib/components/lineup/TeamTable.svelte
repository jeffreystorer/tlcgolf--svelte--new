<script>
  export let teamNumber;
  export let teamMembers;
  import * as _ from 'lodash';
  import {course, teesSelected, teamTables, progAdj, progs069, groups} from '$lib/store';
  import { TeamTableHeader } from '$lib/components/lineup';
  import {
    TeeChoiceDropdown,
    ManualCHDropdown,
    WalkRideDropdown,
  } from '$lib/components/lineup/dropdowns';
  import { setTeamHcpAndProgs } from '$lib/components/common/utils';
  const showTeamHcp = true;

  let teamName = 'team' + teamNumber;
  let teamHcp, teamProgs;
  let teamHcpAndProgsValues;  
  function setTeamValues() {
    teamHcpAndProgsValues = setTeamHcpAndProgs(
      teamName,
      teamMembers,
      $progAdj,
      $progs069,
      $teesSelected[$course]
    );
    teamHcp = teamHcpAndProgsValues[0];
    teamProgs = teamHcpAndProgsValues[1];
  }
  setTeamValues();
  let rows = teamMembers;
  let tees = $teesSelected[$course];
  let teeCount = tees.length;
  let playerCount;
  if (teamMembers) {
    playerCount = teamMembers.length;
  } else {
    playerCount = 0;
  }

  const handleClick = (teamName, id) => (event) => {
    let _teamTables = _.cloneDeep($teamTables);
    _teamTables[teamName] = _teamTables[teamName].filter((player) => player.id !== id);
    $teamTables = _teamTables;
    setTeamValues();
  };
 
</script>

<table>
  <TeamTableHeader {teamNumber} />
  {#if rows}
    <tbody>
      {#each rows as row, index}
        <tr>
          <td></td>
          <th scope='row' on:click={handleClick(teamName, teamMembers[index].id)}>
            {row.playerName}
          </th>
            {#each tees as tee, index}
              {#if (row.teeChoice === tee.value)}
                <td class='ch-chosen'>
                  {row.courseHandicaps[index]}
                </td>
              {:else}
                <td >{row.courseHandicaps[index]}</td>
              {/if}
            {/each}
            <TeeChoiceDropdown
              baseTee={row.teeChoice}
              playerId={row.id}
              teamNumber={teamNumber}
            />
            {#if ($groups.slice(-1) === 'Walk')}
              <WalkRideDropdown
                walk={row.walk}
                playerId={row.id}
                teamNumber={teamNumber}
              />
            {/if}
            <ManualCHDropdown
              playerId={row.id}
              teamNumber={teamNumber}
            />
        </tr>
      {/each}
    </tbody>
    <tfoot>
      <tr>
        <th scope='row' colSpan={teeCount + 2}>
          {#if (showTeamHcp || $progs069 > 0)}
            <p>Team Hcp: {teamHcp}</p>
          {/if}
          {#if $progs069 > 0}
            <p>
              &nbsp;&nbsp;Team Progs per {$progs069}: {teamProgs}
            </sp>
          {/if}
        </th>
      </tr>
    </tfoot>
  {/if}
</table>

<style>
  table {
	  display: block;

    & thead th {
      font-size: var(--step-0);
      width: fit-content;
    }

    & thead th:nth-of-type(1),
    & thead th:nth-of-type(2) {
      text-align: left;
    }

    & thead > tr > th:nth-of-type(2) {
      display: inline-flex;
      float: left;
    }

    & tbody > tr > td {
      height: fit-content;
    }

    & tbody > tr > td:last-of-type > select {
      appearance: none;
      border: none;
      font-weight: 700;
      margin-left: 0.25em;
      width: 2em;
    }

    & tbody > tr > th {
      font-size: var(--step-0);
      font-weight: normal;
      padding: 0 0.125em;
      text-align: left;
      width: 15em;
    }

    & tfoot th {
      font-size: var(--step-0);
      font-style: italic;
      font-weight: normal;
      text-align: center;
    }
  }

  .ch-chosen {
    text-decoration: underline;
  }

</style>
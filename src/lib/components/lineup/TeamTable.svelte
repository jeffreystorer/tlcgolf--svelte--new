<script>
  export let teamNumber;
  export let teamMembers;
  import { v4 as uuidv4 } from 'uuid';
  import {course, teesSelected, teamTables, progAdj, progs069, groups} from '$lib/store';
  import { TeamTableHeader } from '$lib/components/lineup';
  import {
    TeeChoiceDropdown,
    ManualCHDropdown,
    WalkRideDropdown,
  } from '$lib/components/lineup/dropdowns';
  import { get, setTeamHcpAndProgs } from '$lib/components/common/utils';
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
  let rowsTD = [];
  let tees = $teesSelected[$course];
  let teeCount = tees.length;
  let playerCount;
  if (teamMembers) {
    playerCount = teamMembers.length;
  } else {
    playerCount = 0;
  }

  const handleClick = (teamName, id) => (event) => {
    $teamTables = ({
      ...$teamTables,
      [teamName]: $teamTables[teamName].filter((player) => player.id !== id),
    });
    setTeamValues();
  };

 
</script>

<table>
  <TeamTableHeader {teamNumber} />
  <tbody>
    {#each rows as row, index (uuidv4())}
      <tr>
        <td></td>
        <th scope='row' on:click={handleClick(teamName, teamMembers[index].id)}>
          {row.playerName}
        </th>
          {#each tees as tee, index (uuidv4())}
            {#if (row.teeChoice === tee.value)}
              <td class='ch-chosen'>
                {row.courseHandicaps[index]}
              </td>
            {:else}
              <td >{row.courseHandicaps[index]}</td>;
            {/if}
          {/each}
          <TeeChoiceDropdown
            key={uuidv4()}
            baseTee={row.teeChoice}
            playerId={row.id}
            teamNumber={teamNumber}
          />
          {#if (groups.slice(-1) === 'Walk')}
            <WalkRideDropdown
              key={uuidv4()}
              walk={row.walk}
              playerId={row.id}
              teamNumber={teamNumber}
            />
          {/if}
          <ManualCHDropdown
            key={uuidv4()}
            manualCH={rows.courseHandicaps[row.courseHandicaps.indexOf(row.teeChoice)]}
            playerId={row.id}
            teamNumber={teamNumber}
          />
      </tr>
    {/each}
  </tbody>
  <tfoot>
    <tr>
      <th scope='row' colSpan={teeCount + 2}>
        {#if (showTeamHcp || progs069 > 0)}
          <span>Team Hcp: {teamHcp}</span>
        {/if}
        {#if progs069 > 0}
          <span>
            &nbsp;&nbsp;Team Progs per {progs069}: {teamProgs}
          </span>
        {/if}
      </th>
    </tr>
  </tfoot>
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
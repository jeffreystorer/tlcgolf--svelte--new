<script>
  import * as _ from 'lodash';
  export let teamMembers;
  export let teamNumber;
  export let times;
  export let teamTables;
  import {showTeamHcp, progs069, progAdj, course, teesSelected} from '$lib/store';
  import { LineupTeamTableHeader } from '$lib/components/export/activelineup';
  import { setTeamHcpAndProgs } from '$lib/components/common/utils';

  let teamName = 'team' + teamNumber;
  let teamHcp, teamProgs;
  let teamHcpAndProgsValues;
  let _teesSelected = $teesSelected[$course]
  let _teamMembers = _.cloneDeep(teamMembers)
  setManualCHCourseHandicaps(_teamMembers)
  
  function setManualCHCourseHandicaps() {
    //iterate through teamMembers
    try {
      for (let i = 0; i < _teamMembers.length; i++) {
        let aTeeChoice = _teamMembers[i].teeChoice;
        let aManualCH = _teamMembers[i].manualCH;
        if (aManualCH !== 'Auto') {
          let teesSelectedArray = _teesSelected.map((a) => a.value);
          let aChosenTeeIndex = teesSelectedArray.indexOf(aTeeChoice);
          if (aManualCH !== '-') {
            for (let j = 0; j < teesSelectedArray.length; j++) {
              _teamMembers[i].courseHandicaps[j] = '*';
            }
            _teamMembers[i].courseHandicaps[aChosenTeeIndex] = aManualCH;
            _teamMembers[i].playerName = _teamMembers[i].playerName + '*';
          } else {
            for (let j = 0; j < teesSelectedArray.length; j++) {
              _teamMembers[i].courseHandicaps[j] = 'X';
            }
          }
        }
      }
    } catch (error) {
      console.log('error setting ManualCourseHandicaps');
    }
  }

  function setTeamValues() {
    teamHcpAndProgsValues = setTeamHcpAndProgs(
      teamName,
      _teamMembers,
      $progAdj,
      $progs069,
      _teesSelected
    );
    teamHcp = teamHcpAndProgsValues[0];
    teamProgs = teamHcpAndProgsValues[1];
  }
  setTeamValues();
  let rows = _teamMembers;
  let tees = $teesSelected[$course];
  let teeCount = tees.length;

</script>

<table>
  <thead>
    <LineupTeamTableHeader
      teesSelected={_teesSelected}
      teamTables={teamTables}
      times={times}
      teamNumber={teamNumber}
    />
  </thead>
  <tbody>
    {#each rows as row}
      <tr>
        <th scope='row'>
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
      </tr>
    {/each}</tbody>
  <tfoot>
    <tr>
      <th scope='row' colSpan={teeCount + 2}>
        {#if ($showTeamHcp || $progs069 > 0)}
          <span>Team Hcp: {teamHcp}</span>
        {/if}
        {#if $progs069 > 0}
          <span>
            &nbsp;&nbsp;Team Progs per {$progs069}: {teamProgs}
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



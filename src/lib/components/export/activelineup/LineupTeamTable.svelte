<script>
  import * as _ from 'lodash';
  export let teamMembers;
  export let teamNumber;
  export let times;
  export let teamTables;
  import {showTeamHcp, progs069, progAdj, course, teesSelected} from '$lib/store';
  import { returnHeaderRow, setTeamHcpAndProgs } from '$lib/components/common/utils';

  let teamName = 'team' + teamNumber;
  let teamHcp, teamProgs;
  let teamHcpAndProgsValues;
  let _teesSelected = $teesSelected[$course]
  let _teamMembers = _.cloneDeep(teamMembers)
  setManualCHCourseHandicaps(_teamMembers)
  let cols = returnHeaderRow($teesSelected[$course]);
  cols.shift();
  let teeTime;
  try {
    teeTime = times[teamNumber];
    if (times[teamNumber].includes('Shotgun')) {
      teeTime = teeTime + ' (' + teamTables.teeAssignments[teamNumber] + ')';
    }
  } catch (error) {}

  
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
    <tr>
      <th scope='col'>{teeTime}</th>
        {#each cols as col}
            <th scope='col'>
              {col}
            </th>
        {/each}
    </tr>
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
  thead > tr > th {
    font-size: var(--step-0);
    font-weight: 700;
  }

  thead > tr > th[scope='col']:first-of-type {
    text-align: left;
  }

  tbody > tr > th[scope='row'] {
    font-size: var(--step-0);
    font-weight: normal;
    padding: 0 0.125em;
    text-align: left;
    width: 15em;
  }

  tbody > tr > td {
    font-size: var(--step-0);
    text-align: center;
  }
  tfoot {
    width: 100%;


    & th {
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
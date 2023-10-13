<script>
  import {teesSelected, course, progs069, progAdj, linkTime, teeTimeCount, teamTables, playingDate, showIndividualHandicaps, textareaValue} from '$lib/store';
  import * as _ from 'lodash';
  import {
    LineupTeamTable,
    TeamsTeamTable,
  } from '$lib/components/export/activelineup';
  import { getPlayersInGroup } from '$lib/components/common/utils';
  import {
    createProgAdjMessage,
    getCourseName,
    getTeeTimes,
  } from '$lib/components/common/utils';
  let courseName = getCourseName($course);
  const progAdjMessage = createProgAdjMessage($progAdj, $progs069);
  const times = getTeeTimes($linkTime, $teeTimeCount);
  let lineupPlayersArray = getPlayersInGroup('createExportLineupTable');
  let teamsPlayersArray = getPlayersInGroup('createExportTeamsTable');

  let lineupTeamTables = updateLineupTeamTables();
  let teamsTeamTables = updateTeamsTeamTables();
  let lineupTeamMembers = [];
  let teamsTeamMembers = [];

  function updateLineupTeamTables() {
    let _teamTables = _.cloneDeep($teamTables);
    for (let i = 0; i < $teeTimeCount; i++) {
      let aTeamName = 'team' + i;
      try {
        let aPlayerCount = _teamTables[aTeamName].length;
        for (let j = 0; j < aPlayerCount; j++) {
          let aTeamMemberId = _teamTables[aTeamName][j].id;
          let aPlayerObj = lineupPlayersArray.find(
            (obj) => obj.id === aTeamMemberId
          );
          _teamTables[aTeamName][j].playerName = aPlayerObj.playerName;
          _teamTables[aTeamName][j].courseHandicaps = aPlayerObj.courseHandicaps;
        }
      } catch (error) {
        console.log('error updating Lineup Team Tables');
      }
    }
    return _teamTables;
  }
  function updateTeamsTeamTables() {
    let _teamTables = _.cloneDeep($teamTables);
    for (let i = 0; i < $teeTimeCount; i++) {
      let aTeamName = 'team' + i;
      try {
        let aPlayerCount = _teamTables[aTeamName].length;
        for (let j = 0; j < aPlayerCount; j++) {
          let aTeamMemberId = _teamTables[aTeamName][j].id;
          let aPlayerObj = teamsPlayersArray.find(
            (obj) => obj.id === aTeamMemberId
          );
          _teamTables[aTeamName][j].playerName = aPlayerObj.playerName;
        }
      } catch (error) {
        console.log('error updating Teams Team Tables');
      }
    }
    return teamTables;
  }

  function setManualCHCourseHandicaps(teamMembers) {
    //iterate through teamMembers
    try {
      for (let i = 0; i < teamMembers.length; i++) {
        let aTeeChoice = teamMembers[i].teeChoice;
        let aManualCH = teamMembers[i].manualCH;
        if (aManualCH !== 'Auto') {
          let teesSelectedArray = $teesSelected[$course].map((a) => a.value);
          let aChosenTeeIndex = teesSelectedArray.indexOf(aTeeChoice);
          if (aManualCH !== '-') {
            for (let j = 0; j < teesSelectedArray.length; j++) {
              teamMembers[i].courseHandicaps[j] = '*';
            }
            teamMembers[i].courseHandicaps[aChosenTeeIndex] = aManualCH;
            teamMembers[i].playerName = teamMembers[i].playerName + '*';
          } else {
            for (let j = 0; j < teesSelectedArray.length; j++) {
              teamMembers[i].courseHandicaps[j] = 'X';
            }
          }
        }
      }
    } catch (error) {
      console.log('error setting ManualCourseHandicaps');
    }
  }
  const arrayTeeTimeIndexes = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );
  const teeTimeIndexes = arrayTeeTimeIndexes(0,$teeTimeCount - 1,1);
 
</script>

<div id='lineup-table-export'>
  <div id='lineup-image'>
    <h2>{$playingDate + ' at ' + courseName}</h2>
    <div>
      {#if $showIndividualHandicaps}
        {#each teeTimeIndexes as item}        
          {setManualCHCourseHandicaps(lineupTeamMembers)}
          <LineupTeamTable
            teamNumber={item}
            times={times}
            teamTables={lineupTeamTables}
            teamMembers={lineupTeamTables['team' + item]}
          />
        {/each}
      {:else}
      {#each teeTimeIndexes as item}
        <TeamsTeamTable
          teamNumber={item}
          times={times}
          teamTables={teamsTeamTables}
          teamMembers={teamsTeamTables['team' + item]}
        />
  {/each}
      {/if}
    </div>
    {#if ($showIndividualHandicaps && $progs069 > 0)}
      <p>{progAdjMessage}</p>
    {/if}
    <textarea
      id='textarea-export'
      cols='36'
      value={$textareaValue}
      readOnly={true}
    />
  </div>
</div>
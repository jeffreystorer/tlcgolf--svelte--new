<script>
  import {afterUpdate} from 'svelte';
  import {course, progs069, progAdj, linkTime, teeTimeCount, teamTables, playingDate, showIndividualHandicaps} from '$lib/store';
  import * as _ from 'lodash';
  import {
    ExportTextarea,
    LineupTeamTable,
    TeamsTeamTable,
  } from '$lib/components/export/activelineup';
  import {
    getPlayersInGroup,
    createProgAdjMessage,
    getCourseName,
    getTeeTimes,
  } from '$lib/components/common/utils';
  import { updateScreenshotUrl } from '$lib/components/export/utils';
  let courseName = getCourseName($course);
  const progAdjMessage = createProgAdjMessage($progAdj, $progs069);
  const times = getTeeTimes($linkTime, $teeTimeCount);
  let lineupPlayersArray = getPlayersInGroup('createExportLineupTable');
  let teamsPlayersArray = getPlayersInGroup('createExportTeamsTable');

  let lineupTeamTables = updateLineupTeamTables();
  let teamsTeamTables = updateTeamsTeamTables();

  afterUpdate(() => {
    updateScreenshotUrl();
  });

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
    return _teamTables;
  }
</script>

<div id='lineup-table-export'>
  <div id='lineup-image'>
    <h2>{$playingDate + ' at ' + courseName}</h2>
    <div>    
      {#if $showIndividualHandicaps}
        {#each Array($teeTimeCount) as _, index}
          <LineupTeamTable
            teamNumber={index}
            times={times}
            teamTables={lineupTeamTables}
            teamMembers={lineupTeamTables['team' + index]}
          />
        {/each}
      {:else}
      {#each Array($teeTimeCount) as _, index}
        <TeamsTeamTable
          teamNumber={index}
          times={times}
          teamTables={teamsTeamTables}
          teamMembers={teamsTeamTables['team' + index]}
        />
      {/each}
      {/if}
    </div>
    {#if ($showIndividualHandicaps && Number($progs069) > 0)}
      <p>{progAdjMessage}</p>
    {/if}
    <ExportTextarea/>
  </div>
</div>

<style>

  #lineup-table-export {
    margin: 0 auto 1em auto;
    width: fit-content;
  }
  #lineup-image {
    background-color: var(--background-white);
    padding: 1em;

    & > div {
      background-color: var(--background-white);
      margin: 0 auto;
      width: fit-content;
    }

    & > h2 {
      font-size: var(--step-0);
      font-weight: 700;
  }
  }
</style>
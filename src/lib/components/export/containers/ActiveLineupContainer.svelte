<script>
  import {teesSelected, course, progs069, progAdj, linkTime, teeTimeCount, teamTables, showFirstName,showTeamHcp,showLocalNumbers,showIndividualHandicaps} from '$lib/store';
  import * as _ from 'lodash';
  import {
    ActiveLineup,
    LineupTeamTable,
    TeamsTeamTable,
  } from '$lib/components/export/activelineup';
  import { getPlayersInGroup } from '$lib/components/common/utils';
  import {
    get,
    set,
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

  let LineupTeamTables = [];
  function generateExportLineupTeamTables() {
    for (var i = 0; i < lineup.teeTimeCount; i++) {
      let teamName = 'team' + i;
      lineupTeamMembers = lineupTeamTables[teamName];
      setManualCHCourseHandicaps(lineupTeamMembers);
      LineupTeamTables[i] = (
        <LineupTeamTable
          key={uuidv4()}
          showTeamHcp={showTeamHcp}
          teamNumber={i}
          times={times}
          teamTables={lineupTeamTables}
          teamMembers={lineupTeamMembers}
          progAdj={lineup.progAdj}
          progs069={lineup.progs069}
          teesSelected={lineup.teesSelected}
        />
      );
    }
    return LineupTeamTables;
  }

  let TeamsTeamTables = [];
  function generateExportTeamsTeamTables() {
    for (var i = 0; i < lineup.teeTimeCount; i++) {
      let teamName = 'team' + i;
      teamsTeamMembers = teamsTeamTables[teamName];
      TeamsTeamTables[i] = (
        <TeamsTeamTable
          key={uuidv4()}
          teamNumber={i}
          times={times}
          teamTables={teamsTeamTables}
          teamMembers={teamsTeamMembers}
        />
      );
    }
    return TeamsTeamTables;
  }
</script>

<ActiveLineup
  courseName={courseName}
  generateExportLineupTeamTables={generateExportLineupTeamTables}
  generateExportTeamsTeamTables={generateExportTeamsTeamTables}
  progAdjMessage={progAdjMessage}
/>
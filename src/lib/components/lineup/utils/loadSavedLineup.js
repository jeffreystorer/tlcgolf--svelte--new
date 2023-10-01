import { get } from 'svelte/store';
import {courseData, groups, allPlayersInTable, course, group, lineupTitle, playingDate, teamTables,linkTime,teeTimeCount,textareaValue,progs069, progAdj, playersInLineup, missingPlayerMessage, teesSelected} from '$lib/store';
import {
  getPlayersInGroup,
  updateTeamTables
} from "$lib/components/common/utils";

export default function loadSavedLineup({
  _title,
  _playersInLineup,
  _players,
  _course,
  _game,
  _linkTime,
  _playingDate,
  _progs069,
  _progAdj,
  _teamTables,
  _teeTimeCount,
  _textareaValue,
  _teesSelected,
}) {
  group.set(_game);
  course.set(_course);
  let missingPlayer = false;
  teesSelected.set({
    ...get(teesSelected),
    [_course]: _teesSelected,
  });

  lineupTitle.set(_title);
  linkTime.set(_linkTime);
  playingDate.set(_playingDate);
  progs069.set(_progs069);
  progAdj.set(_progAdj);
  if (_teamTables) {
    teamTables.set(_teamTables);
  } else {
    teamTables.set({
      teeAssignments: [1],
      team0: [],
      team1: [],
      team2: [],
      team3: [],
      team4: [],
      team5: [],
      team6: [],
      team7: [],
      team8: [],
      team9: []
    });
  }
  teeTimeCount.set(_teeTimeCount);
  textareaValue.set(_textareaValue);
  //A saved lineup will not include an empty team
  let teamCount = Object.keys(_teamTables).length - 2;

  if (teeTimeCount > teamCount) {
    for (let i = teamCount; i < teeTimeCount; i++) {
      let newTeam = "team" + i;
      teamTables.set({
        ..._teamTables,
        [newTeam]: [],
      });
    }
  }

  checkForPlayersInLineupButNotInTable();
  if (missingPlayer) return;

  //teesSelected below is teesSelected[course]
  const teesSelectedCourse = _teesSelected;
  const playersInGroup = getPlayersInGroup(
    get(course),
    get(group),
    teesSelectedCourse,
    get(teamTables),
    get(teeTimeCount),
    get(courseData),
    get(groups),
    get(allPlayersInTable)
  );
  updateTeamTables();
  let newPlayersInLineupArray = [];
  playersInLineup.forEach((id) => {
    newPlayersInLineupArray.push(
      playersInGroup.find((player) => player.id === Number(id))
    );
  });
  playersInLineup.set(newPlayersInLineupArray);

  function checkForPlayersInLineupButNotInTable() {
    _playersInLineup.forEach(testPlayer);

    function testPlayer(anId) {
      let aPlayerObj = _players.find((obj) => obj.id === Number(anId));
      let lastName = aPlayerObj.lastName;
      var i = 0;
      var playerFound = false;
      try {
        do {
          playerFound = get(allPlayersInTable)[i][0] === anId.toString();
          i++;
        } while (!playerFound);
        return i - 1;
      } catch (error) {
        missingPlayer = true;
        missingPlayerMessage.set(
          "One of the players in this lineup (GHIN Number: " +
            anId +
            ", Last Name: " +
            lastName +
            ") is no longer in your table.  Please delete this lineup or edit your table to add the player."
        );
        window.location.href = "#missingplayermodal";
      }
    }
  }
}
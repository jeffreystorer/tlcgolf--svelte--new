import { get } from 'svelte/store';
import {courseData, groups, allPlayersInTable, course, group, lineupTitle, playingDate, teamTables,linkTime,teeTimeCount,textareaValue,progs069, progAdj, playersInLineup, missingPlayerMessage, teesSelected} from '$lib/store';
import {
  getPlayersInGroup,
  updateTeamTables
} from "$lib/components/common/utils";

export default function loadSavedLineup(savedLineup){
  group.set(savedLineup.game);
  course.set(savedLineup.course);
  let missingPlayer = false;
  teesSelected.set({
    ...get(teesSelected),
    [savedLineup.course]: savedLineup.teesSelected,
  });

  lineupTitle.set(savedLineup.title);
  linkTime.set(savedLineup.linkTime);
  playingDate.set(savedLineup.playingDate);
  progs069.set(savedLineup.progs069);
  progAdj.set(savedLineup.progAdj);
  if (savedLineup.teamTables) {
    teamTables.set(savedLineup.teamTables);
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
  teeTimeCount.set(savedLineup.teeTimeCount);
  textareaValue.set(savedLineup.textareaValue);
  //A saved lineup will not include an empty team
  let teamCount = Object.keys(savedLineup.teamTables).length - 2;

  if (get(teeTimeCount) > teamCount) {
    for (let i = teamCount; i < get(teeTimeCount); i++) {
      let newTeam = "team" + i;
      teamTables.set({
        ...savedLineup.teamTables,
        [newTeam]: [],
      });
    }
  }

  checkForPlayersInLineupButNotInTable();
  if (missingPlayer) return;

  //teesSelected below is teesSelected[course]
  const teesSelectedCourse = savedLineup.teesSelected;
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
  savedLineup.playersInLineup.forEach((id) => {
    newPlayersInLineupArray.push(
      playersInGroup.find((player) => player.id === Number(id))
    );
  });
  playersInLineup.set(newPlayersInLineupArray);
  

  function checkForPlayersInLineupButNotInTable() {
    savedLineup.playersInLineup.forEach(testPlayer);

    function testPlayer(anId) {
      let aPlayerObj = savedLineup.players.find((obj) => obj.id === Number(anId));
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
import * as _ from "lodash";
import {
  buildTeeArray,
  returnCourseHandicapArray,
} from "$lib/components/common/utils";
import { useGetPlayersInGroup } from "$lib/components/common/hooks";
import { getGender } from "$lib/components/lineup/hooks/utils";
import { course, courseData, allPlayersInTable, teamTables, teeTimeCount} from '$lib/store';

export default function updateTeamTables(teesSelectedCourse) {
    const playersInGroup = getPlayersInGroup(
      "createLineupTable",
      teesSelectedCourse
    );
    const teesSelectedArray = buildTeeArray(teesSelectedCourse);
    let newTeamTables = _.cloneDeep($teamTables);

    for (let i = 0; i < teeTimeCount; i++) {
      let aTeamName = "team" + i;
      try {
        let aPlayerCount = newTeamTables[aTeamName].length;
        for (let j = 0; j < aPlayerCount; j++) {
          let aTeamMemberId = newTeamTables[aTeamName][j].id;
          let aPlayerObj = playersInGroup.find(
            (obj) => obj.id === aTeamMemberId
          );
          newTeamTables[aTeamName][j].playerName = aPlayerObj.playerName;
          newTeamTables[aTeamName][j].strHcpIndex = aPlayerObj.strHcpIndex;
          newTeamTables[aTeamName][j].teeChoice = aPlayerObj.teeChoice;
          updatePlayerOnTeam(aTeamName, j);
        }
      } catch (error) {
        console.log(
          "useUpdateTeam Tables: error updating Team Tables for: " + aTeamName
        );
      }
    }

    $teamTables = newTeamTables;

    function updatePlayerOnTeam(teamName, playerIndex) {
      const aTeeChoice = newTeamTables[teamName][playerIndex].teeChoice;
      let teeNo = teesSelectedArray.indexOf(aTeeChoice);

      if (teeNo < 0) teeNo = 0;
      const strHcpIndex = newTeamTables[teamName][playerIndex].strHcpIndex;
      const gender = getGender(
        newTeamTables[teamName][playerIndex].id.toString(),
        allPlayersInTable
      );

      const aManualCH = newTeamTables[teamName][playerIndex].manualCH;
      const playerName = newTeamTables[teamName][playerIndex].playerName;

      if (playerName.endsWith("*")) {
        const newPlayerName = playerName.slice(0, -1);
        newTeamTables[teamName][playerIndex].playerName = newPlayerName;
      }
      switch (aManualCH) {
        case "Auto":
          newTeamTables[teamName][playerIndex].courseHandicaps =
            returnCourseHandicapArray(
              $courseData,
              gender,
              strHcpIndex,
              $course,
              teesSelectedCourse
            );
          break;
        case "-":
          for (let j = 0; j < teesSelectedArray.length; j++) {
            newTeamTables[teamName][playerIndex].courseHandicaps[j] = "X";
          }
          break;
        default:
          for (let j = 0; j < teesSelectedArray.length; j++) {
            newTeamTables[teamName][playerIndex].courseHandicaps[j] = "*";
          }
          newTeamTables[teamName][playerIndex].courseHandicaps[teeNo] =
            aManualCH;
          if (!newTeamTables[teamName][playerIndex].playerName.endsWith("*")) {
            newTeamTables[teamName][playerIndex].playerName =
              newTeamTables[teamName][playerIndex].playerName + "*";
          }
          break;
      }
    }
  }

  return updateTeamTables;
}

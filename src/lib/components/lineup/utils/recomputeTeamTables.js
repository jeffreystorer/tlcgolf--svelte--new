import { get } from 'svelte/store';
import { allPlayersInTable,course, courseData, teesSelected,teamTables } from '$lib/store';
import {
  buildTeeArray,
  returnCourseHandicapArray,
} from "$lib/components/common/utils";
import { getGender } from "$lib/components/common/utils";

export default function recomputeTeamTables(playerIndex, newTeamTables, teamName) {
    const teesSelectedCourse = get(teesSelected)[get(course)]
    const teesSelectedArray = buildTeeArray(teesSelectedCourse);
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
            get(courseData),
            gender,
            strHcpIndex,
            get(course),
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
        newTeamTables[teamName][playerIndex].courseHandicaps[teeNo] = aManualCH;
        if (!newTeamTables[teamName][playerIndex].playerName.endsWith("*")) {
          newTeamTables[teamName][playerIndex].playerName =
            newTeamTables[teamName][playerIndex].playerName + "*";
        }
        break;
    }
    teamTables.set(newTeamTables);
  }
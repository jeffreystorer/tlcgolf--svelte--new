import { get } from 'svelte/store';
import { allPlayersInTable,course, courseData, teesSelected,teamTables } from '$lib/store';
import {
  buildTeeArray,
  returnCourseHandicapArray,
} from "$lib/components/common/utils";
import { getGender } from "$lib/components/common/utils";

export default function recomputeTeamTables(playerIndex, _teamTables, teamName) {
    const teesSelectedCourse = get(teesSelected)[get(course)]
    const teesSelectedArray = buildTeeArray(teesSelectedCourse);
    const aTeeChoice = _teamTables[teamName][playerIndex].teeChoice;
    let teeNo = teesSelectedArray.indexOf(aTeeChoice);
    if (teeNo < 0) teeNo = 0;
    const strHcpIndex = _teamTables[teamName][playerIndex].strHcpIndex;
    const gender = getGender(
      _teamTables[teamName][playerIndex].id.toString(),
      get(allPlayersInTable)
    );
    const aManualCH = _teamTables[teamName][playerIndex].manualCH;
    const playerName = _teamTables[teamName][playerIndex].playerName;
    if (playerName.endsWith("*")) {
      const newPlayerName = playerName.slice(0, -1);
      _teamTables[teamName][playerIndex].playerName = newPlayerName;
    }
    switch (aManualCH) {
      case "Auto":
        _teamTables[teamName][playerIndex].courseHandicaps =
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
          _teamTables[teamName][playerIndex].courseHandicaps[j] = "X";
        }
        break;
      default:
        for (let j = 0; j < teesSelectedArray.length; j++) {
          _teamTables[teamName][playerIndex].courseHandicaps[j] = "*";
        }
        _teamTables[teamName][playerIndex].courseHandicaps[teeNo] = aManualCH;
        if (!_teamTables[teamName][playerIndex].playerName.endsWith("*")) {
          _teamTables[teamName][playerIndex].playerName =
            _teamTables[teamName][playerIndex].playerName + "*";
        }
        break;
    }
    teamTables.set(_teamTables);
  }
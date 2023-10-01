import { get } from 'svelte/store';
import {playersInLineup,course,teesSelected, sortOrder} from '$lib/store';
import * as _ from "lodash";
import { buildTeeArray, shuffleArray } from "$lib/components/common/utils";

 export default function handleSortPlayersInLineup() {

  let newPlayersInLineup = _.cloneDeep(get(playersInLineup));
  let teesSelectedArray = buildTeeArray(get(teesSelected)[get(course)]);
    switch (get(sortOrder)) {
      case "alphabetical":
        sortAlphabetical();
        break;
      case "byHandicap":
        sortByHandicap();
        break;
      case "random":
        sortRandom();
        break;
      default:
        break;
    }
    
    playersInLineup.set(newPlayersInLineup);

    function sortAlphabetical() {
      newPlayersInLineup.sort((a, b) =>
        a.lastName > b.lastName
          ? 1
          : a.lastName === b.lastName
          ? a.firstName > b.firstName
            ? 1
            : -1
          : -1
      );
    }

    function sortByHandicap() {
      newPlayersInLineup.sort((a, b) => {
        let aCourseHcp = getCourseHcp(a);
        let bCourseHcp = getCourseHcp(b);
        if (a.strHcpIndex === "no index") {
          aCourseHcp = 50;
        }
        if (b.strHcpIndex === "no index") {
          bCourseHcp = 50;
        }
        return aCourseHcp > bCourseHcp
          ? 1
          : aCourseHcp === bCourseHcp
          ? a.lastName > b.lastName
            ? 1
            : -1
          : -1;
      });
    }

    function sortRandom() {
      shuffleArray(newPlayersInLineup);
    }

    function getCourseHcp(player) {
      let teeChoice = player.teeChoice;
      let teeNo = teesSelectedArray.indexOf(teeChoice);
      if (teeNo < 0) teeNo = 0;
      if (player.courseHandicaps[teeNo] !== "X") {
        return Number(player.courseHandicaps[teeNo]);
      }
    }
  }
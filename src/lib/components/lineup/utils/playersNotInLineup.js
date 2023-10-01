import { get } from 'svelte/store';
import {idsInLineup} from '$lib/store';
import { getPlayersInGroup } from "$lib/components/common/utils";

export default function playersNotInLineup() {
  const playersInGroup = getPlayersInGroup("createLineupTable");
  let playersNotInLineupArray = [];

  playersInGroup.forEach((player) => {
    if (get(idsInLineup).includes(player.id.toString()) === false) {
      playersNotInLineupArray.push(player);
    }
  });
  return playersNotInLineupArray;
}
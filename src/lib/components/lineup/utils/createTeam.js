import { get } from 'svelte/store';
import {playersInLineup, teamTables} from '$lib/store';

export default function createTeam(autoPop) {
  let _playersInLineup = get(playersInLineup);
  let _teamTables = get(teamTables);
  for (let i = 0; i < autoPop.length; i++) {
    for (let j = 0; j < autoPop[i].length; j++) {
      let newPlayerObj = _playersInLineup[autoPop[i][j]];
      let name = "team" + i;
      _teamTables[name].push(newPlayerObj);
    }
  }
  teamTables.set(_teamTables);
}
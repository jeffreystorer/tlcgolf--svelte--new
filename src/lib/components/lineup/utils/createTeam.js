import { get } from 'svelte/store';
import {playersInLineup, teamTables} from '$lib/store';
let _playersInLineup = get(playersInLineup);
let _teamTables = get(teamTables);

export default function createTeam(autoPop) {
    for (let i = 0; i < autoPop.length; i++) {
      for (let j = 0; j < autoPop[i].length; j++) {
        let newPlayerObj = _playersInLineup[autoPop[i][j]];
        let name = "team" + i;
        teamTables.set({..._teamTables, [name]: _teamTables[name].concat(newPlayerObj)});
      }
    }
  }
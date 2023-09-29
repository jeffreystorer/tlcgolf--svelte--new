export const ssr = false;
import { get } from 'svelte/store';
import {captainGHINNumber} from '$lib/store';
let ghinNumber = get(captainGHINNumber);
import { getSnapshots } from '$lib/components/lineup/utils';

export async function load(){
  let snapshots = await getSnapshots(ghinNumber).then((data) => {
    let items = [];
    for (const [key, value] of Object.entries(data)) {      
      items.push({
        key: key,
        lineup: value.lineup,
        title: value.title,
      });
    }; 
    return items;
  });
  return {snapshots: snapshots};
}
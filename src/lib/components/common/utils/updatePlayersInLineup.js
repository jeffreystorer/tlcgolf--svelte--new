import { get } from 'svelte/store';
import { idsInLineup, playersInLineup } from '$lib/store';
import { getPlayersInGroup } from '$lib/components/common/utils';

export default function updatePlayersInLineup() {
	const playersInGroup = getPlayersInGroup('createLineupTable');
	let newPlayersInLineupArray = [];
	get(idsInLineup).forEach((id) => {
		newPlayersInLineupArray.push(playersInGroup.find((player) => player.id === Number(id)));
	});
	playersInLineup.set(newPlayersInLineupArray);
}

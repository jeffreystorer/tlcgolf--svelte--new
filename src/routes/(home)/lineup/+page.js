export const ssr = false;
import { get } from 'svelte/store';
import { captainGHINNumber } from '$lib/store';
import { getSnapshots } from '$lib/components/lineup/utils';

export async function load() {
	let _captainGHINNumber = get(captainGHINNumber);
	let snapshots = await getSnapshots(_captainGHINNumber).then((data) => {
		let items = [];
		for (const [key, value] of Object.entries(data)) {
			items.push({
				key: key,
				lineup: value.lineup,
				title: value.title
			});
		}
		return items;
	});
	return { snapshots: snapshots };
}

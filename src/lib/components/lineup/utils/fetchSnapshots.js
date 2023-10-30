import { getSnapshots } from '$lib/components/lineup/utils';

export default async function fetchSnapshots(ghinNumber) {
	let snapshots = await getSnapshots(ghinNumber).then((data) => {
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
	console.log("🚀 ~ file: fetchSnapshots.js:16 ~ fetchSnapshots ~ snapshots:", snapshots)
	return snapshots;
}

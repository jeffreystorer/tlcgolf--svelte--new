import { getPlayersInGroup } from '$lib/components/common/utils';

export default function updatePlayersInLineup(
	teesSelectedCourse,
	group,
	sortOrder,
	idsInLineup,
	course,
	courseData,
	groups,
	allPlayersInTable,
	showFirstName,
	showLocalNumbers
) {
	const playersInGroup = getPlayersInGroup(
		'createLineupTable',
		course,
		group,
		teesSelectedCourse,
		courseData,
		groups,
		allPlayersInTable,
		sortOrder,
		showFirstName,
		showLocalNumbers
	);
	let newPlayersInLineupArray = [];
	idsInLineup.forEach((id) => {
		newPlayersInLineupArray.push(playersInGroup.find((player) => player.id === Number(id)));
	});
	return newPlayersInLineupArray;
}

export default function returnHeaderRow(teesSelectedCourse) {
	let teesSelectedArray = [];
	if (teesSelectedCourse) {
		teesSelectedArray = teesSelectedCourse.map((a) => a.value);
		//add a blank column over the player
		teesSelectedArray.unshift('');
	}
	return teesSelectedArray;
}

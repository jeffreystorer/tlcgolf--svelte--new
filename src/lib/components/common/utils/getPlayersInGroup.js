import { get } from 'svelte/store';
import { course,group,teesSelected,courseData,groups,allPlayersInTable,sortOrder,showFirstName,showLocalNumbers} from '$lib/store';
import {
	buildTeeArray,
	returnCourseHandicapArray,
	getTeeValueFromTeeLabel,
	getTeeLabelFromTeeValue,
	shuffleArray
} from '$lib/components/common/utils';

export default function getPlayersInGroup(playersArrayType) {
	// eslint-disable-next-line
	const [teeLabels, teeValues, ratings, slopes, pars] = get(courseData);
	let playersArray = [];
	let strHcpIndex;
	let hcpIndex;
	let gender;
	//create an array of values of tees selected
	const teesSelectedCourse = get(teesSelected)[get(course)]
	let teesSelectedArray = buildTeeArray(teesSelectedCourse);
	/*For a player whose preferred tee is
  not included in the tees selected,
  set the player's tee choice to the first tee selected*/

	allPlayersInTable.forEach(addRowToPlayersArray);

	switch (playersArrayType) {
		case 'createLineupTable':
			switch (get(sortOrder)) {
				case 'alphabetical':
					sortAlphabetical();
					break;
				case 'byHandicap':
					sortByHandicap();
					break;
				case 'random':
					sortRandom();
					break;
				default:
					break;
			}
			break;
		default:
			break;
	}
	return playersArray;

	//filter allPlayersInTable to the players in the group, then add them to the playersarray
	function addRowToPlayersArray(item, index) {
		let groupNumber = get(groups).indexOf(get(group));
		let groupIndex = groupNumber + 6;
		switch (groupNumber) {
			case 0:
				doAdd(item, index);
				break;
			default:
				if (item[groupIndex].toUpperCase() === 'YES') doAdd(item, index);
		}
	}

	//add a row to the playersArray for each player in the group
	function doAdd(item, index) {
		let aPlayer = JSON.parse(JSON.stringify(item));
		/*For a player whose preferred tee is
  not included in the tees selected,
  set the player's tee choice to the first tee selected*/
		const defaultTeeLabel = aPlayer[2];
		const defaultTeeValue = getTeeValueFromTeeLabel(defaultTeeLabel, get(course), get(courseData));
		const teeNo = teesSelectedArray.indexOf(defaultTeeValue);

		if (teeNo < 0) {
			const newTee = getTeeLabelFromTeeValue(teesSelectedArray[0], get(course), get(courseData));
			aPlayer[2] = newTee;
		}
		let player = compute(aPlayer, index);
		playersArray.push(player);
	}

	//construct the row
	function compute(aPlayer) {
		gender = aPlayer[5];
		let teeValue = getTeeValueFromTeeLabel(aPlayer[2], get(course), get(courseData));
		strHcpIndex = aPlayer[4];
		hcpIndex = strHcpIndex;
		if (strHcpIndex !== 'no index') hcpIndex = parseFloat(strHcpIndex);
		let firstName = aPlayer[3];
		let lastName = aPlayer[1];
		let local = aPlayer[6];
		let playerName = firstName + ' ' + lastName + ' (' + strHcpIndex + ')';
		let walkRide = 'R';
		if (groups.slice(-1) === 'Walk') {
			let walk = aPlayer.slice(-1);
			switch (walk) {
				case 'YES':
					walkRide = 'W';
					break;
				case 'NO':
					walkRide = 'R';
					break;
				default:
					break;
			}
		}

		if (playersArrayType === 'createExportLineupTable') {
			if (showFirstName) {
				playerName = firstName + ' ' + lastName + ' (' + strHcpIndex + ')';
			} else {
				playerName = lastName + ' (' + strHcpIndex + ')';
			}
			let prefix = '';
			if ((showLocalNumbers === true) | (showLocalNumbers === 'true')) {
				prefix = local + ' ';
			}
			playerName = prefix + playerName;
		}
		if (playersArrayType === 'createExportTeamsTable') {
			if (showFirstName) {
				playerName = aPlayer[3] + ' ' + aPlayer[1];
			} else {
				playerName = aPlayer[1];
			}

			let prefix = '';
			if (get(showLocalNumbers) === true || get(showLocalNumbers) === 'true') {
				prefix = local + ' ';
			}
			playerName = prefix + playerName;
		}
		let playerReturn = {
			id: Number(aPlayer[0]),
			playerName: playerName,
			courseHandicaps: [],
			teeChoice: teeValue,
			manualCH: 'Auto',
			lastName: lastName,
			index: hcpIndex,
			firstName: firstName,
			strHcpIndex: strHcpIndex,
			walk: walkRide
		};
		if (playersArrayType !== 'createExportTeamsTable') {
			const chArray = returnCourseHandicapArray(
				get(courseData),
				gender,
				strHcpIndex,
				get(course),
				teesSelectedCourse
			);
			playerReturn.courseHandicaps = chArray;
		}
		return playerReturn;
	}

	function sortAlphabetical() {
		playersArray.sort((a, b) =>
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
		playersArray.sort((a, b) => {
			let aCourseHcp = getCourseHcp(a);
			let bCourseHcp = getCourseHcp(b);
			if (a.strHcpIndex === 'no index') {
				aCourseHcp = 50;
			}
			if (b.strHcpIndex === 'no index') {
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
		shuffleArray(playersArray);
	}

	function getCourseHcp(player) {
		let teeChoice = player.teeChoice;
		let teeNo = teesSelectedArray.indexOf(teeChoice);
		if (teeNo < 0) teeNo = 0;
		if (player.courseHandicaps[teeNo] !== 'X') {
			return Number(player.courseHandicaps[teeNo]);
		}
	}
}

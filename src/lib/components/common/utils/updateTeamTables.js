import * as _ from 'lodash';
import { get } from 'svelte/store'
import { course, courseData, allPlayersInTable, teamTables, teeTimeCount, teesSelected } from '$lib/store';
import {
	buildTeeArray,
	getGender,
	getPlayersInGroup,
	returnCourseHandicapArray
} from '$lib/components/common/utils';

export default function updateTeamTables() {
	const playersInGroup = getPlayersInGroup('createLineupTable');
	const teesSelectedCourse = get(teesSelected)[get(course)];
	const teesSelectedArray = buildTeeArray(teesSelectedCourse);
	let _teamTables = _.cloneDeep(get(teamTables));

	for (let i = 0; i < get(teeTimeCount); i++) {
		let aTeamName = 'team' + i;
		try {
			let aPlayerCount = _teamTables[aTeamName] ? _teamTables[aTeamName].length : 0;
			if (aPlayerCount > 0) {
				for (let j = 0; j < aPlayerCount; j++) {
					let aTeamMemberId = _teamTables[aTeamName][j].id;
					let aPlayerObj = playersInGroup.find((obj) => obj.id === aTeamMemberId);
					_teamTables[aTeamName][j].playerName = aPlayerObj.playerName;
					_teamTables[aTeamName][j].strHcpIndex = aPlayerObj.strHcpIndex;
					_teamTables[aTeamName][j].teeChoice = aPlayerObj.teeChoice;
					updatePlayerOnTeam(aTeamName, j);
				}
			}
		} catch (error) { console.log("updateTeamTables: error updatingPlayerOnTeam")
		}
	}

	function updatePlayerOnTeam(teamName, playerIndex) {
		const aTeeChoice = _teamTables[teamName][playerIndex].teeChoice;
		let teeNo = teesSelectedArray.indexOf(aTeeChoice);

		if (teeNo < 0) teeNo = 0;
		const strHcpIndex = _teamTables[teamName][playerIndex].strHcpIndex;
		const gender = getGender(_teamTables[teamName][playerIndex].id.toString(), get(allPlayersInTable));

		const aManualCH = _teamTables[teamName][playerIndex].manualCH;
		const playerName = _teamTables[teamName][playerIndex].playerName;

		if (playerName.endsWith('*')) {
			const newPlayerName = playerName.slice(0, -1);
			_teamTables[teamName][playerIndex].playerName = newPlayerName;
		}
		switch (aManualCH) {
			case 'Auto':
				_teamTables[teamName][playerIndex].courseHandicaps = returnCourseHandicapArray(
					get(courseData),
					gender,
					strHcpIndex,
					get(course),
					teesSelectedCourse
				);
				break;
			case '-':
				for (let j = 0; j < teesSelectedArray.length; j++) {
					_teamTables[teamName][playerIndex].courseHandicaps[j] = 'X';
				}
				break;
			default:
				for (let j = 0; j < teesSelectedArray.length; j++) {
					_teamTables[teamName][playerIndex].courseHandicaps[j] = '*';
				}
				_teamTables[teamName][playerIndex].courseHandicaps[teeNo] = aManualCH;
				if (!_teamTables[teamName][playerIndex].playerName.endsWith('*')) {
					_teamTables[teamName][playerIndex].playerName =
						_teamTables[teamName][playerIndex].playerName + '*';
				}
				break;
		}
	}
	teamTables.set(_teamTables);
}

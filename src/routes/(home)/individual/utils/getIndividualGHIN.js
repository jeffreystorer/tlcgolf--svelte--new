import { get } from 'svelte/store';
import { dataMode, foundGolfer, roster } from '$lib/store';
import capitalize from '$lib/components/common/utils/capitalize.js'

import {
	aFirstName,
	aLastName,
	anIndex,
	aGender,
} from '$lib/components/common/utils/getRosterFields.js';

export default function getIndividualGHIN() {
	const ghinNumber = JSON.parse(localStorage.getItem('ghinNumber'));
	let _dataMode = get(dataMode);
	let _foundGolfer = get(foundGolfer);
	let _roster = get(roster)
	if (_dataMode === 'ghin') {
		try {
			let index = _foundGolfer.handicap_index;
			let gender = _foundGolfer.gender;
			let firstName = _foundGolfer.first_name;
			let rawName = firstName.toLowerCase();
			firstName = capitalize(rawName);
			if (firstName.indexOf('.') > 0) firstName = firstName.toUpperCase();
			let golfer =
				firstName + ' ' + _foundGolfer.last_name + ' (' + _foundGolfer.handicap_index + ')';
			return [index, gender, golfer];
		} catch (error) {console.log('error getting individual GHIN')}
	} else {
		try {
			let index = anIndex(_roster, ghinNumber);
			let gender = aGender(_roster, ghinNumber);
			let firstName = aFirstName(_roster, ghinNumber);
			let lastName = aLastName(_roster, ghinNumber);
			let rawName = firstName.toLowerCase();
			firstName = capitalize(rawName);
			if (firstName.indexOf('.') > 0) firstName = firstName.toUpperCase();
			let golfer = firstName + ' ' + lastName + ' (' + anIndex(roster, ghinNumber) + ')';
			return [index, gender, golfer];
		} catch (error) {console.log('error getting individual GHIN')}
	}
}

import firebaseApp from '$lib/firebase';
import { get, getDatabase, ref } from 'firebase/database';
import { captainGHINNumber } from '$lib/store';

export default async function getSnapshots() {
	let captainNumber;
	captainGHINNumber.subscribe((value) => (captainNumber = value));
	const firebaseRef = '"' + captainNumber.toString() + '"';
	const path = firebaseRef;
	console.log('😊😊 path', path);
	const dbRef = ref(getDatabase(firebaseApp), path);
	let snapshots =
	get(dbRef)
		.then((data) => {
			if (data.exists()) {
				let values  = Object.values(data.val());
				let keys = Object.keys(data.val());
				let lineups = keys.map((key, index) => {key: key,  lineup: values(index)})
			} else {
				console.log('No data available');
			}
		})
		.catch((error) => {
			console.error(error);
		});
	return snapshots;
}

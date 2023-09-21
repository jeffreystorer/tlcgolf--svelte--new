import firebaseApp from '$lib/firebase';
import { getDatabase, onValue, ref } from 'firebase/database';

export default function getSnapshots(ghinNumber) {
	const firebaseRef = '"' + ghinNumber.toString() + '"';
	const path = firebaseRef;
	const dbRef = ref(getDatabase(firebaseApp), path);
	let snapshots;
	onValue(dbRef, (snapshot) => {
		let data = snapshot.val();
		let values = Object.values(data)
		returnData(data, values);
	})
	function returnData(data){
		snapshots = data;
	}
	return snapshots;
}

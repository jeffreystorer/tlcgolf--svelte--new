import firebaseApp from '$lib/firebase';
import { child, getDatabase, get, ref } from 'firebase/database';

export default async function getSnapshots(ghinNumber) {
	const path = '"' + ghinNumber.toString() + '"';
	const dbRef = ref(getDatabase(firebaseApp));
	let snapshots = await get(child(dbRef, path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No data available');
        return {};
      }
    })
    .catch((error) => {
      console.error(error);
    });
	return snapshots;
}
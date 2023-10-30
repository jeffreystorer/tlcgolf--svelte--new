import { get } from 'svelte/store';
import { captainGHINNumber, realGHINNumber } from '$lib/store';
import firebaseApp from '$lib/firebase';
import { child, getDatabase, ref, push, remove } from 'firebase/database';

export function createLineup(data) {
	let _realGHINNumber = get(realGHINNumber);
	const firebaseRef = '"' + _realGHINNumber.toString() + '"';
	const path = '/' + firebaseRef;
	const dbRef = ref(getDatabase(firebaseApp), path);
	push(dbRef, data);
	captainGHINNumber.set(_realGHINNumber);
}

export function deleteLineup(key) {
	let _realGHINNumber = get(realGHINNumber);
	let _captainGHINNumber = get(captainGHINNumber);
	const firebaseRef = '"' + _realGHINNumber.toString() + '"';
	const path = '/' + firebaseRef;
	const dbRef = ref(getDatabase(firebaseApp), path);
	if (_realGHINNumber === _captainGHINNumber) remove(child(dbRef, '/' + key));
}

export function deleteAllLineups() {
	let _realGHINNumber = get(realGHINNumber);
	console.log("🚀 ~ file: lineupService.js:28 ~ deleteAllLineups ~ _realGHINNumber:", _realGHINNumber)
	let _captainGHINNumber = get(captainGHINNumber);
	console.log("🚀 ~ file: lineupService.js:30 ~ deleteAllLineups ~  _captainGHINNumber:",  _captainGHINNumber)
	const firebaseRef = '"' + _realGHINNumber.toString() + '"';
	const path = '/' + firebaseRef;
	const dbRef = ref(getDatabase(firebaseApp), path);
	if (_realGHINNumber === _captainGHINNumber) remove(dbRef);
}

import { get } from 'svelte/store';
import {captainGHINNumber, realGHINNumber} from '$lib/store';
let theRealGHINNumber = get(realGHINNumber);
let theCaptainGHINNumber = get(captainGHINNumber);
import firebaseApp from '$lib/firebase';
import { child, getDatabase, ref, push, remove } from "firebase/database";
const firebaseRef = '"' + theRealGHINNumber.toString() + '"';
const path = "/" + firebaseRef;
const dbRef = ref(getDatabase(firebaseApp), path);

export function createLineup(data) {
  push(dbRef, data);
  captainGHINNumber.set(theRealGHINNumber);
}

export function deleteLineup(key) {
if (theRealGHINNumber === theCaptainGHINNumber) remove(child(dbRef, "/" + key));
}

export function deleteAllLineups() {
if (theRealGHINNumber === theCaptainGHINNumber) remove(dbRef);
}

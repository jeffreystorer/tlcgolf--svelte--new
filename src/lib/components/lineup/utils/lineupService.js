import { get } from 'svelte/store';
import {captainGHINNumber, realGHINNumber} from '$lib/store';
let _realGHINNumber = get(realGHINNumber);
let _captainGHINNumber = get(captainGHINNumber);
import firebaseApp from '$lib/firebase';
import { child, getDatabase, ref, push, remove } from "firebase/database";
const firebaseRef = '"' + _realGHINNumber.toString() + '"';
const path = "/" + firebaseRef;
const dbRef = ref(getDatabase(firebaseApp), path);

export function createLineup(data) {
  push(dbRef, data);
  captainGHINNumber.set(_realGHINNumber);
}

export function deleteLineup(key) {
if (_realGHINNumber === _captainGHINNumber) remove(child(dbRef, "/" + key));
}

export function deleteAllLineups() {
if (_realGHINNumber === _captainGHINNumber) remove(dbRef);
}

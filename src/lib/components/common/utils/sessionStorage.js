import { browser } from '$app/environment';

export const sget = (item) => {
	if (!browser) return;
	try {
		const storedItem = sessionStorage.getItem(item);
		if (storedItem === null) {
			return undefined;
		}
		return JSON.parse(storedItem);
	} catch (err) {
		return undefined;
	}
};

export const sset = (item, value) => {
	if (!browser) return;
	try {
		const valueToBeStored = JSON.stringify(value);
		sessionStorage.setItem(item, valueToBeStored);
	} catch (err) {
		console.log(' error: ' + err + ' storing item: ' + item);
	}
};

export const sremove = (item) => {
	if (!browser) return;
	try {
		sessionStorage.removeItem(item);
	} catch (err) {
		console.log(' error: ' + err + ' removing item: ' + item);
	}
};

export const sclear = () => {
	if (!browser) return;
	sessionStorage.clear();
};

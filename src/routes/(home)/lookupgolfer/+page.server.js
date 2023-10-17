import GolferApi from '$lib/components/fetchdata/apis/golfer-api.js';
import LookupGolferApi from '$lib/components/fetchdata/apis/lookup-golfer-api.js';

export async function load({ url }) {
	let last_name = url.searchParams.get("last_name");
	let first_name = url.searchParams.get("first_name");
	let state = url.searchParams.get("state");
	const GHIN_PASSWORD = import.meta.env.VITE_GHIN_PASSWORD;
	const res1 = await GolferApi.login(GHIN_PASSWORD, '585871');
	if (!res1.status === 200) {
		throw new Error('Failed to fetch token');
	}
	const token = await res1.data.golfer_user.golfer_user_token;
	const res2 = await LookupGolferApi.lookupGolfer(token, last_name, first_name, state);
	if (!res2.status === 200) {
		throw new Error('Failed to lookup golfers');
	}
	const lookup = await res2.data;
	return { lookup, last_name, first_name };
}

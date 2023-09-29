import { CAPTAINS_URL } from '$lib/components/fetchdata/apis/constants';

export async function load() {
  const res = await fetch(CAPTAINS_URL);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch captainsData');
  }
  const captains = await res.json();
  return { captains };
}
import { TUTORIALS_URL } from '$lib/components/fetchdata/apis/constants';

export async function load() {
  const res = await fetch(TUTORIALS_URL);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch tutorialsData');
  }
  const tutorials = await res.json();
  return {tutorials};
}
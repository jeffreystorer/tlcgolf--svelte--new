import { SHEET_URL } from '$lib/components/fetchdata/apis/constants';

export async function load() {
  const res = await fetch(SHEET_URL);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch sheetsData');
  }
  const sheets = await res.json();
  return { sheets };
}
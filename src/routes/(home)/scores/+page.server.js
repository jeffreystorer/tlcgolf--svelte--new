import GolferApi from '$lib/components/fetchdata/apis/golfer-api.js';
import ScoresApi from '$lib/components/fetchdata/apis/scores-api.js';

export async function load({ url }) {
  const ghinNumber = url.searchParams.get("ghinNumber")
  const GHIN_PASSWORD = import.meta.env.VITE_GHIN_PASSWORD;
  const res1 = await GolferApi.login(GHIN_PASSWORD, '585871');
  if (!res1.status === 200) {
    throw new Error('Failed to fetch token');
  }
  const token = await res1.data.golfer_user.golfer_user_token;
  const res2 = await await ScoresApi.scores(token, ghinNumber);
  if (!res2.status === 200) {
    throw new Error('Failed to lookup golfers');
  }
  const scores = await res2.data;
  return {scores, ghinNumber}
}
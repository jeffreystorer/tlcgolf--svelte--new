import GolferApi from '$lib/components/fetchdata/apis/golfer-api.js';
import CourseApi from '$lib/components/fetchdata/apis/course-api.js';
import { COURSE_IDS } from '$lib/components/common/data';
import {
  BASE_URL,
  SHEET_ID,
  KEY,
  BATCH_KEY,
} from '$lib/components/fetchdata/apis/constants';
import {
  getPlayersAndGroups,
  processCourseDataFromGHIN,
  getDefaultTeesSelected,
  addGHINDataToPlayers,
  getCanadianData,
} from '$lib/components/fetchdata/apis/utils';

async function fetchTable(ghinNumber) {
  const TABLE_URL = BASE_URL + SHEET_ID + '/values/' + ghinNumber + KEY;
  const res = await fetch(TABLE_URL);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch tableData');
  }

  return res.json();
}
async function fetchBatchData() {
  const BATCH_URL =
    BASE_URL +
    SHEET_ID +
    '/values:batchGet?ranges=GHIN_Numbers&ranges=Course_Data_From_GHIN' +
    BATCH_KEY;
  const res = await fetch(BATCH_URL);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch batchData');
  }

  return res.json();
}
async function fetchToken() {
  const GHIN_PASSWORD = import.meta.env.VITE_GHIN_PASSWORD;
  const res = await GolferApi.login(GHIN_PASSWORD, '585871');
  if (!res.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch token');
  }

  return res.data.golfer_user.golfer_user_token;
}
async function fetchCourseData(course_id, token) {
  const res = await CourseApi.getCourseData(course_id, token);
  if (!res.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to get course data');
  }

  return res.data;
}
async function findGolfer(ghinNumber, token) {
  const res = await GolferApi.findGolfer(ghinNumber, token);
  if (!res.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to find golfer');
  }

  return res.data;
}
async function fetchCanadianData(cardNo) {
  const url = `https://scg.golfcanada.ca/api/members/search?text=${cardNo}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch canadianData');
  }

  return res.json();
}

export async function load() {
  const ghinNumber = '585871';
  const dataMode = 'ghin';
  const tableData = fetchTable(ghinNumber);
  const tokenData = fetchToken();
  const [table, token] = await Promise.all([tableData, tokenData]);
  const [groups, rawAllPlayersInTable] = getPlayersAndGroups(table.values);

  const ghinNumbers = rawAllPlayersInTable.map((player) => player[0]);
  let ghinDatas = [];
  ghinNumbers.forEach(createGHINDataItem);
  function createGHINDataItem(item) {
    const ghinData = findGolfer(item, token);
    ghinDatas.push(ghinData);
  }
  const foundGolfers = await Promise.all(ghinDatas);
  let ghinData = [];
  foundGolfers.map((item) => ghinData.push(item.golfers[0]));

  const lastNames = rawAllPlayersInTable.map((player) => player[1]);
  let canadianDatas = [];
  lastNames.forEach(createCanadianItem);
  function createCanadianItem(item) {
    const parenIndex = item.indexOf('(');
    if (parenIndex > -1) {
      const paren = item.substr(parenIndex);
      const parenType = paren.substr(1, 1);
      if (parenType === 'C') {
        const lastCPart = paren.substring(3);
        let cardNo = lastCPart.replace(')', '');
        const canadianData = fetchCanadianData(cardNo);
        canadianDatas.push(canadianData);
      }
    }
  }

  const canadians = await Promise.all(canadianDatas);
  let rawCanadianData = [];
  canadians.map((item) => rawCanadianData.push(item.members[0]));
  const canadianData = getCanadianData(rawCanadianData);

  const batch = await fetchBatchData(ghinNumber);

  let coursesDatas = [];
  COURSE_IDS.forEach(createCoursesDataItem);
  function createCoursesDataItem(item) {
    const itemData = fetchCourseData(item, token);
    coursesDatas.push(itemData);
  }
  const courses = await Promise.all(coursesDatas);

  const roster = batch.valueRanges[0].values;

  const courseData = processCourseDataFromGHIN(courses);
	const defaultTeesSelected = getDefaultTeesSelected('M');

  const allPlayersInTable = addGHINDataToPlayers(
    roster,
    rawAllPlayersInTable,
    canadianData,
    ghinData
  );

  const items = {
    local: {
      ghinNumber: ghinNumber,
      dataMode: dataMode,
    },
    groups: groups,
    allPlayersInTable: allPlayersInTable,
    courseData: courseData,      
		defaultTeesSelected: defaultTeesSelected
  };

  return {items};
}

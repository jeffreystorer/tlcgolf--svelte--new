import { get } from 'svelte/store'
import { courses } from '$lib/components/common/data';
import { courseData, teesSelectedSaturday, allPlayersInTable, groups } from '$lib/store';
import { returnCourseHandicapArray } from '$lib/components/common/utils';

export default function returnBodyRows() {
  const groupIndex = get(groups).indexOf('Saturday') + 6;

  //declare some variables
  let rows = [];
  let strHcpIndex;
  //let hcpIndex;
  let gender;

  //filter players, then add them
  function addRow(item, index) {
    if (
      item[groupIndex] === 'Yes' ||
      item[groupIndex] === 'YES' ||
      item[groupIndex] === 'yes'
    ) {
      doAdd(item, index);
    }
  }

  //construct the row
  function compute(aPlayer) {
    let rowReturn = [];
    rowReturn[0] = aPlayer[0];
    strHcpIndex = aPlayer[4];
    let lastName = aPlayer[1];
    gender = aPlayer[5];
    let player = lastName + ' (' + strHcpIndex + ')';
    rowReturn[1] = [player];
    courses.forEach(pushHandicaps);
    function pushHandicaps(item) {
      let course = item;

      const courseHandicaps = returnCourseHandicapArray(
        get(courseData),
        gender,
        strHcpIndex,
        get(course),
        get(teesSelectedSaturday)[get(course)]
      );
      courseHandicaps.forEach(pushCH);
      function pushCH(item) {
        rowReturn[1].push(item);
      }
    }
    return rowReturn;
  }

  //add a row for each player
  function doAdd(item, index) {
    const aPlayer = item;
    const newRow = compute(aPlayer, index);
    rows.push(newRow);
  }

  get(allPlayersInTable).forEach(addRow);
  return rows;
}

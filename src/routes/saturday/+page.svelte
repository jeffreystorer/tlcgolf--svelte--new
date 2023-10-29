<script>
  /* const items = {
    local: {
      ghinNumber: ghinNumber,
    },
    dataMode: dataMode,
    groups: groups,
    allPlayersInTable: allPlayersInTable,
    courseData: courseData,      
		defaultTeesSelected: defaultTeesSelected
  }; */
  export let data;
  import { dataMode, groups, allPlayersInTable, courseData, defaultTeesSelected, teesSelectedSaturday} from '$lib/store';
  import { set, sset } from '$lib/components/common/utils';
  const keys = Object.keys(data.items.local);
  const values = Object.values(data.items.local);
  keys.map((key, index) => set(key, values[index]));
  $dataMode = data.items.dataMode;
  $groups = data.items.groups;
  $allPlayersInTable = data.items.allPlayersInTable;
  $courseData = data.items.courseData;
  $teesSelectedSaturday = data.items.defaultTeesSelected;
  $defaultTeesSelected = data.items.defaultTeesSelected;
  sset('isLoggedIn', false);
  let today = new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];
  let dayName = days[today.getDay()];
  let monthName = months[today.getMonth()];
  let date = dayName + ', ' + monthName + ' ' + today.getDate(); 
  let teesSelectedArray = ['C', 'C/M', 'M'];
  let teeCount = 3;
  let courses = ['DC', 'MG', 'MW', 'OR', 'PA', 'TP'];
  import { returnBodyRows } from './utils';
  $: rows = returnBodyRows();
  
  </script>
  
    <h2>Saturday Madness Handicaps
    <br />
    {date}</h2>
    <table>
      <caption>
        Click on a Player for Revision Scores
        <br />
      </caption>
        
  
  <thead>
    <tr>
      <th scope='col'></th>
      {#each courses as course, index (index)}
          <th colSpan={teeCount} scope='colgroup'>
            {course}
          </th>
      {/each}
    </tr>
    <tr>
      <th scope='col'></th>
      {#each teesSelectedArray as tee, index (index)}
          <th scope='col'>
            {tee}
          </th>
      {/each}
      {#each teesSelectedArray as tee, index (index)}
          <th scope='col'>
            {tee}
          </th>
      {/each}
      {#each teesSelectedArray as tee, index (index)}
          <th scope='col'>
            {tee}
          </th>
      {/each}
      {#each teesSelectedArray as tee, index (index)}
          <th scope='col'>
            {tee}
          </th>
      {/each}
      {#each teesSelectedArray as tee, index (index)}
          <th scope='col'>
            {tee}
          </th>
      {/each}
      {#each teesSelectedArray as tee, index (index)}
          <th scope='col'>
            {tee}
          </th>
      {/each}
    </tr>
  </thead>         
  <tbody>
    {#each rows as row, index}
      <tr>
        <th scope='row' id=${rows[index][0]}><a href='/scores?ghinNumber={rows[index][0]}'>{rows[index][1][0]}</a></th>
        {#each row[1] as col, index}
          {#if index > 0}
            <td>{col}</td>
          {/if}
        {/each}
      </tr>
    {/each}
  </tbody>
    </table>

<style>    
  table {
  border-collapse: collapse;
  margin: 1em auto 2em auto;
  width: 90%;
  }
  caption {
  font-size: var(--step-0);
  font-weight: 700;
  margin-bottom: 0.5em;
  }


  thead tr:nth-of-type(2) {
  border-bottom: 0.125em solid currentColor;
  }


  tbody tr:nth-child(even) {
  background: var(--color-table-stripe);
  }

  td,
  th {
  padding: 0 0.3175em;
  }

  th[scope='row'] {
  font-weight: normal;
  padding-left: 0.5em;
  padding-right: 1em;
  text-align: left;
  width: fit-content;
  }

  th[scope='row'] a {
  color: var(--color-black);
  text-decoration: none;
  }

  tbody th,
  tbody tr td:nth-child(3n + 1) {
  border-right: 0.125em solid currentColor;
  }
  tbody th {
  border-left: 0.125em solid currentColor;
  }
  tbody tr:last-of-type {
  border-bottom: 1.5em solid var(--color-link-active);
  }

  thead tr:nth-of-type(2) {
  background-color: var(--color-link-active);
  color: var(--color-white);
  }
</style>
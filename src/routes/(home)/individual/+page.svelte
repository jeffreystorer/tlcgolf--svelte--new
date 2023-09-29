<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { get  } from '$lib/components/common/utils/localStorage.js';
  import { sget } from '$lib/components/common/utils/sessionStorage.js';
  import { getIndividualGHIN,  returnAllTeesSelected, returnBodyRows} from './utils';
  const courseData = get('courseData');
  const foundGolfer = get('foundGolfer');
  const roster = get('roster');
  const teesSelected = get('teesSelected');
  const golfer_id = get('ghinNumber');
  const isLoggedIn = sget('isLoggedIn');  
  const dataMode = get('dataMode');
  const [index, gender, golfer] = getIndividualGHIN(foundGolfer, roster);
  const [teeLabels, teeValues, ratings, slopes, pars] = courseData;
  const path = `/scores?ghinNumber=${golfer_id}`;
  let allTeesSelected = returnAllTeesSelected(teesSelected);
  let courses = ['DC', 'MG', 'MW', 'OR', 'PA', 'TP'];
  const chRows = returnBodyRows('CH',index,gender,allTeesSelected,teeValues,ratings,slopes,pars);
  const tsRows = returnBodyRows('TS',index,gender,allTeesSelected,teeValues,ratings,slopes,pars);
  onMount(() => {
    if (!isLoggedIn) goto('/');
  });
</script>
  <h2>{golfer}</h2>
  <a href={path}>Click Here for Revision Scores</a>
<table>
    <caption>Course Handicap</caption>
    <thead>
      <tr>
        <th scope='col'></th>
        {#each courses as course, index (index)}
          <th scope='col'>
            {course}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each chRows as row, index (index)}
        <tr>
          <th scope='row'>{row[0]}</th>
          <td>{row[1]}</td>
          <td>{row[2]}</td>
          <td>{row[3]}</td>
          <td>{row[4]}</td>
          <td>{row[5]}</td>
          <td>{row[6]}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <br />
  <table>
    <caption>Score*</caption>
    <thead>
      <tr>
        <th scope='col'></th>
        {#each courses as course, index (index)}
          <th scope='col'>
            {course}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each tsRows as row, index (index)}
        <tr>
          <th scope='row'>{row[0]}</th>
          <td>{row[1]}</td>
          <td>{row[2]}</td>
          <td>{row[3]}</td>
          <td>{row[4]}</td>
          <td>{row[5]}</td>
          <td>{row[6]}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <br />
  <p>
    *Score you must average eight out of your<br />last twenty rounds to
    maintain your index.
  </p>
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

thead tr th {
border-bottom: 0.125em solid currentColor;
}

tbody tr:nth-child(odd) {
background: var(--color-table-stripe);
}

th,
td {
font-size: var(--step-0);
}
</style>
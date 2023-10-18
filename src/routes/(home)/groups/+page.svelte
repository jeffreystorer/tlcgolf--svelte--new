<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { GroupAndCourseDropdowns } from '$lib/components/common';
  import {
    sget,
    returnHasMultipleGroups,
    returnHeaderRow,
  } from '$lib/components/common/utils';
  import { returnBodyRows } from './utils';
  import {course, group, displayNumber, groups, showLocalNumbers, teesSelected, allPlayersInTable, courseData} from '$lib/store.js';
  const hasMultipleGroups = returnHasMultipleGroups($groups);
  const isLoggedIn = sget('isLoggedIn'); 
  onMount(() => {
    if (!isLoggedIn) goto('/');
  });  
  let headerCols = returnHeaderRow($teesSelected[$course]);
  $: rows = returnBodyRows($groups, $allPlayersInTable, $showLocalNumbers, $courseData, $course, $group, $teesSelected);
</script>

{#if $displayNumber === 2}
    <GroupAndCourseDropdowns />
    <label>
      <input
        name='showLocalNumbers'
        type='checkbox'
        bind:checked={$showLocalNumbers}
      />
      Show Local Numbers
    </label>    
    {#key [$course, $showLocalNumbers, $group ]}
      <table>
        <caption>Click on a Player for Revision Scores</caption>  
        <thead>
          <tr>
            {#each headerCols as col, index (index)}
              <th scope='col'>
                {col}
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
    {/key}
{:else}
  {#if hasMultipleGroups}
    <p>
      Click on the dropdown boxes below
      <br />
      to select a group and a course.
    </p>
  {:else}
    <p>
      Click on the dropdown box below
      <br />
      to select a course.
    </p>
  {/if}
  <GroupAndCourseDropdowns />
{/if}
<style>
  table {
  border-collapse: collapse;
  margin: 1em auto 2em auto;
  width: fit-content;
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

  td {
  padding: 0 0.5em;
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
</style>
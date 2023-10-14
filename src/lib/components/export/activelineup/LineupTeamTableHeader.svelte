<script>
  export let teesSelected;
  export let times;
  export let teamNumber;
  export let teamTables;

  import { returnHeaderRow } from '$lib/components/export/utils';  
  
  let cols = returnHeaderRow(teesSelected);
  cols.shift();
  let teeTime;
  try {
    teeTime = times[teamNumber];
    if (times[teamNumber].includes('Shotgun')) {
      teeTime = teeTime + ' (' + teamTables.teeAssignments[teamNumber] + ')';
    }
  } catch (error) {}

</script>

<tr>
  <th scope='col'>{teeTime}</th>
    {#each cols as col}
        <th scope='col'>
          {col}
        </th>
    {/each}
</tr>
<script>
  export let teamMembers;
  export let teamNumber;
  export let times;
  export let teamTables;
  let teeTime;
  try {
    teeTime = times[teamNumber];
    if (times[teamNumber].includes('Shotgun')) {
      teeTime = teeTime + ' (' + teamTables.teeAssignments[teamNumber] + ')';
    }
  } catch (error) {}

  let rows = teamMembers;
</script>

  
<table>
  <thead>
    <tr>
      <th scope='col'>{teeTime}</th>
    </tr>
  </thead>
  <tbody>
    {#each rows as row}
      <tr>
        <th scope='row'>
          {row.playerName}
        </th>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  thead > tr > th {
    font-size: var(--step-0);
    font-weight: 700;
  }

  thead > tr > th[scope='col']:first-of-type {
    text-align: left;
  }

  tbody > tr > th[scope='row'] {
    font-size: var(--step-0);
    font-weight: normal;
    padding: 0 0.125em;
    text-align: left;
    width: 15em;
  }
</style>
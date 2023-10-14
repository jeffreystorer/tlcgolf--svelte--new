<script>
  export let teamTables;
  export let teamNumber;
  export let times;
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
</tr>
<script>
  import { v4 as uuidv4 } from 'uuid';
  import { teeTimeCount, teamTables } from '$lib/store'; 
  console.log("😊😊 $teeTimeCount on load", $teeTimeCount)
  const handleChange = (e) => {
    const oldCount = $teeTimeCount;
    console.log("😊😊 oldCount", oldCount)
    const newCount = e.target.value;
    console.log("😊😊 newCount", newCount)
    const droppedTimesCount = oldCount - newCount;
    $teeTimeCount = e.target.value;
    console.log("😊😊 $teeTimeCount on change", $teeTimeCount)
    if (droppedTimesCount > 0) {
      restoreDroppedTeeTimePlayersToPlayersNotInTeeTimes(oldCount, newCount);
    };
    for (let i = oldCount; i < newCount; i++) {
      if (oldCount > 0) {
        let teamName = 'team' + i;
        $teamTables = ({...$teamTables,
          [teamName]: []})
      }
    }
  };

  function restoreDroppedTeeTimePlayersToPlayersNotInTeeTimes(
    oldCount,
    newCount
  ) {
    for (let i = newCount; i < oldCount; i++) {
      let teamName = 'team' + i;
      $teamTables = ({
        ...$teamTables,
        [teamName]: [],
      })
    }
  }
  const teeTimeCounts =  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  </script>

  <select
    bind:value={$teeTimeCount}
    on:change={handleChange}>
    {#each teeTimeCounts as count (uuidv4())}
      <option value={count}>
        {#if count === 0}
          # of Tee Times
        {:else if count === 1}
          {count + ' tee time'}
        {:else}
          {count + ' tee times'}
        {/if}
      </option>
    {/each}
  </select>

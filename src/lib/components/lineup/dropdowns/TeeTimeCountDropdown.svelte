<script>
  import { teeTimeCount, teamTables } from '$lib/store'; 
  import { teeTimeCounts } from '$lib/components/lineup/optionitems';
  const handleChange = (e) => {
    console.log("😊😊 $teeTimeCount", $teeTimeCount)
    const oldCount = $teeTimeCount;
    const newCount = e.target.value;
    const droppedTimesCount = oldCount - newCount;
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

  </script>

  <select
    name='teeTimeCount'
    bind:value={$teeTimeCount}
    on:change={handleChange}>
    <option value=0># of Tee Times</option>
    {#each teeTimeCounts() as tCount}
       <option value={tCount}>
        {#if tCount === 1}
          {tCount + ' tee time'}
        {:else}
          {tCount + ' tee times'}
        {/if}
      </option>
    {/each}
  </select>

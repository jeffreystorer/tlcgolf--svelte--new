<script>
  import { onMount} from 'svelte';
  import * as _ from 'lodash';
  import { teeTimeCount, teamTables } from '$lib/store';
  import { updateTeamTables} from '$lib/components/common/utils'; 
  import { teeTimeCounts } from '$lib/components/lineup/optionitems';
  let oldCount;
  onMount(() => [
    oldCount= $teeTimeCount
  ]);

  const handleChange = (e) => {
    const droppedTimesCount = oldCount - $teeTimeCount;
    if (droppedTimesCount > 0) {
      restoreDroppedTeeTimePlayersToPlayersNotInTeeTimes(oldCount, $teeTimeCount);
    };
    for (let i = oldCount; i < $teeTimeCount; i++) {
      if (oldCount > 0) {
        let teamName = 'team' + i;
        let _teamTables = _.cloneDeep($teamTables);
        _teamTables[teamName] = [];
        $teamTables = _teamTables
      }
    }
    oldCount = oldCount - droppedTimesCount;
    updateTeamTables();
  };

  function restoreDroppedTeeTimePlayersToPlayersNotInTeeTimes(
    oldCount,
    newCount
  ) {
    for (let i = newCount; i < oldCount; i++) {
      let teamName = 'team' + i;      
      let _teamTables = _.cloneDeep($teamTables);
        _teamTables[teamName] = [];
        $teamTables = _teamTables
    }
  }

  </script>

  <select
    name='teeTimeCount'
    bind:value={$teeTimeCount}
    on:change={handleChange}>
    <option value=''># of Tee Times</option>
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

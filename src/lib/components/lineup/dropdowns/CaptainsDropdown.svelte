<script>
export let snapshots;
import {captainGHINNumber, realGHINNumber, captains, nextLineupIndex, playersInLineup, currentLineupIndex, currentLineupKey, lineupTitle, currentLineup, sortOrder, playingDate,  teeTimeCount, linkTime, progs069,  progAdj} from '$lib/store';
import { get, set } from '$lib/components/common/utils';

  function handleChange(e) {
    $playersInLineup = [];
    $currentLineupIndex = -1;
    $currentLineup = null;
    $lineupTitle = 'New Lineup';
    $sortOrder = ('alphabetical');
    $playingDate = 'Date';
    $teeTimeCount = 0;
    $linkTime = 'Set Link Time Above';
    $progs069 = '';
    $progAdj = '';

    //if we are on the Storer page, save the next lineup index
    if (captainGHINNumber === realGHINNumber)
      $nextLineupIndex = snapshots.length;
    $captainGHINNumber = e.target.value;
  }
</script>

<select name='captain' bind:value={$captainGHINNumber} on:change={handleChange}>
  {#each $captains as captain}
    <option key={captain.ghinNuber} value={captain.ghinNumber}>
      {captain.lastName}
    </option>
  {/each} 
</select>

<style>
  select {  
    display: flex;
    flex-direction: row;
    gap: 0.25em;
    color: var(--color-black);
    height: fit-content;
    padding: 0.125em;
    margin: 0 auto 0.5em auto;
    width: fit-content;
  }
</style>
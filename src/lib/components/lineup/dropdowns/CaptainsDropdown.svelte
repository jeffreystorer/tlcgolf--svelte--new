<script>
  import {snapshots, captainGHINNumber, realGHINNumber, captains, nextLineupIndex, playersInLineup, currentLineupIndex, currentLineupKey, lineupTitle, currentLineup, sortOrder, playingDate,  teeTimeCount, linkTime, progs069,  progAdj} from '$lib/store';
  import { getSnapshots } from '$lib/components/lineup/utils';
  
  function loadSnapshots(ghinNumber){
    console.log("🚀 ~ file: CaptainsDropdown.svelte:6 ~ loadSnapshots ~ ghinNumber:", ghinNumber)
    getSnapshots(ghinNumber).then((data) => {
      let items = [];
      for (const [key, value] of Object.entries(data)) {      
        items.push({
          key: key,
          lineup: value.lineup,
          title: value.title,
        });
      }; 
      $snapshots = items;
      $captainGHINNumber = ghinNumber
    });
  } 
  
  function handleChange(e) {
  e.preventDefault();
  $playersInLineup = [];
  $currentLineupIndex = -1;
  $currentLineupKey ='';
  $currentLineup = null;
  $lineupTitle = 'New Lineup';
  $sortOrder = ('alphabetical');
  $playingDate = 'Date';
  $teeTimeCount = '';
  $linkTime = 'Set Link Time Above';
  $progs069 = '';
  $progAdj = '';

  //if we are on the Storer page, save the next lineup index
  if ($captainGHINNumber !== $realGHINNumber) {$nextLineupIndex = $snapshots.length};
  $captainGHINNumber = e.target.value;
  loadSnapshots(e.target.value);
  }
</script>

<label>
  Captains:
<select name='captain' bind:value={$captainGHINNumber} on:change={handleChange}>
  {#each $captains as captain}
    <option key={captain.ghinNumber} value={captain.ghinNumber}>
      {captain.lastName}
    </option>
  {/each} 
</select>
</label>
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
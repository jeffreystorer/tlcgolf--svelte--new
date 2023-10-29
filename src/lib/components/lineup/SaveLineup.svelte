<script>
  import { goto } from '$app/navigation';
  import {snapshots, realGHINNumber, captainGHINNumber,course, group,teesSelected, idsInLineup, lineupTitle, playingDate,teamTables,linkTime,teeTimeCount,textareaValue,progs069, progAdj, playersInLineup,currentLineupIndex,nextLineupIndex} from '$lib/store';
  console.log("🚀 ~ file: SaveLineup.svelte:4 ~ $captainGHINNumber:", $captainGHINNumber)
  import { saveLineupToFirebase } from '$lib/components/lineup/utils';

  function handleSubmit(event) {
    event.preventDefault();
    saveLineupToFirebase(      
      $lineupTitle,
      $idsInLineup,
      $playersInLineup,
      $group,
      $course,
      $playingDate,
      $teeTimeCount,
      $linkTime,
      $progs069,
      $progAdj,
      $teamTables,
      $textareaValue,
      $teesSelected[$course]
    );
    //increment the lineup index
    if ($realGHINNumber === $captainGHINNumber) {
      console.log("🚀 ~ file: SaveLineup.svelte:29 ~ handleSubmit ~ $captainGHINNumber:", $captainGHINNumber)
      console.log("🚀 ~ file: SaveLineup.svelte:29 ~ handleSubmit ~ $realGHINNumber:", $realGHINNumber)
      $currentLineupIndex = $nextLineupIndex;
      console.log("🚀 ~ file: SaveLineup.svelte:30 ~ handleSubmit ~ $nextLineupIndex:", $nextLineupIndex)
    } else {
      $currentLineupIndex = $snapshots.length;
    }
      console.log("🚀 ~ file: SaveLineup.svelte:31 ~ handleSubmit ~ $currentLineupIndex:", $currentLineupIndex)
    
    goto('/export');
  }
  </script>
  
  <form on:submit={handleSubmit}>
    <fieldset>
      <label>
        Save Lineup as:
        <input
          name='saveLineup'
          type='text'
          bind:value={$lineupTitle}
          size='36'
        />
      </label>
      <button type='submit'>Save Lineup</button>
    </fieldset>
  </form>

<style>
  form {
    font-size: var(--step-0);
    margin-top: 0em;

    & fieldset{
      align-items: center;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    & label {
      justify-content: right;
      margin: 0 auto;
      width: fit-content;
    }

    & input{
      text-align: center;
    }
  }
</style>

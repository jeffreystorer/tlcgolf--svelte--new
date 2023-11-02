<script>
  export let snapshots;
  import { goto } from '$app/navigation';
  import {realGHINNumber, captainGHINNumber,course, group,teesSelected, idsInLineup, lineupTitle, playingDate,teamTables,linkTime,teeTimeCount,textareaValue,progs069, progAdj, playersInLineup,currentLineupIndex,nextLineupIndex} from '$lib/store';
  let _captainGHINNumber = $captainGHINNumber;
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
  /*  if ($realGHINNumber !== _captainGHINNumber) {
      $currentLineupIndex = $nextLineupIndex;
    } else { */
      $currentLineupIndex = snapshots.length;
   /*  } */
    
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

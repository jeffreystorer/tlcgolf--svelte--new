<script>
  import { v4 as uuidv4 } from 'uuid';
  import { teeTimeCount, teamTables, textareaValue,course,playingDate,progAdj,progs069,okToSave, okToAddPlayers} from '$lib/store';
  import { LineupTextarea, SaveLineup, TeamTable } from '$lib/components/lineup';
  import { AutoButtons } from '$lib/components/lineup/buttons';
  import { createProgAdjMessage, getCourseName } from '$lib/components/common/utils';
  //import { GameOptionsModal } from '$lib/components/lineup';
  const progAdjMessage = createProgAdjMessage($progAdj, $progs069);
  const courseName = getCourseName($course);
  let header = '';
  if ($playingDate !== 'Date') {
    header = $playingDate + ' at ' + courseName;
  }

  function handleClearGame() {
    $textareaValue = '';
  }

  const arrayTeeTimeIndexes = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );
  const teeTimeIndexes = arrayTeeTimeIndexes(0,teeTimeCount,1)
</script>

<div class='titled_outer'>
  <h2>{header}</h2>
  <AutoButtons />
  {#each teeTimeIndexes as item (uuidv4())}
    <TeamTable teamNumber={item} teamMembers={$teamTables['team' + item]} />
  {/each}
  {#if (progs069 > 0 && okToAddPlayers)}
    <p>{progAdjMessage}</p>
  {/if}
  {#if okToSave}
    <div id='footer'>
      <LineupTextarea />
      <div class='buttons'>
        <a type='button' class='stacked' href='#gameoptionsmodal'>
          Choose Game Options
        </a>
        <button class='stacked' on:click={handleClearGame}>
          Clear Game
        </button>
      </div>
      <!-- <GameOptionsModal /> -->
      <SaveLineup />
    </div>
  {/if}
</div>

<style>
 

div:first-of-type {
	display: flex;
	flex-direction: column;
  gap: 0em;
	margin-bottom: 2em;
  
  & fieldset {
    gap: 0.5em;
    margin-bottom: 0.5em;
  }

  & table > tbody > tr > td:last-of-type > select {
    text-align: center;
    width: 1em;
  }

  & p {
    font-style: italic;
  }
} 

#footer {
	align-items: center;
	display: flex;
	flex-direction: column;
	gap: 0em;
	width: 100%;
}



</style>

<script>
  import { teeTimeCount, teamTables, textareaValue, course, playingDate,progAdj,progs069,okToSave, okToAddPlayers, sortOrder} from '$lib/store';
  import { LineupTextarea, SaveLineup, TeamTable } from '$lib/components/lineup';
  import { AutoButtons } from '$lib/components/lineup/buttons';
  import { createProgAdjMessage, getCourseName } from '$lib/components/common/utils';
  import { GameOptionsModal } from '$lib/components/lineup';
  const progAdjMessage = createProgAdjMessage($progAdj, $progs069);
  $: header = $playingDate + ' at ' + getCourseName($course);

  function handleClearGame() {
    $textareaValue = '';
  }
</script>

<div class='titled_outer'>
  <h2>{header}</h2>
  {#key $sortOrder}
    <AutoButtons />
  {/key}
  {#each Array($teeTimeCount) as _, index }
    <TeamTable teamNumber={index} teamMembers={$teamTables['team' + index]} />
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
      <SaveLineup />
    </div>
    <GameOptionsModal />
  {/if}
</div>

<style>
 

div:first-of-type {
	display: flex;
	flex-direction: column;
  gap: 0em;
  
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

  & div {
    display: block;
  }
}



</style>

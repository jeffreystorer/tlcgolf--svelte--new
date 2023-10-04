<script>
  import { showAddDeletePlayers, showAddDeletePlayersButton, playersInLineup} from '$lib/store';
import {
  AddPlayersToLineupTable,
  DeletePlayersFromLineupTable,
} from '$lib/components/lineup';
import { playersNotInLineup } from '$lib/components/lineup/utils';

  const addPlayerCount = playersNotInLineup().length;
  const deletePlayerCount = $playersInLineup.length;

  function handleDone() {
    $showAddDeletePlayers = false;
    $showAddDeletePlayersButton = true;
  }
</script>

<div class='titled_inner'>
  <h3>Add/Delete Players In Lineup</h3>
  <div>
    {#if addPlayerCount > 0}
      <AddPlayersToLineupTable />
    {/if}
    {#if deletePlayerCount > 0}
      <DeletePlayersFromLineupTable />
    {/if}
  </div>
  <button class='stacked' on:click={handleDone}>
    Done
  </button>
</div>

<style>
  div > div {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
  }
</style>
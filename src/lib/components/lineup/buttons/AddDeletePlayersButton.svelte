<script>
  import { showAddDeletePlayers, showAddDeletePlayersButton} from '$lib/store';

  function handleClick(event) {
    event.preventDefault();
    $showAddDeletePlayers = true;
    $showAddDeletePlayersButton = false;
  }
</script>

<button class='stacked' on:click={handleClick}>
  Add/Delete Players
</button>
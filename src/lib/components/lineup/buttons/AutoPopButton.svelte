<script>
  import { idsInLineup,teeTimeCount, showAddDeletePlayers, showAddDeletePlayersButton} from '$lib/store';
  import { createTeam } from '$lib/components/lineup/utils';
  import { setAutoPop } from '$lib/components/lineup/utils';
  $: playerCount = $idsInLineup.length;

  function handleClick() {
    const teeTimes = Number($teeTimeCount);
    const players = Number(playerCount);
    const autoPop = setAutoPop(teeTimes, players);
    $showAddDeletePlayers = false;
    $showAddDeletePlayersButton = true;
    createTeam(autoPop);
  }
  </script>

  <button class='not-stacked' on:click={handleClick}>
    Auto Populate ({playerCount} players)
  </button>
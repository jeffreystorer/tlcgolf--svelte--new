<script>
  import { idsInLineup,teeTimeCount, showAddDeletePlayers, showAddDeletePlayersButton} from '$lib/store';
  import { createTeam } from '$lib/components/lineup/utils';
  import { setAutoABCD } from '$lib/components/lineup/utils';
  const playerCount = $idsInLineup.length;

  function handleClick() {
    const teeTimes = Number($teeTimeCount);
    const players = Number(playerCount);
    const autoABCD = setAutoABCD(teeTimes, players);
    $showAddDeletePlayers = false;
    $showAddDeletePlayersButton = true;
    createTeam(autoABCD);
  }
</script>

<button class='stacked' on:click={handleClick}>
  Auto ABCD ({playerCount} players)
</button>
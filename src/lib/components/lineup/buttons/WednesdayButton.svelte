<script>
  import { playersInLineup, wednesdaySchedules } from '$lib/store';
  import { getPlayersInGroup } from '$lib/components/common/utils';

  const playersInGroup = getPlayersInGroup('createLineupTable');
  const newIdsInLineup = $wednesdaySchedules;

  function handleClick(e) {
    e.preventDefault();
    let newPlayersInLineupArray = [];
    newIdsInLineup.forEach((id) => {
      newPlayersInLineupArray.push(
        playersInGroup.find((player) => player.id === Number(id))
      );
    });
    $playersInLineup = newPlayersInLineupArray;
  }
  
</script>

<button class='stacked' on:click={handleClick}>
  Fetch Wednesday Players
</button>
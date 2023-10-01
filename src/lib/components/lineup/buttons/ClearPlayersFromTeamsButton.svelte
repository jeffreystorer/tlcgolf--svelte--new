<script>
  import { teamTables, showAddTeamMember } from '$lib/store';

  function handleClick() {
    $teamTables = {
      teeAssignments: [1],
      team0: [],
      team1: [],
      team2: [],
      team3: [],
      team4: [],
      team5: [],
      team6: [],
      team7: [],
      team8: [],
      team9: []
    };
    $showAddTeamMember = {
      team0: false,
      team1: false,
      team2: false,
      team3: false,
      team4: false,
      team5: false,
      team6: false,
      team7: false,
      team8: false,
      team9: false
    };
  }
</script>

<button class='stacked' on:click={handleClick}>
  Clear Players from Teams
</button>
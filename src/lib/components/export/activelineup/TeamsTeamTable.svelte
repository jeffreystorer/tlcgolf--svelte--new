<script>
  export let teamMembers;
  export let teamNumber;
  export let times;
  export let teamTables;
  import { TeamsTeamTableHeader } from '$lib/components/export/activelineup';

  let rows = teamMembers;
</script>

  
    <table>
      <thead>
        <TeamsTeamTableHeader
          times={times}
          teamNumber={teamNumber}
          teamTables={teamTables}
        />
      </thead>
      <tbody>
        {#each rows as row}
          <tr>
            <th scope='row'>
              {row.playerName}
            </th>
          </tr>
        {/each}
      </tbody>
    </table>
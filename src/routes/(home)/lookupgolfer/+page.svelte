<script>
  export let data;
  const last_name=data.last_name;
  const first_name=data.first_name;
  const golfers=data.lookup.golfers;
  import { goto } from '$app/navigation';
  let searchedName = last_name;
  if (first_name) searchedName = first_name + ' ' + searchedName;
  golfers
    .sort((a, b) => {
      return a.first_name.toUpperCase() > b.first_name.toUpperCase()
        ? 1
        : -1;
    })

  function on:click(e) {
    let golfer_id = e.target.innerText;
    navigator.clipboard.writeText(golfer_id);
    goto (`/scores/${golfer_id}`);
  }
  </script>

  <h2>GHIN Information for {searchedName}</h2>
  <br />
  <table>
    <caption>Click On GHIN Number below for Revision Scores</caption>
    <thead>
      <tr>
        <th scope='col'>First Name</th>
        <th scope='col'>Index</th>
        <th scope='col'>GHIN Number</th>
        <th scope='col'>Club</th>
        <th scope='col'>Primary Club State</th>
      </tr>
    </thead>
    <tbody>
      {#each golfers as golfer, index (index)}
            <tr>
              <th scope='row'>{golfer.first_name}</th>
              <td>{golfer.handicap_index}</td>
              <td>
                <a href={`/scores?ghinNumber=${golfer.ghin}`}>{golfer.ghin}</a>
              </td>
              <td>{golfer.club_name}</td>
              <td>{golfer.primary_club_state}</td>
            </tr>
      {/each}
    </tbody>
  </table>

<style>    
  table {
  border-collapse: collapse;
  margin: 1em auto 0 auto;
  width: fit-content;
  }
  caption {
  font-size: var(--step-0);
  font-weight: 700;
  margin-bottom: 0.5em;
  }

  tbody tr:nth-child(odd) {
  background: var(--color-table-stripe);
  }

  th,
  td {
  font-size: var(--step-0);
  }

  td,
  th {
  padding: 0 0.5em;
  }

  th[scope='row'] {
  font-weight: normal;
  padding-left: 0.5em;
  padding-right: 1em;
  text-align: center;
  }
</style>
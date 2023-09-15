<script>
  export let data;
  import { sget } from '$lib/components/common/utils';
  const isLoggedIn = sget('isLoggedIn');
  const scoresData = data.scores.Scores.filter((score) => score.revision);
</script>


{#if !isLoggedIn}
    <h1>TLC Golf</h1>
    <br />
    <br />
{/if}
<br />
<table>
  <caption>Revision Scores for GHIN Number {data.ghinNumber}</caption>
  <thead>
    <tr>
      <th scope='col'>Score</th>
      <th scope='col'>Date</th>
      <th scope='col'>C.R./Slope</th>
      <th scope='col'>PCC</th>
      <th scope='col'>Diff.</th>
      <th scope='col'>Course/Tee</th>
    </tr>
  </thead>
  <tbody>
    {#each scoresData as score, index (index)}
      <tr>
        <th scope='row'>
          {#if score.used}
            *
          {:else }
            &nbsp;
          {/if}
          {score.adjusted_gross_score} {score.score_type}
        </th>
        <td>{score.played_at}</td>
        <td>
          {score.course_rating}/{score.slope_rating}
        </td>
        <td>{score.PCC}</td>
        <td>{score.differential}</td>
        <td>{score.ghin_course_name_display}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>  
  table {
  border-collapse: collapse;
  margin: 1em auto 0 auto;
  }
  
  caption {
  font-size: var(--step-0);
  font-weight: 700;
  margin-bottom: 0.5em;
  }

  thead tr th {
  border-bottom: 0.125em solid currentColor;
  }

  tbody tr:nth-child(odd) {
  background: var(--color-table-stripe);
  }

  td {
  padding: 0 0.5em;
  }

  tr td:last-child {
  text-align: left;
  }

  th[scope='row'] {
  font-size: var(--step-0);
  font-weight: normal;
  padding-left: 0.5em;
  padding-right: 1em;
  text-align: right;
  }
</style>
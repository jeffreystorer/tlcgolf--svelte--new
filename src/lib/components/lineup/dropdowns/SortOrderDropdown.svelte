<script>
  import { sortOrder } from '$lib/store';
  import { handleSortPlayersInLineup } from '$lib/components/lineup/utils';

  function handleChange(event) {
    $sortOrder = event.target.value;
    handleSortPlayersInLineup(event.target.value);
  }

</script>

    <div>
      <label>Sort Order:
        <br />
        <select bind:value={$sortOrder} on:change={handleChange}>
          <option value='alphabetical'>Alphabetical</option>
          <option value='byHandicap'>By Handicap</option>
          <option value='random'>Random</option>
        </select>
      </label>
    </div>

<style>  
  div {
    flex-direction: column;
    gap: 0.5em;
    margin: 0 auto 0.5em auto;
  }

  div > label {
    font-size: var(--step-0);
  }
</style>

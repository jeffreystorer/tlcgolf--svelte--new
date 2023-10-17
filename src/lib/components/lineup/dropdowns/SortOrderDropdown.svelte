<script>
  import { sortOrder } from '$lib/store';
  import { handleSortPlayersInLineup } from '$lib/components/lineup/utils';

  function handleChange(event) {
    $sortOrder = event.target.value;
    handleSortPlayersInLineup(event.target.value);
  }

</script>

<div>
    <select bind:value={$sortOrder} on:change={handleChange}>
      <option value='alphabetical'>Alphabetical</option>
      <option value='byHandicap'>By Handicap</option>
      <option value='random'>Random</option>
    </select>
</div>

<style>  
  div {
    flex-direction: column;
    gap: 0.5em;
    margin: 0 auto 0.5em auto;
  }
</style>

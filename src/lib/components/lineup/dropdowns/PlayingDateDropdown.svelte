<script>
  import { v4 as uuidv4 } from 'uuid';
  import { playingDate } from '$lib/store'
  import { playingDates} from '$lib/components/lineup/optionitems';

  const handleChange = (event) => {
    $playingDate = event.target.value;
  };

</script>

<select
  bind:value={$playingDate}
  on:change={handleChange}>
  <option value='Date'>Playing Date</option>
  
  {#each playingDates as playinDate (uuidv4())}
  <option value={playingDate}>
    {playingDate}
  </option>
{/each}
</select>
<script>
  import { v4 as uuidv4 } from 'uuid';
  import { playingDate } from '$lib/store'
  import { playingDates} from '$lib/components/lineup/optionitems';
  console.log("😊😊 $playingDate on load", $playingDate)
  const handleChange = (e) => {
    //$playingDate = e.target.value;
    console.log("😊😊 event.target.value", event.target.value)
    console.log("😊😊 $playingDat on change", $playingDate)
  };

</script>

<select
  bind:value={$playingDate}
  on:change={handleChange}>
  <option value='Date'>Playing Date</option>  
  {#each playingDates() as playingDate (uuidv4())}
  <option value={playingDate}>
    {playingDate}
  </option>
{/each}
</select>
<script>
  import { playingDate } from '$lib/store'
  import { playingDates} from '$lib/components/lineup/optionitems';
</script>

<label>
  Playing Date:
<select
  name='playingDate'
  bind:value={$playingDate}>
  <option value='Date'></option>  
  {#each playingDates() as pDate}
    <option value={pDate}>
      {pDate}
    </option>
  {/each}
</select>
</label>
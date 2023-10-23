<script>
  import { linkTime } from '$lib/store';
  import { linkTimes} from '$lib/components/lineup/optionitems';  
</script>

<label>
  Link Time:
  <select 
    name='linkTime'
    bind:value={$linkTime}>
    <option value='Set Link Time Above'></option>
    {#each linkTimes() as lTime}
      <option value={lTime}>
        {lTime}
      </option>
    {/each}
  </select>
</label>
  

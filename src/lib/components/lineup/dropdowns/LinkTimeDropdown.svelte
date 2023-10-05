<script>
  import { v4 as uuidv4 } from 'uuid';
  import { linkTime } from '$lib/store';
  import { linkTimes} from '$lib/components/lineup/optionitems';
  const handleChange = (event) => {
    $linkTime = event.target.value;
  };
</script>

<label>
  Link Time
  <select name='linkTime' bind:value={$linkTime} on:change={handleChange}>
    <option value='Link Time'>Link Time</option>
    {#each linkTimes() as linkTime (uuidv4())}
    <option value={linkTime}>
      {linkTime}
    </option>
    {/each}
  </select>
</label>

<style>  
  label {
    font-size: var(--step-0);
  }
  label > select {
    margin-left: 0.5em;
  }
</style>
  

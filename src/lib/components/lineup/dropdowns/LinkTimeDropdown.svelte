<script>
  import { linkTime } from '$lib/store';
  import { linkTimeOptionItems } from '$lib/components/lineup/optionitems';
  const handleChange = (event) => {
    $linkTime = event.target.value;
  };
</script>

<label>
  Link Time
  <select name='linkTime' bind:value={$linkTime} on:change={handleChange}>
    <option value='Link Time'>Link Time</option>
    {linkTimeOptionItems}
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
  

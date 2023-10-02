<script>
  import { progs069 } from '$lib/store';
  const handleChange = (event) => {
    $progs069 = event.target.value;
  };

</script>

<select bind:value={$progs069} on:change={handleChange}>
  <option value=''>Progs?</option>
  <option value='0'>No Progs</option>
  <option value='6'>Progs 6/6/6</option>
  <option value='9'>Progs 9&9</option>
  <option value='18'>Progs 18</option>
</select>
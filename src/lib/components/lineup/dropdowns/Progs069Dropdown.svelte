<script>
  import { progs069 } from '$lib/store';
  let placeholder = 'No Progs'
</script>

<label>
  Progs:
<select
  name='progs069'
  bind:value={$progs069}>
  {#if placeholder}
  <option value='' selected>{placeholder}</option>
  {/if}
  <option value='6'>Progs 6/6/6</option>
  <option value='9'>Progs 9&9</option>
  <option value='18'>Progs 18</option>
</select>
</label>
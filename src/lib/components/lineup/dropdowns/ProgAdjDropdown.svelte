
<script>
  import { progAdj, progs069 } from '$lib/store';
  let placeholder = "No Adj"
</script>

{#if ($progs069 !== '' && $progs069 !== '0')}
<label>
  Prog Adj:
  <select 
    name='progAdj'
    bind:value={$progAdj}>
    {#if placeholder}
    
    <option value='' selected>{placeholder}</option>
    {/if}
    <option value='3'>3 plus 3</option>
    <option value='4'>4 minus 3</option>
  </select>
</label>
{/if}


<script>
  import { progAdj, progs069 } from '$lib/store';
</script>

{#if ($progs069 !== '' && $progs069 !== '0')}
  <select 
    name='progAdj'
    bind:value={$progAdj}>
    <option value=''>Prog Adj?</option>
    <option value='0'>No Adj</option>
    <option value='3'>3 plus 3</option>
    <option value='4'>4 minus 3</option>
  </select>
{/if}

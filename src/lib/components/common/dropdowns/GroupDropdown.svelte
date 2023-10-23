<script>
  import { set } from '$lib/components/common/utils';
  import { playersInLineup,currentLineupIndex,currentLineup,lineupTitle, groups, group} from '$lib/store'

  function handleChange(e) {
    e.preventDefault();
    set('group', e.target.value);
    $playersInLineup = [];
    $currentLineupIndex = -1;
    $currentLineup = null;
    $lineupTitle = 'New Lineup';
  }

  if ($groups.slice(-1) === 'Walk') $groups.pop();
  if ($groups.length === 2) $groups.shift();
  
</script>
<label>
  Group:
<select name='group' bind:value={$group} on:change={handleChange}>
  <option key={'0'} value=''>
  </option>
  {#each $groups as group, index (index)}
    <option key={group} value={group}>
      {group}
    </option>
  {/each}
</select>
</label>

<style>
  label {
    display: flex;
    flex-direction: column;
  }
</style>
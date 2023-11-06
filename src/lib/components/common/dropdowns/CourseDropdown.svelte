<script>
  import { courses } from '$lib/common/data'
  import {
    returnHasMultipleGroups,
    set, 
    updateTeamTables, 
    updatePlayersInLineup
  } from '$lib/components/common/utils';
  import { groups, course, showChangeTees, group } from '$lib/store';
  const hasMultipleGroups = returnHasMultipleGroups($groups);

  function handleChange(e) {
    e.preventDefault();
    set('course', e.target.value);
    $course = e.target.value;
    $showChangeTees = false;
    if (!hasMultipleGroups) {
      $group=groups[1];
    }
    if ($course !== '') {
      updateTeamTables();
      updatePlayersInLineup();
    }
  }
</script>

<label>
  Course:  
  <select name='course' bind:value={$course} on:change={handleChange}>
      <option key={'0'} value=''>
      </option>
      {#each courses as course}
      <option key={course} value={course}>
        {course}
      </option>
      {/each}
  </select>
</label>
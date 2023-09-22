<script>
  import {
    returnHasMultipleGroups,
    set, 
    updateTeamTables, 
    updatePlayersInLineup
  } from '$lib/components/common/utils';
  import { groups, course, courseData, playersInLineup, allPlayersInTable, teamTables, teeTimeCount, teesSelected, showChangeTees, group, sortOrder, showFirstName, showLocalNumbers, idsInLineup } from '$lib/store';
  const hasMultipleGroups = returnHasMultipleGroups($groups);

  function handleChange(e) {
    e.preventDefault();
    //$course = e.target.value;
    set('course', e.target.value);
    $showChangeTees = false;
    if (!hasMultipleGroups) {
      $group=groups[1];
    }
    if ($course !== '') {
      $teamTables = updateTeamTables($teesSelected[$course], $course, $courseData, $allPlayersInTable, $teamTables, $teeTimeCount, $group, $groups, $sortOrder, $showFirstName, $showLocalNumbers);
      $playersInLineup = updatePlayersInLineup($teesSelected[$course], $group, $sortOrder, $idsInLineup, $course, $courseData, $groups, $allPlayersInTable, $showFirstName,$showLocalNumbers);
    }
  }
</script>

    <select name='course' bind:value={$course} on:change={handleChange}>
      <option key={'0'} value=''>
        Select Course
      </option>
      <option key={'1'} value='dc'>
        Deer Creek
      </option>
      <option key={'2'} value='mg'>
        Magnolia
      </option>
      <option key={'3'} value='mw'>
        Marshwood
      </option>
      <option key={'4'} value='or'>
        Oakridge
      </option>
      <option key={'5'} value='pa'>
        Palmetto
      </option>
      <option key={'6'} value='tp'>
        Terrapin Point
      </option>
    </select>
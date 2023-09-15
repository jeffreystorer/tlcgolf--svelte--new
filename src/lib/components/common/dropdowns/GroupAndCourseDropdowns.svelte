<script>  
  import { CourseDropdown, GroupDropdown } from '$lib/components/common';
  import { returnHasMultipleGroups } from '$lib/components/common/utils';
  import { groups } from '$lib/store';
  const hasMultipleGroups = returnHasMultipleGroups($groups);
</script>

<div class='select-dropdown-container'>
  {#if hasMultipleGroups}
    <GroupDropdown />
  {/if}
  <CourseDropdown />
</div>

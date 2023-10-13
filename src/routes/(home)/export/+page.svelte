<script>
  import  {onMount} from 'svelte';
  import { goto } from '$app/navigation';
  import { course, group, groups, currentLineupIndex} from '$lib/store';
  import * as courseData from '$lib/components/common/data';
  import { sget } from '$lib/components/common/utils';
  import { LoadLineup } from '$lib/components/export';
  const isLoggedIn = sget('isLoggedIn');

  onMount(() => {
    if (!isLoggedIn) {
      goto('/');
    }
  });

  if (
    !$groups.includes(group) &&
    !courseData.courses.includes(course) &&
    !$currentLineupIndex > -1
  ) goto('/lineup')
</script>
  {#if (
    $groups.includes(group) &&
    courseData.courses.includes(course) &&
    $currentLineupIndex > -1
  )}
    <LoadLineup />
  {/if}
<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { currentLineupKey, currentLineupIndex, currentLineup, playersInLineup, lineupTitle, sortOrder} from '$lib/store';
 
  import { clear, sclear, get, set } from '$lib/components/common/utils'; 
  
  const clearLineup = () => {
    $playersInLineup = [];
    $currentLineupIndex = -1;
    $currentLineupKey = '';
    $currentLineup = null;
    $lineupTitle =  'New Lineup';
    $sortOrder = 'alphabetical';
  };
  onMount(() => {
    //values to be preserved
    const ghinNumber = get('ghinNumber') ? get('ghinNumber') : '';
    const lastName = get('lastName') ? get('lastName') : '';
    const course = get('course') ? get('course') : '';
    const group = get('group') ? get('group') : '';
    const teesSelected = get('teesSelected') ? get('teesSelected') : '';
    clear();
    sclear();
    set('ghinNumber', ghinNumber);
    set('lastName', lastName);
    set('course', course);
    set('group', group);
    set('teesSelected', teesSelected);
    clearLineup();
    goto('/');
  });
</script>
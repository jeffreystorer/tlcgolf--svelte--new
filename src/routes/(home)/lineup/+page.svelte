<script>
  import  {beforeUpdate, onMount} from 'svelte';  
  import {
    sget,
    returnDisplayNumber,
    returnHasMultipleGroups,
  } from '$lib/components/common/utils';
  import { getSnapshots } from '$lib/components/lineup/utils';
  import { groups, course, group, displayNumber, linkTime, captainGHINNumber, realGHINNumber, playersInLineup, snapshots } from '$lib/store';
  beforeUpdate(() => {
    $snapshots = getSnapshots($captainGHINNumber)
  })
  import { goto } from '$app/navigation';

  const isLoggedIn = sget('isLoggedIn');
  onMount(() => {
    if (!isLoggedIn) {
      goto.push('/');
    }
  });
  /* import {
    ActiveLineupBox,
    LineupBeingEditedBox,
    SavedLineupsBox,
  } from '$lib/components/lineup'; */
  import { CaptainsDropdown } from '$lib/components/lineup/dropdowns';
  import { GroupAndCourseDropdowns } from '$lib/components/common';
  console.log("😊😊 $groups", $groups)
  const hasMultipleGroups = returnHasMultipleGroups($groups);
  let values = Object.values($snapshots)
</script>
{#key $snapshots}
  {#if $displayNumber === 2}
    <div id='lineup'>
      <div>
        {#if $realGHINNumber === '585871'}
        <CaptainsDropdown snapshots={$snapshots} />
        {/if}
      </div>
      {#each values as value}
      <p>{value.lineup.playingDate}: {value.title}</p>
      {/each}
    </div>
  {:else}
  {#if hasMultipleGroups}
    <p>
      Click on the dropdown boxes below
      <br />
      to select a group and a course.
    </p>
  {:else}
    <p>
      Click on the dropdown box below
      <br />
      to select a course.
    </p>
  {/if}
    <GroupAndCourseDropdowns />
  {/if}
  {/key}



<style>
  #lineup {
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  justify-content: center;
  max-width: 96em;
  padding: 0 0.5em;
  margin: 0 auto;
  }

  #lineup > div:first-of-type {
  display: flex;
  flex-direction: column;
  flex: 1 0 22em;
  height: fit-content;
  gap: 2em;
  justify-content: center;
  margin-bottom: 2em;
  max-width: 48em;
  }

  #lineup > div:last-of-type {
  display: flex;
  flex-direction: column;
  flex: 1 0 20em;
  height: fit-content;
  justify-content: center;
  max-width: 48em;
  }
</style>
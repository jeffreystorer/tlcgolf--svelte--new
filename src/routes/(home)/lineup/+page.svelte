<script>
  //import  {onMount} from 'svelte';
  //import { getSnapshots } from '$lib/components/lineup/utils';
  //import { captainGHINNumber } from '$lib/store';
  //let snapshots = {};
  //let items = [];
  /* onMount(() => {
  [snapshots, items]= getSnapshots($captainGHINNumber);
  console.log("😊😊 snapshots", snapshots)
  console.log("😊😊 items", items)
  }) */
  import { snapshots } from '$lib/store';
  let items = Object.values($snapshots);
</script>
<h2>Lineup</h2>
{#each items as item}
<p>Title: {item.title}</p>
{/each}
<!-- <script>
  import { groups, course, group, linkTime, realGHINNumber, playersInLineup, snapshots } from '$lib/store';
  console.log("😊😊 $snapshots", $snapshots);
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import {
    sget,
    returnDisplayNumber,
    returnHasMultipleGroups,
  } from '$lib/components/common/utils';
  const isLoggedIn = sget('isLoggedIn');
  onMount(() => {
    if (!isLoggedIn) {
      goto.push('/');
    }
  });
  import {
    ActiveLineupBox,
    LineupBeingEditedBox,
    SavedLineupsBox,
  } from '$lib/components/lineup';
  import { CaptainsDropdown } from '$lib/components/lineup/dropdowns';
  import { GroupAndCourseDropdowns } from '$lib/components/common';
  const hasMultipleGroups = returnHasMultipleGroups($groups);
  let displayNumber = returnDisplayNumber($course, $group, $groups);
</script>

{#key $snapshots}
  {#if $displayNumber === 2}
  <div id='lineup'>
    <div>
      {#if realGHINNumber === '585871'}
      <CaptainsDropdown snapshots={snapshots} />
      {/if} 
      {#if snapshots.length > 0} 
      <SavedLineupsBox snapshots={snapshots} />
      {/if}
      <LineupBeingEditedBox snapshots={snapshots} />
    </div>
    {#if playersInLineup.length > 0 && linkTime !== 'Set Link Time Above'}
      <div>
        <ActiveLineupBox snapshots={snapshots} />
      </div>
    {/if}
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
</style> -->
<script>
  import { snapshots, groups, displayNumber, linkTime, captainGHINNumber, realGHINNumber, playersInLineup, teamTables } from '$lib/store';
  import  { onMount } from 'svelte';
  import {
    ActiveLineupBox,
    LineupBeingEditedBox,
    ConfirmDeleteModal,
    MissingPlayerModal,
    SavedLineupsBox, 
  } from '$lib/components/lineup';
  import { CaptainsDropdown } from '$lib/components/lineup/dropdowns';
  import { fetchSnapshots } from '$lib/components/lineup/utils';
  import { GroupAndCourseDropdowns } from '$lib/components/common';  
  import {
    sget,
    returnHasMultipleGroups,
  } from '$lib/components/common/utils';
  
  let hasMultipleGroups = returnHasMultipleGroups($groups);
  import { goto } from '$app/navigation';

  function loadSnapshots() {
    let _snapshots = fetchSnapshots($captainGHINNumber)
    return _snapshots
  }
  const isLoggedIn = sget('isLoggedIn');
  onMount(() => {
    console.log('%c onMount','background: green')      
    loadSnapshots().then(data => {$snapshots = data});
    console.log("🚀 ~ file: +page.svelte:30 ~ onMount ~ $snapshots:", $snapshots)
    if (!isLoggedIn) {
      goto('/');
    }
  });
</script>
 

  {#if $displayNumber === 2}
      <section>
        <article>
          {#key $snapshots}
            {#if $realGHINNumber === '585871'}
            <CaptainsDropdown snapshots={$snapshots}/>
            {/if}
            {#if snapshots.length > 0}
              <SavedLineupsBox snapshots={$snapshots}/>
            {/if}
            <LineupBeingEditedBox snapshots={$snapshots}/>
          {/key}
        </article>
        {#key $teamTables}
          {#if ($playersInLineup.length > 0) && ($linkTime !== 'Set Link Time Above')}
            <article>
              <ActiveLineupBox snapshots={$snapshots}/>
            </article>
          {/if}
        {/key}
        </section>
        <ConfirmDeleteModal />
        <MissingPlayerModal />
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


<style>
  section {
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  justify-content: center;
  max-width: 96em;
  padding: 0 0.5em;
  margin: 0 auto;
  }

  article:first-of-type {
  display: flex;
  flex-direction: column;
  flex: 1 0 22em;
  height: fit-content;
  gap: 2em;
  justify-content: center;
  margin-bottom: 2em;
  max-width: 48em;
  }

  article:last-of-type {
  display: flex;
  flex-direction: column;
  flex: 1 0 20em;
  height: fit-content;
  justify-content: center;
  max-width: 48em;
  }
</style>
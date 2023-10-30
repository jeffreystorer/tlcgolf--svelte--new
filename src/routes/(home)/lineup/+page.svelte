<script>
  import { groups, displayNumber, linkTime, captainGHINNumber, realGHINNumber, playersInLineup, teamTables } from '$lib/store';
  import  { beforeUpdate, onMount } from 'svelte';
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
  let snapshots = []; 
  
  let hasMultipleGroups = returnHasMultipleGroups($groups);
  import { goto } from '$app/navigation';

  async function loadSnapshots() {
    let _snapshots = await fetchSnapshots($captainGHINNumber)
    return _snapshots
  }

  beforeUpdate(() => {
    console.log('beforeUpdate')    
    snapshots = loadSnapshots();
    console.log("🚀 ~ file: +page.svelte:29 ~ beforeUpdate~ snapshots:", snapshots)
    console.log("🚀 ~ file: +page.svelte:36 ~ beforeUpdate ~ $captainGHINNumber:", $captainGHINNumber)
  })

  const isLoggedIn = sget('isLoggedIn');
  onMount(() => {
    console.log('onMount')
    if (!isLoggedIn) {
      goto('/');
    }
  });
</script>
 

  {#if $displayNumber === 2}
      <section>
        <article>
          {#key snapshots}
            {#if $realGHINNumber === '585871'}
            <CaptainsDropdown {snapshots}/>
            {/if}
            {#if snapshots.length > 0}
              <SavedLineupsBox {snapshots}/>
            {/if}
            <LineupBeingEditedBox {snapshots}/>
          {/key}
        </article>
        {#key $teamTables}
          {#if ($playersInLineup.length > 0) && ($linkTime !== 'Set Link Time Above')}
            <article>
              <ActiveLineupBox {snapshots}/>
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
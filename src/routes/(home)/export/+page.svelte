<script>
  import  {onMount} from 'svelte';
  import { goto } from '$app/navigation';
  import {
    ActiveLineupContainer,
    ButtonsAndImagesContainer,
    ShowCheckboxesContainer,
  } from '$lib/components/export/containers';
  import { course, group, groups, currentLineupIndex, showFirstName, showTeamHcp, showLocalNumbers} from '$lib/store';
  import * as courseData from '$lib/components/common/data';
  import { sget } from '$lib/components/common/utils';
  const isLoggedIn = sget('isLoggedIn');

  onMount(() => {
    if (!isLoggedIn) {
      goto('/');
    } else {
      if (
      !$groups.includes($group) &&
      !courseData.courses.includes($course) &&
      $currentLineupIndex < 0
      ) {
        goto('/lineup')
      }
    }
  });

  
</script>

<div id='export'>
  <div>
    <ShowCheckboxesContainer />
    <ButtonsAndImagesContainer />
  </div>
  <div>
    {#key [$showFirstName, $showTeamHcp, $showLocalNumbers]}
      <ActiveLineupContainer />
    {/key}
  </div>
</div>

<style>
  
  #export {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 96em;
    padding: 0 0.5em;
    margin: 0 auto;


    & > div:first-of-type {
      display: flex;
      flex-direction: column;
      flex: 1 0 20em;
      height: fit-content;
      justify-content: center;
      max-width: 48em;
      padding: 1em;
    }

    & > div:last-of-type {
      display: flex;
      flex-direction: column;
      flex: 1 0 20em;
      height: fit-content;
      justify-content: center;
      max-width: 48em;
    }
  }
</style>
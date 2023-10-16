<script>
  import  {onMount} from 'svelte';
  import { goto } from '$app/navigation';  
  import domtoimage from 'dom-to-image';
  import {
    ActiveLineupContainer,
    ButtonsAndImagesContainer,
    ShowCheckboxesContainer,
  } from '$lib/components/export/containers';
  import { screenshotUrl, course, group, groups, currentLineupIndex, showFirstName, showTeamHcp, showLocalNumbers} from '$lib/store';
  import * as courseData from '$lib/components/common/data';
  import { sget } from '$lib/components/common/utils';
  const isLoggedIn = sget('isLoggedIn');

  onMount(() => {
    if (!isLoggedIn) {
      goto('/');
    } else {
      if (
      !$groups.includes(group) &&
      !courseData.courses.includes(course) &&
      $currentLineupIndex < 0
      ) {
        goto('/lineup')
      } else {
        let element = 'lineup-image';
        domtoimage
          .toJpeg(document.getElementById(element), { quality: 0.95 })
          .then(function (dataUrl) {
            $screenshotUrl = dataUrl;
          });
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
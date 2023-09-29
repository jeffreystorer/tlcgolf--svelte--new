<script>
  import { sset } from '$lib/components/common/utils';
  import { beforeUpdate, onMount} from 'svelte';
  import { playersInLineup, currentLineupIndex, currentLineup, lineupTitle} from '$lib/store';
  $playersInLineup = [];
  $currentLineupIndex = -1;
  $currentLineup = null;
  $lineupTitle = "New Lineup";
  sset('isLoggedIn', false);  
  beforeUpdate(() => {history.pushState({}, '', './')});
  onMount(() => { window.document.location =
    'https://docs.google.com/spreadsheets/d/1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg/edit#gid=1579243035';});
 </script>

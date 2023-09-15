<script>
  export let data;
  import { page } from '$app/stores';
  import { beforeUpdate, onMount} from 'svelte';
  import { sset } from '$lib/components/common/utils';
  import { playersInLineup, currentLineupIndex, currentLineup, lineupTitle} from '$lib/store';
  $playersInLineup = [];
  $currentLineupIndex = -1;
  $currentLineup = null;
  $lineupTitle = "New Lineup";
  sset('isLoggedIn', false);
  beforeUpdate(() => {history.pushState({}, '', '../../')});
  onMount(() => {window.document.location = `https://docs.google.com/spreadsheets/d/${data.id}/edit#gid=${data.gid}`});
  </script>
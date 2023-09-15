<script>
  export let data;
  import { beforeUpdate, onMount} from 'svelte';
  import { get, sset } from '$lib/components/common/utils';
  import { playersInLineup, currentLineupIndex, currentLineup, lineupTitle} from '$lib/store';
  import { getSheetUrl } from '$lib/components/fetchdata/apis/utils';
  const ghinNumber = get('ghinNumber');
  let sheetUrl = getSheetUrl(ghinNumber, data.sheets);
  $playersInLineup = [];
  $currentLineupIndex = -1;
  $currentLineup = null;
  $lineupTitle = "New Lineup";
  sset('isLoggedIn', false);
  beforeUpdate(() => {history.pushState({}, '', './')});
  onMount(() => {window.document.location = sheetUrl}); 
</script>

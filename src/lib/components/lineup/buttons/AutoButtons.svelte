<script>
  import { teamTables, teeTimeCount, sortOrder, idsInLineup } from '$lib/store';
  import { AutoABCDButton, AutoPopButton } from '$lib/components/lineup/buttons';
  import { teamTablesEmpty } from '$lib/components/lineup/utils';
  const idsInLineupCount = $idsInLineup.length;
  let showAutoABCDButton = false;
  if (
    $sortOrder === 'byHandicap' &&
    Number($teeTimeCount) > 1 &&
    idsInLineupCount > 0 &&
    (idsInLineupCount % 3 === 0 || idsInLineupCount % 4 === 0) &&
    teamTablesEmpty($teamTables)
  ) { showAutoABCDButton = true; };
  let showAutoPopButton = false;
  if (idsInLineupCount > 0 && teamTablesEmpty($teamTables)) {showAutoPopButton = true;}
    
</script>

  {#if showAutoPopButton}
    <AutoPopButton />
  {/if}
  {#if showAutoABCDButton}
    <AutoABCDButton />
  {/if}

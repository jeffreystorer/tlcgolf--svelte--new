<script>
  import {snapshots, currentLineupIndex, showDownloadPDF, showDownloadPDFButton, refLineup, screenshotUrl} from '$lib/store';
  import {
    copyImageToClipboard,
    showCopyLineupToClipboard,
  } from '$lib/components/export/utils';
  let aLineup = $snapshots[$currentLineupIndex];
  let title = aLineup.title;
  let lineup = aLineup.lineup;

  function handleCopyLineup() {
    copyImageToClipboard($refLineup);
  }  
  
  //copy players
  let players = lineup.players;
  players.sort((a, b) =>
    a.lastName > b.lastName
      ? 1
      : a.lastName === b.lastName
      ? a.firstName > b.firstName
        ? 1
        : -1
      : -1
  );

  let playerList = [];
  players.forEach(makeList);

  function makeList(item) {
    playerList.push(item.firstName + ' ' + item.lastName);
  }

  function handleCopyPlayers(e) {
    e.preventDefault();
    let playerListString = '';
    playerList.map((player, index) => {
      let number = index + 1;
      if (number < 10) {
        number = ' ' + number;
      }
      return (playerListString =
        playerListString + '  ' + number + '.  ' + player + '\n');
    });
    playerListString = 'Players signed up are: \n' + playerListString;
    navigator.clipboard.writeText(playerListString);
  }

  function handleDownloadScreenshot() {
    var link = document.createElement('a');
    link.download = title + '.jpeg';
    link.href = $screenshotUrl;
    link.click();
  }

  function handleShowDownloadPDF() {
    $showDownloadPDF = true;
    $showDownloadPDFButton = false;
  }
</script>

<div id='copy-and-download-buttons-container'>
  {#if (showCopyLineupToClipboard())}
    <button on:click={handleCopyLineup} class='stacked'>
      Copy Lineup to Clipboard
    </button>
  {/if}
  <button on:click={handleCopyPlayers} class='stacked'>
    Copy Players to Clipboard
  </button>
  <button on:click={handleDownloadScreenshot} class='stacked'>
    Download Screenshot
  </button>
  {#if $showDownloadPDFButton}
    <button on:click={handleShowDownloadPDF} class='stacked'>
      Download PDF
    </button>
  {/if}
</div>
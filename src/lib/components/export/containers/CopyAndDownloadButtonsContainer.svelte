import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { get } from '$lib/components/common/utils';
import {
  copyImageToClipboard,
  showCopyLineupToClipboard,
} from '$lib/components/export/utils';
import * as state from '$lib/store';

export default function CopyAndDownLoadButtonsContainer() {
  const [showDownloadPDF, setShowDownloadPDF] = useRecoilState(
    state.showDownloadPDF
  );
  const [showDownloadPDFButton, setShowDownloadPDFButton] = useRecoilState(
    state.showDownloadPDFButton
  );

  const jpgImage = useRecoilValue(state.jpgImage);
  const dataUrl = useRecoilValue(state.screenshotUrl);

  const lineup = get('lineup');
  const title = get('title');

  function handleCopyLineup() {
    copyImageToClipboard(jpgImage);
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
    link.href = dataUrl;
    link.click();
  }

  function handleShowDownloadPDF() {
    setShowDownloadPDF(true);
    setShowDownloadPDFButton(false);
  }

  return (
    <div id='copy-and-download-buttons-container'>
      {showCopyLineupToClipboard() && (
        <button on:click={handleCopyLineup} class='stacked'>
          Copy Lineup to Clipboard
        </button>
      )}
      <button on:click={handleCopyPlayers} class='stacked'>
        Copy Players to Clipboard
      </button>
      <button on:click={handleDownloadScreenshot} class='stacked'>
        Download Screenshot
      </button>
      {showDownloadPDFButton && (
        <button on:click={handleShowDownloadPDF} class='stacked'>
          Download PDF
        </button>
      )}
    </div>
  );
}

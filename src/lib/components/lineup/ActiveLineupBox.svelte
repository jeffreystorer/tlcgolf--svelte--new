'use client';
import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { LineupTextarea, SaveLineup } from '$lib/components/lineup';
import { AutoButtons } from '$lib/components/lineup/buttons';
import { useGenerateTeamTables } from '$lib/components/lineup/hooks';
import { createProgAdjMessage, getCourseName } from '$lib/components/common/utils';
import { GameOptionsModal } from '$lib/components/lineup';
import * as state from '$lib/store';

export default function ActiveLineupBox({ snapshots }) {
  const resetTextareaValue = useResetRecoilState(state.textareaValue);
  const generateTeamTables = useGenerateTeamTables();
  const course = useRecoilValue(state.course);
  const playingDate = useRecoilValue(state.playingDate);
  const progAdj = useRecoilValue(state.progAdj);
  const progs069 = useRecoilValue(state.progs069);
  const okToSave = useRecoilValue(state.okToSave);
  const okToAddPlayers = useRecoilValue(state.okToAddPlayers);
  const progAdjMessage = createProgAdjMessage(progAdj, progs069);
  const courseName = getCourseName(course);
  let header = '';
  if (playingDate !== 'Date') {
    header = playingDate + ' at ' + courseName;
  }

  function handleClearGame() {
    resetTextareaValue();
  }

  return (
    <div id='active-lineup' class='titled_outer'>
      <h2>{header}</h2>
      <AutoButtons />
      {generateTeamTables()}
      {progs069 > 0 && okToAddPlayers && <p>{progAdjMessage}</p>}
      {okToSave && (
        <div id='active-lineup_footer'>
          <LineupTextarea />
          <div class='buttons'>
            <a type='button' class='stacked' href='#gameoptionsmodal'>
              Choose Game Options
            </a>
            <button class='stacked' onClick={handleClearGame}>
              Clear Game
            </button>
          </div>
          <GameOptionsModal />
          <SaveLineup snapshots={snapshots} />
        </div>
      )}
    </div>
  );
}

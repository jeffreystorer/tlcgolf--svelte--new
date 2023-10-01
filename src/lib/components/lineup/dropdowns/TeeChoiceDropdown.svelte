//child of TeamTable

'use client';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';
import { useRecomputeTeamTables } from '$lib/components/lineup/hooks';
import * as state from '$lib/store';
import { buildTeeArray } from '$lib/components/common/utils';

export default function TeeChoiceDropdown({ playerId, teamNumber, baseTee }) {
  const course = useRecoilValue(state.course);
  const teesSelected = useRecoilValue(state.teesSelected);
  const recomputeTeamTables = useRecomputeTeamTables();
  const teamTables = useRecoilValue(state.teamTables);
  const teesSelectedArray = buildTeeArray(teesSelected[course]);
  const teeChoiceOptionItems = teesSelectedArray.map((tee) => (
    <option key={uuidv4()} value={tee}>
      {tee}
    </option>
  ));
  let newTeamTables = _.cloneDeep(teamTables);
  let teamName, playerIndex;

  function handleTeeChoiceChange(event) {
    const aTeeChoice = event.target.value;
    const anId = Number(event.target.name);
    const aTeamNumber = event.target.id;
    teamName = 'team' + aTeamNumber;
    playerIndex = teamTables[teamName].findIndex(
      (player) => player.id === Number(anId)
    );
    newTeamTables[teamName][playerIndex].teeChoice = aTeeChoice;
    recomputeTeamTables(playerIndex, newTeamTables, teamName);
  }

  return (
    <td>
      <select
        class='embedded_tee'
        id={teamNumber}
        name={playerId}
        value={baseTee}
        on:change={handleTeeChoiceChange}>
        {teeChoiceOptionItems}
      </select>
    </td>
  );
}

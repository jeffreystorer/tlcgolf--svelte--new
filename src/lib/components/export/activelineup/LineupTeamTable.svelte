<script>
  export let teamMembers;
  export let teamNumber;
  export let times;
  export let teamTables;
  import {showTeamHcp, progs069, progAdj, course, teesSelected} from '$lib/store';
  import { LineupTeamTableHeader } from '$lib/components/export/activelineup';
  import { setTeamHcpAndProgs } from '$lib/components/common/utils';

  let teamName = 'team' + teamNumber;
  let teamHcp, teamProgs;
  let teamHcpAndProgsValues;
  let _teesSelected = $teesSelected[$course]
  function setTeamValues() {
    teamHcpAndProgsValues = setTeamHcpAndProgs(
      teamName,
      teamMembers,
      $progAdj,
      $progs069,
      _teesSelected
    );
    teamHcp = teamHcpAndProgsValues[0];
    teamProgs = teamHcpAndProgsValues[1];
  }
  setTeamValues();
  let rows = teamMembers;
  let rowsTD = [];
  let teeCount = _teesSelected.length;
  let playerCount;
  if (teamMembers) {
    playerCount = teamMembers.length;
  } else {
    playerCount = 0;
  }

  function generateRows() {
    for (let i = 0; i < playerCount; i++) {
      rowsTD[i] = (
        <tr key={rows[i].id}>
          <th scope='row'>{rows[i].playerName}</th>
          {generateCols(i)}
        </tr>
      );
    }
    return rowsTD;
  }

  function generateCols(i) {
    let tds = [];
    for (var j = 0; j < teeCount; j++) {
      if (rows[i].teeChoice === teesSelected[j].value) {
        tds[j] = (
          <td class='ch-chosen' key={uuidv4()}>
            {rows[i].courseHandicaps[j]}
          </td>
        );
      } else {
        tds[j] = <td key={uuidv4()}>{rows[i].courseHandicaps[j]}</td>;
      }
    }
      return tds;
  }
</script>

  return (
    <table>
      <thead>
        <LineupTeamTableHeader
          teesSelected={_teesSelected}
          teamTables={teamTables}
          times={times}
          teamNumber={teamNumber}
        />
      </thead>
      <tbody>{generateRows()}</tbody>
      <tfoot>
        <tr>
          <td colSpan={teeCount + 2}>
            {showTeamHcp || progs069 > 0 ? (
              <span>Team Hcp: {teamHcp}</span>
            ) : (
              <></>
            )}
            {progs069 > 0 ? (
              <span>
                &nbsp;&nbsp;Team Progs per {progs069}: {teamProgs}
              </span>
            ) : (
              <></>
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default LineupTeamTable;

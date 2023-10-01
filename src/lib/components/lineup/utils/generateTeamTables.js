import { get } from 'svelte/store';
import { teeTimeCount, teamTables} from '$lib/store';
import { v4 as uuidv4 } from 'uuid';
import { TeamTable } from '$lib/components/lineup';
  const _teeTimeCount = get(teeTimeCount);
  const _teamTables = get(teamTables);
  let TeamTables = [];
  let teamMembers = [];

  function generateTeamTables() {
    for (var i = 0; i < teeTimeCount; i++) {
      let teamName = 'team' + i;
      teamMembers = _teamTables[teamName];
      TeamTables[i] = (
        <TeamTable key={uuidv4()} teamNumber={i} teamMembers={teamMembers} />
      );
    }
    return TeamTables;
  }
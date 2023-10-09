export default function teamTablesEmpty(teamTables) {
  let empty = true;
  if (teamTables?.team1.length > 0) empty = false;
  return empty
}

export default function teamTablesEmpty(teamTables) {
  let empty = true
  let teamName;
  try {
    for (let i = 0; i < 10; i++) {
      teamName = "team" + i
      if (teamTables[teamName].length > 0) empty = false
    }
  } catch (error) {console.log('error in teamTablesEmpty')}
  return empty
}

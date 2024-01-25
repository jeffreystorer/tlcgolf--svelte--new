<script>
  import '$lib/styles/modal.css';
  import {textareaValue, teeTimeCount, bets, teamTables} from '$lib/store';
  import {holesArray, grossupArray, entryPerArray, rulesArray, puttsArray} from '$lib/components/lineup/optionitems';
  function getTeamPlayerCount(teamMembers) {
    let teamPlayerCount = 0;
    let i;
    for (i = 0; i < teamMembers.length; i++) {
      if (teamMembers[i].courseHandicaps[0] !== "X") {
        teamPlayerCount = teamPlayerCount + 1;
      }
    }
    return teamPlayerCount;
  }
  const playerCount = () => {
    let teamCount = Object.keys($teamTables).length - 1;
    let playerCount = 0;
    for (let i = 0; i < teamCount; i++) {
      let teamName = 'team' + i;
      playerCount = playerCount + getTeamPlayerCount($teamTables[teamName]);
    }
    return playerCount;
  };
  const excessPayoutMessage =
    'You are paying out more than the pot.  Please adjust your payouts.';
  const missingHolesMessage = 'Please select the number of holes for each bet.';
  let entryPer = 'player';
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const holes = formJson.holes;
    const bet = formJson.bet;
    const maxValue = formJson.max;
    let max = '';
    if (maxValue) max = 'Net double bogey max.';
    const grossup = formJson.grossup;
    entryPer = formJson.entryPer;
    const entry = Number(formJson.entry);
    const firstPayout = Number(formJson.firstPayout);
    const secondPayout = Number(formJson.secondPayout);
    const thirdPayout = Number(formJson.thirdPayout);
    const rules = formJson.rules;
    const putts = formJson.putts;
    if (holes !== '6/6/6' && holes !== '9&9' && holes !== '18') {
      alert(missingHolesMessage);
      return;
    }
    const pot = computePot(entry, entryPer);
    const remainder = computeRemainder(
      holes,
      pot,
      firstPayout,
      secondPayout,
      thirdPayout
    );
    if (remainder < 0) {
      alert(excessPayoutMessage);
      return;
    }
    let _textareaValue = holes + ' ' + bet;
    if (max !== '') _textareaValue = _textareaValue + '\n' + max;
    if (grossup !== '') _textareaValue = _textareaValue + '\n' + grossup;
    _textareaValue =
      _textareaValue +
      '\n' +
      'Entry: $' +
      entry +
      entryPer +
      '  Pot: $' +
      pot +
      '\n';
    if (thirdPayout > 0) _textareaValue = _textareaValue + '\n';
    _textareaValue = _textareaValue + 'Payout: $' + firstPayout;
    if (secondPayout > 0) _textareaValue = _textareaValue + '/$' + secondPayout;
    if (thirdPayout > 0) _textareaValue = _textareaValue + '/$' + thirdPayout;
    if (remainder > 0)
      _textareaValue =
        _textareaValue + '\nRemaining pot of $' + remainder + ' for skins';
    if (rules !== '') _textareaValue = _textareaValue + '\n' + rules;
    if (putts !== '') _textareaValue = _textareaValue + '\n' + putts;
    $textareaValue = _textareaValue;
    window.location.href = '#';
  }

  function computePot(entry, entryPer) {
    switch (entryPer) {
      case '/player':
        return playerCount() * entry;
        break;
      case '/team':
        return $teeTimeCount * entry;
        break;
      default:
        break;
    }
  }

  function computeRemainder(
    holes,
    pot,
    firstPayout,
    secondPayout,
    thirdPayout
  ) {
    let payoutTotal = firstPayout + secondPayout + thirdPayout;
    switch (holes) {
      case '6/6/6':
        return pot - payoutTotal * 3;
      case '9&9':
        return pot - payoutTotal * 2;
      case '18':
        return pot - payoutTotal;
      default:
        break;
    }
  }
</script>

<div id='gameoptionsmodal' class='modal'>
  <!-- svelte-ignore a11y-missing-content -->
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href='#' class='modalClose' hidden></a>
  <section>
    <header>
      <h2>Choose the options for your game</h2>
      <!-- svelte-ignore a11y-missing-content -->
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href='#' class='modalClose' hidden></a>
    </header>
    <form on:submit={handleSubmit}>
      <fieldset>
        <select name='holes'>
          <option value=''>Select Number of Holes for Each Bet</option>
          {#each holesArray as item}
            <option value={item}>
              {item}
            </option>
          {/each}
        </select>
        <select name='bet'>
          <option value=''>Select Bet</option>
          {#each $bets as item}
            <option value={item[0]}>
              {item[0]}
            </option>
          {/each}
        </select>
        <label>
          <input type='checkbox' name='max' />
          Net double bogey max.?
        </label>
        <select name='grossup'>
          <option value=''>Gross Up?</option>
          
          {#each grossupArray as item}
            <option value={item}>
              {item}
            </option>
          {/each}
        </select>
        <select name='entryPer'>
          <option value='/player'>Entry per player or team?</option>          
          {#each entryPerArray as item}
            <option value={'/' + item}>
              per {item}
            </option>
          {/each}
        </select>
        <article>
          <label>
            Entry:
            <br />
            <input type='number' name='entry' min='1' max='100' list='entryAmounts'/>
          </label>
          <datalist id='entryAmounts'>
            <option value='10'></option>
            <option value='15'></option>
            <option value='20'></option>
            <option value='24'></option>
            <option value='36'></option>
            <option value='48'></option>
            <option value='60'></option>
            <option value='72'></option>
          </datalist>
          <p><br/>Payouts:</p>
          <label>
            1st:
            <br />
            <input type='number' name='firstPayout' min='1' max='100' list='firstAmounts'/>
          </label>
          <datalist id='firstAmounts'>
            <option value='30'></option>
            <option value='35'></option>
            <option value='40'></option>
            <option value='45'></option>
            <option value='50'></option>
            <option value='55'></option>
            <option value='60'></option>
          </datalist>
          <label>
            2nd:
            <br />
            <input type='number' name='secondPayout' min='1' max='100' list='secondAmounts'/>
          </label>
          <datalist id='secondAmounts'>
            <option value='5'></option>
            <option value='10'></option>
            <option value='15'></option>
            <option value='20'></option>
            <option value='25'></option>
            <option value='30'></option>
          </datalist>
          <label>
            3rd:
            <br />
            <input type='number' name='thirdPayout' min='1' max='100' list='thirdAmounts'/>
          </label>
          <datalist id='thirdAmounts'>
            <option value='5'></option>
            <option value='10'></option>
            <option value='15'></option>
          </datalist>
        </article>
        <select name='rules'>
          <option value=''>Winter or Summer Rules?</option>                   
          {#each rulesArray as item}
            <option value={item}>
              {item}
            </option>
          {/each}
        </select>
        <select name='putts'>
          <option value=''>Putts Good?</option>
          {#each puttsArray as item}
          <option value={item.fullName}>
            {item.nickName}
          </option>
        {/each}
        </select>
        <footer>
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a type='button' class='not-stacked modalClose' href='#'>
            Cancel
          </a>
          <button class='not-stacked' type='submit'>
            Set Options
          </button>
        </footer>
      </fieldset>
    </form>
  </section>
</div>

<style>
  section {
    height: fit-content;
    max-width: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  article > p {
    font-style:normal;
  }
</style>
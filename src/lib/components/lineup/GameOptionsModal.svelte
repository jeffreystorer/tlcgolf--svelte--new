<script>
  import '$lib/styles/modal.css';
  import {textareaValue, teeTimeCount, playerCount, bets} from '$lib/store';
  import {holesArray, grossupArray, entryPerArray, rulesArray, puttsArray} from '$lib/components/lineup/optionitems';
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
        return $playerCount * entry;
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
            <option value={item}>
              {item}
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
            <input type='number' name='entry' min='1' max='100' />
          </label>
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label>
            <br />
            Payouts:
          </label>
          <label>
            First:
            <br />
            <input type='number' name='firstPayout' min='1' max='100' />
          </label>
          <label>
            Second:
            <br />
            <input type='number' name='secondPayout' min='1' max='100' />
          </label>
          <label>
            Third:
            <br />
            <input type='number' name='thirdPayout' min='1' max='100' />
          </label>
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
</style>
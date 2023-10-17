<script>
  import { textareaValue } from '$lib/store';
  $: lines = $textareaValue.split('\n').length
  $: rows =  lines < 4 ? 4 : lines;
</script>

<textarea
  name='lineupTextarea'
  bind:value={$textareaValue}
  rows={rows}
  cols='36'
  placeholder='Enter your bets, entry fee, payouts, and rules here or click the "Choose Game Options" button below to enter them automatically.'></textarea>

 <style>
  textarea {
    border-width: 0.05em;
    outline: none;
    display: block;
    font-size: var(--step-0);
    font-style: normal;
    margin: 0 auto 0.25em auto;
    padding: 0 0.5em;
    resize: none;
  }
</style>
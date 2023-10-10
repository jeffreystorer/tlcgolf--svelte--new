<script>
  import { textareaValue } from '$lib/store';
  $: rows = $textareaValue.split('\n').length;
</script>
<textarea
  bind:value={$textareaValue}
  rows={rows}
  cols='36'
  placeholder='Enter your bets, entry fee, payouts, and rules here or click the "Choose Game Options" button below to enter them automatically.'></textarea>
 
 <style>
  textarea {
    border-width: 0.125em;
    outline: none;
    display: block;
    font-size: var(--step-0);
    font-style: normal;
    margin: 0 auto 0.25em auto;
    min-height: calc(6 * 1.2 * var(--step-0));
    padding: 0.5em;
    resize: none;
  }
</style>
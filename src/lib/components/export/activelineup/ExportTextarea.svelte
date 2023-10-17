<script>
  import { textareaValue } from '$lib/store';
  let lines = $textareaValue.split('\n').length
  let rows =  lines < 4 ? 4 : lines;
</script>

<textarea
  value={$textareaValue}
  rows={rows}
  cols='36'
  readonly='true'
/>

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
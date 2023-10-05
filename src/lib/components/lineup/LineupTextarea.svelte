<script>
  import { TextAreaAutosize } from '$lib/components/lineup';
  import { textareaValue } from '$lib/store';

  const handleChange = (event) => {
    $textareaValue= event.target.value;
  };

</script>

<TextAreaAutosize
  minRows{1}
  maxRows{20}
  bind:value={$textareaValue}
  on:change={handleChange}
  onFocus={(event) => (event.target.value = textareaValue)}
  onBlur={handleChange}
  placeholder='Enter your bets, entry fee, payouts, and rules here or click the "Choose Game Options" button below to enter them automatically.'
/>

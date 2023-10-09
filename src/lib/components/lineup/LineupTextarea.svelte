<script>
  import { TextAreaAutosize } from '$lib/components/lineup';
  import { textareaValue } from '$lib/store';

</script>

<TextAreaAutosize
  minRows={4}
  maxRows={40}
  bind:value={$textareaValue}
/>

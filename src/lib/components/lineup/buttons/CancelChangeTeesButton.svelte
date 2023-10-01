<script>
  import { showChangeTees } from '$lib/store';
  function handleClick() {
    $showChangeTees = false;
  }
  </script>

<button on:click={handleClick}>Cancel</button>;

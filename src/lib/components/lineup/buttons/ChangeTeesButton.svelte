<script>
  import { showChangeTees } from '$lib/store';
  function handleClick() {
    $showChangeTees = true;
  }
  </script>

<button on:click={handleClick}>Change showChangeTees</button>;

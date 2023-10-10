<script>
  import { showChangeTees } from '$lib/store';
  function handleClick() {
    $showChangeTees = true;
  }
</script>

<button class='stacked' on:click={handleClick}>Change Tees</button>

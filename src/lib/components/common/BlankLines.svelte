<script>
  export let lines;
  let breaks = new Array(lines).fill(undefined).map((x) => '<br />')
</script>

{#each breaks as item}
  {@html item}
{/each}
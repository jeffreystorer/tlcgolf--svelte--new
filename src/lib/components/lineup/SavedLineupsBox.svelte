<script>
  import { onMount } from 'svelte'
  import { snapshots, currentLineup, currentLineupKey, currentLineupIndex, deleteAll, lineupTitle} from '$lib/store';
  let currentSnapshot = [];
  onMount(() => {
    if ($currentLineupIndex > -1) {
      currentSnapshot = $snapshots[$currentLineupIndex];
      $currentLineupKey = currentSnapshot.key;
      $currentLineup = {
        key: currentSnapshot.key,
        lineup: currentSnapshot.lineup,
        title: currentSnapshot.title
      };
      $lineupTitle = currentSnapshot.title;
    }
  });

  function handleClick(currentSnapshot, index) {
    $currentLineupKey= currentSnapshot.key;
    $currentLineupIndex = index;
    $currentLineup = {
      key: currentSnapshot.key,
      lineup: currentSnapshot.lineup,
      title: currentSnapshot.title
    };
    $lineupTitle = currentSnapshot.title;
  }

  function handleDeleteAll(e) {
    e.preventDefault;
    $deleteAll= true;
    window.location.href = '#confirmdeletemodal';
  }

</script>


<div class='titled_outer'>
  <h2>Saved Lineups</h2>
  {#if $snapshots.length > 0}
          <button type='button' class='stacked' on:click={handleDeleteAll}>
            Delete All
          </button>
          <p>Click on a lineup to edit, export, or delete</p>
          <div class='divider'></div>
          <ul id='ul'>
            {#each $snapshots as snapshot, index (index)}
              <li>
                <a href='#ul' class={index === $currentLineupIndex ? 'active_li' : 'li'}
                on:click={() => handleClick(snapshot, index)}>
                  {snapshot.title}
                </a>
              </li>
            {/each}
          </ul>
      {/if}
</div>

<style>
  p {
    font-size: var(--step-0);
    font-style: italic;
  }

  a {
    font-size: var(--step-0);
    margin: 0 auto;
    text-align: left;
    text-decoration: none;
    width: fit-content;
  }

  .active_li,
  .li {
    background-color: var(--background-white);
    color: var(--color-black);
  }

  .active_li {
    font-weight: 700;
  }
</style>

      
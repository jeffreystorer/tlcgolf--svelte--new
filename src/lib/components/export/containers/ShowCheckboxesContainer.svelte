<script>
  import {progs069, showFirstName, showTeamHcp, showIndividualHandicaps, showLocalNumbers, dimensionIndex} from '$lib/store';

  function handleChange() {
    $dimensionIndex = 0;
  }
  
</script>

<div id='showcheckboxes-container'>
  <label>
    <input
      name='showFirstName'
      type='checkbox'
      on:change={handleChange}
      bind:value={$showFirstName}
    />
    Show First Name
  </label>
  {#if (progs069 < 1 && $showIndividualHandicaps)}
    <label>
      <input
        name='showTeamHcp'
        type='checkbox'
        id='showTeamHcp'
        on:change={handleChange}
        bind:value={$showTeamHcp}
      />
      Show Team Hcp
    </label>
  {/if}
  <label>
    <input
      name='showIndividualHandicaps'
      type='checkbox'
      id='showIndividualHandicaps'
      on:change={handleChange}
      bind:value={$showIndividualHandicaps}
    />
    Show Individual Handicaps
  </label>
  <label>
    <input
      name='showLocalNumbers'
      type='checkbox'
      id='showLocalNumbers'
      on:change={handleChange}
      bind:value={$showLocalNumbers}
    />
    Show Local Numbers
  </label>
</div>
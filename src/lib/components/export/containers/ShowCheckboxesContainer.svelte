<script>
  import {progs069, showFirstName, showTeamHcp, showIndividualHandicaps, showLocalNumbers, dimensionIndex} from '$lib/store';
  
  function handleChange() {
    $dimensionIndex = 0;
  }
  
</script>
<div class='titled_outer' id='displayoptions'>
  <h2>Display Options</h2>
  <label class='toggle'>
    <input
      name='showFirstName'
      class='toggle-checkbox'
      type='checkbox'
      on:change={handleChange}
      bind:checked={$showFirstName}
    />
    <div class='toggle-switch'></div>
    <span class='toggle-label'>First Name</span>
  </label>
  {#if ($progs069 < 1 && $showIndividualHandicaps)}
    <label class='toggle'>
      <input
        name='showTeamHcp'
        class='toggle-checkbox'
        type='checkbox'
        on:change={handleChange}
        bind:checked={$showTeamHcp}
      />
      <div class='toggle-switch'></div>
      <span class='toggle-label'>Team Handicap</span>
    </label>
  {/if}
  <label class='toggle'>
    <input
      name='showIndividualHandicaps'
      class='toggle-checkbox'
      type='checkbox'
      on:change={handleChange}
      bind:checked={$showIndividualHandicaps}
    />
    <div class='toggle-switch'></div>
    <span class='toggle-label'>Individual Handicaps</span>
  </label>
  <label class='toggle'>
    <input
      name='showLocalNumbers'
      class='toggle-checkbox'
      type='checkbox'
      on:change={handleChange}
      bind:checked={$showLocalNumbers}
    />
    <div class='toggle-switch'></div>
    <span class='toggle-label'>Local Numbers</span>
  </label>
</div>

<style>
  #displayoptions {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5em;
    font-size: var(--step--2);
    width: fit-content;
  }
  
  .toggle { 
    text-align: left;
  }
</style>
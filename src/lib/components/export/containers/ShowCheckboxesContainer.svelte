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
      bind:checked={$showFirstName}
    />
    Show First Name
  </label>
  {#if ($progs069 < 1 && $showIndividualHandicaps)}
    <label>
      <input
        name='showTeamHcp'
        type='checkbox'
        on:change={handleChange}
        bind:checked={$showTeamHcp}
      />
      Show Team Hcp
    </label>
  {/if}
  <label>
    <input
      name='showIndividualHandicaps'
      type='checkbox'
      on:change={handleChange}
      bind:checked={$showIndividualHandicaps}
    />
    Show Individual Handicaps
  </label>
  <label>
    <input
      name='showLocalNumbers'
      type='checkbox'
      on:change={handleChange}
      bind:checked={$showLocalNumbers}
    />
    Show Local Numbers
  </label>
</div>
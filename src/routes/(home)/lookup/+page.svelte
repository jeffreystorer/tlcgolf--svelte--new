<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte';
  import { sget } from '$lib/components/common/utils';
  import { states } from './optionitems';
  const isLoggedIn = sget('isLoggedIn');

  onMount(() => {
    if (!isLoggedIn) {
      goto('/');
    }
  });

  let last_name, first_name, state;

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    last_name = formJson.last_name;
    first_name = formJson.first_name;
    state = formJson.state;
    goto(
      `/lookupgolfer?last_name=${last_name}&first_name=${first_name}&state=${state}`
    );
  }
</script>

  <h2>Lookup GHIN Information</h2>
  <form on:submit={handleSubmit}>
    <fieldset>
      <label>
        First Name:
        <input type='text' name='first_name' bind:value={first_name} />
      </label>
      <label>
        Last Name:
        <input type='text' name='last_name' bind:value={last_name} required />
      </label>
      <label>
        State:
        <select name='state' bind:value={state}>
          {#each states as state, index (index)}
            <option key={state} value={state}>
              {state}
            </option>
          {/each}
        </select>
      </label>
      <button class={'not-stacked'} type='submit'>
        Lookup Golfer
      </button>
    </fieldset>
  </form>
  <p>
    You may enter an initial or a name in the First Name field. The First
    Name and State fields are optional. If you leave the State field blank,
    you will search the entire country, but, if so, you should include at
    least the first letter of the First Name to narrow the search, which
    will return only the first 100 matches in the country.
  </p>

<style>
  form > fieldset > label > input,
  form > fieldset > label > select {
  margin-left: 0.5em;
  }

  fieldset {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 1em;
  font-size: var(--step-1);
  }

  p {
  margin: 0 auto;
  width: 50%;
  }
</style>
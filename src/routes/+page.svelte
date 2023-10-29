<script>
  export let data;
  import { dataMode } from '$lib/store';
  import {getCaptains} from '$lib/components/fetchdata/apis/utils';
  let captains = getCaptains(data.captains.values);
  import { goto } from '$app/navigation';
  import capitalize from '$lib/components/common/utils/capitalize.js';
  import { clear, get, set } from '$lib/components/common/utils/localStorage.js';
  import { sclear } from '$lib/components/common/utils/sessionStorage.js';
  let checked = true;
  const ghinNumber = get('ghinNumber') ? get('ghinNumber') : '';
  let lastName = get('lastName') ? get('lastName') : '';
  const course = get('course') ? get('course') : '';
  const group = get('group') ? get('group') : '';
  const teesSelected = get('teesSelected') ? get('teesSelected') : '';
  clear();
  sclear();
  set('ghinNumber', ghinNumber);
  set('lastName', lastName);
  set('course', course);
  set('group', group);
  if (Object.keys(teesSelected).length === 6) set('teesSelected', teesSelected);

  function getCaptainObject(lastName) {
    return captains.find((captain) => captain.lastName === lastName);
  }

  function handleSubmit(e) {
    e.preventDefault();
    $dataMode = 'ghin';
    if (!checked) $dataMode = 'roster';
    const captain = getCaptainObject(capitalize(lastName));
    if (captain !== undefined) {
      set('ghinNumber', captain.ghinNumber);
      lastName = capitalize(captain.lastName);
      set('lastName', lastName);
      goto(`/fetchdata?ghinNumber=${captain.ghinNumber}&dataMode=${$dataMode}`);
    } else {
      lastName = 'Invalid Last Name';
      set('lastName', 'Invalid Last Name');
      set('ghinNumber', '');
    }
  }
</script>

<header>
  <h1>TLC Golf</h1>
</header>
<main>
  <form on:submit={handleSubmit}>
    <fieldset>
      <label>
          Last Name:
          <input
          type='text'
          name='lastName'
          bind:value={lastName}
          required
          />
      </label>
      <button type='submit'>
          Sign In
      </button>
      <label>
          <input type='checkbox' name='dataMode' bind:checked={checked} />
          Fetch Data from GHIN
      </label>
    </fieldset>
  </form>
</main>

<style>	
  header h1 {
		background-color: var(--background-blue);
		box-shadow: 0 0.875em 1.75em rgba(0, 0, 0, 0.25),
			0 0.625em 0.625em rgba(0, 0, 0, 0.28);
		color: var(--color-white);
		font-size: var(--step-1);
		font-weight: normal;
		height: 1.5em;
		margin: 0 auto 1em auto;
		padding: 0 0.25em;
		width: fit-content;
		}		

header {
align-items: center;
background-color: var(--background-white);
display: flex;
flex-direction: row;
gap: 0.25em;
height: fit-content;
margin: 0 auto 1em auto;
width: fit-content;

& > h1 {
background-color: var(--background-blue);
box-shadow: 0 0.875em 1.75em rgba(0, 0, 0, 0.25),
0 0.625em 0.625em rgba(0, 0, 0, 0.28);
color: var(--color-white);
font-size: var(--step-1);
font-weight: normal;
height: 1.5em;
padding: 0 0.25em;
width: fit-content;
}
}
    
  form {
		font-size: var(--step-0);
		

		& fieldset {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 100%;
		}

		& label {
		justify-content: right;
		margin: 0 auto;
		width: fit-content;
		}

		& input {
		text-align: center;
		}
  }
</style>


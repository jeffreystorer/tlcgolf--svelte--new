<script>
import {
  PlayingDateDropdown,
  TeeTimeCountDropdown,
  LinkTimeDropdown,
  Progs069Dropdown,
  ProgAdjDropdown,
} from '$lib/components/lineup/dropdowns';
</script>

<div>
  <PlayingDateDropdown />
  <TeeTimeCountDropdown />
</div>
<div>
  <LinkTimeDropdown />
</div>
<div>
  <Progs069Dropdown />
  <ProgAdjDropdown />
</div>

<style>    
  div {
	display: flex;
	flex-direction: row;
	gap: 0.25em;
	color: var(--color-black);
	height: fit-content;
	padding: 0.125em;
	margin: 0 auto 0.5em auto;
	width: fit-content;
  }
</style>

<script>
	export let value = '';
	export let minRows = 1;
	export let maxRows;
	
	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="container">
	<pre
		aria-hidden="true"
		style="min-height: {minHeight}; max-height: {maxHeight}"
	>{value + '\n'}</pre>

	<textarea
		placeholder='Enter your bets, entry fee, payouts, and rules here or click the "Choose Game Options" button below to enter them automatically.'
		bind:value></textarea>
</div>

<style>
	.container {
		position: relative;
	}
	
	pre, textarea {
		font-family: inherit;
		padding: 0.5em;
		box-sizing: border-box;
		border: 1px solid #eee;
		line-height: 1.2;
		overflow: hidden;
	}
	
	textarea {
      border-width: 0.125em;
      outline: none;
      display: block;
      font-size: var(--step-0);
      font-style: normal;
      margin: 0 auto 0.25em auto;
      padding: 0.5em;
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  top: 0;
      resize: none;
	}
</style>
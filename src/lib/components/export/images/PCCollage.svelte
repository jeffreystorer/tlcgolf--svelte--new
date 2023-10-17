<script>
    export let pcSetting;
    import {screenshotUrl } from '$lib/store';
    const {rows, columns, factor, width, height} = pcSetting;
    let rowWidth = (factor*columns*width).toString() + 'px';
    let rowHeight = (factor*height).toString() + 'px';
    let cellWidth = (factor*width - 2).toString() + 'px';
    let cellHeight = (factor*height - 2).toString() + 'px';
</script>
  
  <div id="collage" style="--width: {rowWidth}">
    {#each Array(rows) as _}
      <div class="row" style="--rowWidth: {rowWidth}; --rowHeight: {rowHeight}">
        {#each Array(columns) as _}
          <div class="cell" style="--cellWidth: {cellWidth}; --cellHeight: {cellHeight}">
            <div class="thumb" style="--bg-image: url({$screenshotUrl})"/>
          </div>
        {/each}
      </div>
    {/each}
  </div>

<style>

  #collage {
    width: var(--width);
  }

	.row {
		border: 1px solid rgb(221, 221, 221);
		display: flex;
		flex-direction: row;
    height: var(--rowHeight);
    width: var(--rowWidth);
	}

	.cell {
		display: flex;
		position: relative;
		flex: 1 1 0%;
    height: var(--cellHeight);
    width: var(--cellWidth);
	}

  .thumb {
    flex: 1 1 0%;
    background-image: var(--bg-image);
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>

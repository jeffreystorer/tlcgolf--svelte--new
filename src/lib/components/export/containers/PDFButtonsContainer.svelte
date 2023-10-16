<script>
  export let pdfLoading;
  import { refCollage } from '$lib/store';
  import { dimensionIndex, showDownloadPDF} from '$lib/store';
  import { dimensionArray } from '$lib/components/export/optionitems';
  import { DownloadPDFButton } from '$lib/components/export/buttons';
</script>

{#if (pdfLoading)}
  <p> Loading PDF...</p>
{:else }
  {#if $showDownloadPDF}
      <div id='download-pdf' class='titled_outer'>
        <h2>Download PDF</h2>
        <div class='select-dropdown-container'>
          <label>
            Select PDF Format
            <select
              bind:value={$dimensionIndex}>
              {#each dimensionArray as dimension, index}
                <option value={index}>
                  {dimension[0] + ' X ' + dimension[1]}
                </option>
              {/each}
            </select>
          </label>
        </div>
        <br />
        {#if $dimensionIndex > 0}
          {#key $dimensionIndex}
            <div id='pdfbuttons'>
              <DownloadPDFButton type={'portrait'} element={$refCollage} dimensionIndex = {$dimensionIndex}/>
              <DownloadPDFButton type={'landscape'} element={$refCollage} dimensionIndex = {$dimensionIndex}/>
            </div>
          {/key}
        {/if}
      </div>
  {/if}
{/if}


    
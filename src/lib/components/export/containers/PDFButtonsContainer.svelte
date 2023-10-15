<script>
  export let pdfLoading;
  import { ref } from '$lib/store';
  import { dimensionIndex, showDownloadPDF} from '$lib/store';
  import { DownloadPDFButton } from '$lib/components/export/buttons';
  import { dimensionArray } from '$lib/components/export/optionitems';  
  const handleDimensionIndexChange = (event) => {
    $dimensionIndex = event.target.value;
  };
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
              value={dimensionIndex}
              on:change={handleDimensionIndexChange}>
              {#each dimensionArray as dimension, index}
                <option value={index}>
                  {dimension[0] + ' X ' + dimension[1]}
                </option>
              {/each}
            </select>
          </label>
        </div>
        <br />
        {#if dimensionIndex > 0}
          <div id='pdfbuttons'>
            <DownloadPDFButton type={'portrait'} element={$ref} />
            <DownloadPDFButton type={'landscape'} element={$ref} />
          </div>
        {/if}
      </div>
  {/if}
{/if}


    
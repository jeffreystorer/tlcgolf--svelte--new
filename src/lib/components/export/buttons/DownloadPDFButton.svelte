<script>
  export let type;
  export let element;
  export let dimensionIndex;
  import { showDownloadPDF, showDownloadPDFButton } from '$lib/store';
  import { createPDF } from '$lib/components/export/utils';
  import { dimensionArray } from '$lib/components/export/optionitems';
  let rowCount = dimensionArray[dimensionIndex][0];
  let colCount = dimensionArray[dimensionIndex][1];
  let dims = rowCount + ' X ' + colCount; 
  let buttonText;
  switch (type) {
    case 'portrait':
      buttonText = 'Portrait  ' + dims;
      break;
    case 'landscape':
      buttonText = 'Landscape  ' + dims;
      break;
    default:
      break;
  }

  function handleClick() {
    $showDownloadPDF = false;
    $showDownloadPDFButton = true;
    createPDF(type, element, dims);
  }
</script> 
  
<button on:click={handleClick}>{buttonText}</button>

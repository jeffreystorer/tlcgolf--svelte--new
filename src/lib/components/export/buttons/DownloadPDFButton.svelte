<script>
  export let type;
  export let element;
  console.log("🚀 ~ file: DownloadPDFButton.svelte:4 ~ element:", element)
  import { showDownloadPDF, showDownloadPDFButton, dimensionIndex} from '$lib/store';
  import { dimensionArray } from '$lib/components/export/optionitems';
  import { createPDF } from '$lib/components/export/utils';
  const rowCount = dimensionArray[$dimensionIndex][0];
  const colCount = dimensionArray[$dimensionIndex][1];
  const dims = rowCount + ' X ' + colCount;
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

  
  

<button on:click={handleClick}>{buttonText}</button>;

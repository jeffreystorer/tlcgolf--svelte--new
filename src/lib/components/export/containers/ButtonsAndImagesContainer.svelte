<script>
  import { onMount} from 'svelte';
  import { screenshotUrl, dimensionIndex, pdfDim, styleDims} from '$lib/store';
  import {
    CopyAndDownloadButtonsContainer,
    PDFButtonsContainer,
  } from '$lib/components/export/containers';
  import { LineupImage, Collage } from '$lib/components/export/images';
  import { dimensionArray } from '$lib/components/export/optionitems';

  let index = $dimensionIndex;
  if (index === 0) index = index + 1;
  
  //PDF Creation

  const rowCount = dimensionArray[index][0];
  const colCount = dimensionArray[index][1];
  let pdfLoading = true;
  let pcSetting;
 
  const img = new Image();
  img.src = $screenshotUrl;
  let factor = 2.0;

  let pcWidth = img.width * colCount * factor;
  let pcHeight = img.height * factor;
  let pcDim = {
    width: pcWidth,
    height: pcHeight * rowCount,
  };
  let pcStyleWidth = pcDim.width + 'px';
  let pcStyleHeight = pcDim.height + 'px';

  $pdfDim = pcDim;

  $styleDims =  [pcStyleWidth, pcStyleHeight];

  onMount(() => {
    pcSetting = {
      rows: rowCount, 
      columns: colCount,
      factor: factor,
      width: img.width,
      height: img.height,
    }
    pdfLoading = false;
  });
</script>



<CopyAndDownloadButtonsContainer />
<PDFButtonsContainer {pdfLoading} />
<section>
  <LineupImage />
  <Collage
    {pdfLoading}
    {pcSetting}
  />
</section>

<style>
  section {
    top: 0;
    left: -1000%;
    position: fixed;
  }
</style>
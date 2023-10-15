<script>
  import { onMount} from 'svelte';
  export let dimensionIndex;
  import { screenshotUrl} from '$lib/store';
  import {
    CopyAndDownloadButtonsContainer,
    PDFButtonsContainer,
  } from '$lib/components/export/containers';
  import { LineupImage, Collage } from '$lib/components/export/images';
  import { dimensionArray } from '$lib/components/export/optionitems';
  import { get, set } from '$lib/components/common/utils';
  import { returnCollageSetting } from '$lib/components/export/utils';

  let index = dimensionIndex;
  if (index === 0) index = index + 1;
  let dataUrl = $screenshotUrl;
  
  //PDF Creation

  const rowCount = dimensionArray[index][0];
  const colCount = dimensionArray[index][1];
  let pdfLoading = true;
  let pcSetting;
 
  const img = new Image();
  img.src = dataUrl;
  let factor = 2.0;

  let pcWidth = img.width * colCount * factor;
  let pcWidthPx = pcWidth.toString() + 'px';
  let pcHeight = img.height * factor;
  let pcHeightPx = pcHeight.toString() + 'px';
  let pcDim = {
    width: pcWidth,
    height: pcHeight * rowCount,
  };
  let pcStyleWidth = pcDim.width + 'px';
  let pcStyleHeight = pcDim.height + 'px';

  set('pdfDim', pcDim);

  set('styleDims', [pcStyleWidth, pcStyleHeight]);
  const styleDims = get('styleDims');

  onMount(() => {
    pcSetting = returnCollageSetting(dataUrl, rowCount, colCount, pcWidthPx, pcHeightPx)
    pdfLoading = false;
  });
</script>



<CopyAndDownloadButtonsContainer />
<PDFButtonsContainer pdfLoading={pdfLoading} />
<div id='lineup-images'>
  <br/>
  <LineupImage />
  <br />
  <Collage
    {pdfLoading}
    {pcSetting}
    {styleDims}
  />
</div>
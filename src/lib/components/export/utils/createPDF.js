import {lineupTitle, pdfDim} from '$lib/store';
import { get } from 'svelte/store';
import { jsPDF } from "jspdf";
//import domtoimage from "dom-to-image";
import html2canvas from 'html2canvas';
export default function createPDF(type, element, dims) {
  const dimensions = get(pdfDim);
  const orientation = type;
  const fileName = get(lineupTitle) + " (" + type + " " + dims + ").pdf";
  let PAPER_DIMENSIONS = {};
  let format = [];
  switch (type) {
    case "portrait":
      PAPER_DIMENSIONS = {
        width: 8.16,
        height: 10.56,
      };
      format = [8.16, 10.56];
      break;
    case "landscape":
      PAPER_DIMENSIONS = {
        width: 10.56,
        height: 8.16,
      };
      format = [10.56, 8.16];
      break;
    default:
      break;
  }

  const PAPER_RATIO = PAPER_DIMENSIONS.width / PAPER_DIMENSIONS.height;
  const imageDimensions = (dimensions) => {
    // If the image is in portrait and the full height would skew
    // the image ratio, we scale the image dimensions.
    const imageRatio = dimensions.width / dimensions.height;
    if (imageRatio > PAPER_RATIO) {
      const imageScaleFactor =
        (PAPER_RATIO * dimensions.height) / dimensions.width;

      const scaledImageHeight = PAPER_DIMENSIONS.height * imageScaleFactor;

      return {
        height: scaledImageHeight,
        width: scaledImageHeight * imageRatio,
      };
    }

    // The full height can be used without skewing the image ratio.
    return {
      width: PAPER_DIMENSIONS.height / (dimensions.height / dimensions.width),
      height: PAPER_DIMENSIONS.height,
    };
  };

  const doc = new jsPDF({
    orientation: orientation,
    unit: "in",
    format: format,
  });

  html2canvas(element).then(function(canvas)  {
      let x, y, w, h;
      x = (PAPER_DIMENSIONS.width - imageDimensions(dimensions).width) / 2;
      y = (PAPER_DIMENSIONS.height - imageDimensions(dimensions).height) / 2;
      w = imageDimensions(dimensions).width;
      h = imageDimensions(dimensions).height;
      doc.addImage(canvas, "JPEG", x, y, w, h);
      doc.setProperties({ title: get(lineupTitle) });
      doc.save(fileName);
  });
 
/*   domtoimage
    .toJpeg(element, { quality: 1.0 })
    .then(function (dataUrl) {
      let x, y, w, h;
      x = (PAPER_DIMENSIONS.width - imageDimensions(dimensions).width) / 2;
      y = (PAPER_DIMENSIONS.height - imageDimensions(dimensions).height) / 2;
      w = imageDimensions(dimensions).width;
      h = imageDimensions(dimensions).height;
      doc.addImage(dataUrl, "JPEG", x, y, w, h);
      doc.setProperties({ title: get(lineupTitle) });
      doc.save(fileName);
    }); */
 
}

import domtoimage from 'dom-to-image';
import { screenshotUrl } from '$lib/store';

export default function updateScreenshotUrl(){
let element = 'lineup-image';
domtoimage
  .toJpeg(document.getElementById(element), { quality: 0.95 })
  .then(function (dataUrl) {
    screenshotUrl.set(dataUrl);
  });
}
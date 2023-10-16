import domtoimage from 'dom-to-image';

export default function getScreenshotUrl(){
let element = 'lineup-image';
let screenshotUrl;
domtoimage
  .toJpeg(document.getElementById(element), { quality: 0.95 })
  .then(function (dataUrl) {
    screenshotUrl = dataUrl;
  });
return screenshotUrl;
}
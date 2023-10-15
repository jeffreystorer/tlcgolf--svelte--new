export default function returnCollageSetting(
  dataUrl,
  rows,
  columns,
  widthPx,
  heightPx
) {
  let heightArray = [];
  for (let i = 0; i < rows; i++) heightArray.push(heightPx);
  let layoutArray = [];
  for (let i = 0; i < rows; i++) layoutArray.push(columns);
  let photoArray = [];
  for (let i = 0; i < rows * columns; i++) photoArray.push({ src: dataUrl });

  const setting = {
    columns: columns,
    width: widthPx,
    height: heightArray,
    layout: layoutArray,
    images: photoArray,
  };
  return setting;
}

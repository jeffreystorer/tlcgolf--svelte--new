import { getExportTeesSelectedArray } from "$lib/components/export/utils";

export default function returnHeaderRow(teesSelected) {
  let teesSelectedArray = getExportTeesSelectedArray(teesSelected);
  teesSelectedArray.unshift("");
  return teesSelectedArray;
}

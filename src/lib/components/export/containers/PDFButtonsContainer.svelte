import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DownloadPDFButton } from '$lib/components/export/buttons';
import { DimensionsDropdown } from '$lib/components/export/dropdowns';
import { dimensionsOptionItems } from '$lib/components/export/optionitems';
import * as state from '$lib/store';

const PDFButtonsContainer = ({ pdfLoading, currentRef }) => {
  const [dimensionIndex, setDimensionIndex] = useRecoilState(
    state.dimensionIndex
  );
  const showDownloadPDF = useRecoilValue(state.showDownloadPDF);

  const handleDimensionIndexChange = (event) => {
    setDimensionIndex(event.target.value);
  };
  if (pdfLoading) return <p> Loading PDF...</p>;

  return (
    <>
      {showDownloadPDF && (
        <div id='download-pdf' class='titled_outer'>
          <h2>Download PDF</h2>
          <div class='select-dropdown-container'>
            <label>
              Select PDF Format
              <select
                value={dimensionIndex}
                on:change={handleDimensionIndexChange}>
                {dimensionsOptionItems}
              </select>
            </label>
          </div>
          <br />
          {dimensionIndex > 0 && (
            <div id='pdfbuttons'>
              <DownloadPDFButton type={'portrait'} element={currentRef} />
              <DownloadPDFButton type={'landscape'} element={currentRef} />
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default PDFButtonsContainer;

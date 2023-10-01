import React from 'react';
import { useRecoilState } from 'recoil';
import { dimensionsOptionItems } from '$lib/components/export/optionitems';
import * as state from '$lib/store';

export default function DimensionsDropdown() {
  const [dimensionIndex, setDimensionIndex] = useRecoilState(
    state.dimensionIndex
  );

  const handleDimensionIndexChange = (event) => {
    setDimensionIndex(event.target.value);
  };

  return (
    <>
      <label>
        Select PDF Format
        <select value={dimensionIndex} on:change={handleDimensionIndexChange}>
          {dimensionsOptionItems}
        </select>
      </label>
    </>
  );
}

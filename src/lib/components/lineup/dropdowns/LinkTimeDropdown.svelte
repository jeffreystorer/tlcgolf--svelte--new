'use client';
import React from 'react';
import { useRecoilState } from 'recoil';
import { linkTimeOptionItems } from '$lib/components/lineup/optionitems';
import * as state from '$lib/store';

export default function LinkTimeDropdown() {
  const [linkTime, setLinkTime] = useRecoilState(state.linkTime);
  const handleChange = (event) => {
    setLinkTime(event.target.value);
  };

  return (
      <label>
        Link Time
        <select name='linkTime' value={linkTime} onChange={handleChange}>
          <option value='Link Time'>Link Time</option>
          {linkTimeOptionItems}
        </select>
      </label>
  );
}

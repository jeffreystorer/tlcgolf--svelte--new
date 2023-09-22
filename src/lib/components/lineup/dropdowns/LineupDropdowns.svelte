'use client';
import React from 'react';
import {
  PlayingDateDropdown,
  TeeTimeCountDropdown,
  LinkTimeDropdown,
  Progs069Dropdown,
  ProgAdjDropdown,
} from '$lib/components/lineup/dropdowns';

export default function LineupDropdowns() {
  return (
    <>
      <div class='select-dropdown-container'>
        <PlayingDateDropdown />
        <TeeTimeCountDropdown />
      </div>
      <div class='select-dropdown-container'>
        <LinkTimeDropdown />
      </div>
      <div class='select-dropdown-container'>
        <Progs069Dropdown />
        <ProgAdjDropdown />
      </div>
    </>
  );
}

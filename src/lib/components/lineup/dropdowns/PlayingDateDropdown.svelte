'use client';
import React from 'react';
import { useRecoilState } from 'recoil';
import { playingDateOptionItems } from '$lib/components/lineup/optionitems';
import * as state from '$lib/store';

export default function PlayingDateDropdown() {
  const [playingDate, setPlayingDate] = useRecoilState(state.playingDate);

  const handleChange = (event) => {
    setPlayingDate(event.target.value);
  };

  return (
    <select
      class='selector_left'
      value={playingDate}
      on:change={handleChange}>
      <option value='Date'>Playing Date</option>
      {playingDateOptionItems}
    </select>
  );
}

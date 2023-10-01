'use client';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { CancelChangeTeesButton } from '$lib/components/lineup/buttons';
import { courses } from '$lib/components/common/data';
import {
  useUpdatePlayersInLineup,
  useUpdateTeamTables,
} from '$lib/components/common/hooks';
import { useChangeTeesOptionItems } from '$lib/components/lineup/optionitems/hooks';
import { get, buildTeeArray, set } from '$lib/components/common/utils';
import * as _ from 'lodash';
import * as state from '$lib/store';

export default function ChangeTees() {
  const changeTeesOptionItems = useChangeTeesOptionItems();
  const course = useRecoilValue(state.course);
  const setTeesSelected = useSetRecoilState(state.teesSelected);
  const courseIndex = courses.indexOf(course);
  const updateTeamTables = useUpdateTeamTables();
  const updatePlayersInLineup = useUpdatePlayersInLineup();
  const setShowChangeTees = useSetRecoilState(state.showChangeTees);
  let teesSelected = get('teesSelected');
  const defaultValue = buildTeeArray(teesSelected[course]);
  let tees = [];

  function handleSubmit(e) {
    e.preventDefault();
    var sel = document.getElementById('teeSelector');
    var alloptions = sel.options;
    var options = [];
    for (var i = 0, len = alloptions.length; i < len; i++) {
      if (alloptions[i].selected) {
        options = [...options, alloptions[i]];
      }
    }
    Array.from(options).forEach(function (element) {
      const mText = element.text.replace(' (Men only)', '');
      const text = mText.replace(' (Women only)', '');
      tees.push({ label: text, value: element.value });
    });
    teesSelected = { ...teesSelected, [course]: tees };
    set('teesSelected', teesSelected);
    setTeesSelected(teesSelected);
    setShowChangeTees(false);
    updatePlayersInLineup(teesSelected[course]);
    updateTeamTables(teesSelected[course]);
  }

  return (
    <div id='change-tees' class='titled_inner'>
      <h3>Change Tees</h3>
      <form onSubmit={handleSubmit}>
        <select
          defaultValue={defaultValue}
          id='teeSelector'
          name='tees'
          multiple={true}
          size={13}>
          {changeTeesOptionItems(courseIndex)}
        </select>
        <div class='buttons'>
          <button class='not-stacked' type='submit'>
            Change
          </button>
          <CancelChangeTeesButton />
        </div>
      </form>
    </div>
  );
}

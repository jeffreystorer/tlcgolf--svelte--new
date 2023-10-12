<script>
  import * as _ from 'lodash';
  import { course, teesSelected, showChangeTees, playersInLineup, teamTables} from '$lib/store';
  import { CancelChangeTeesButton } from '$lib/components/lineup/buttons';
  import { courses } from '$lib/components/common/data';
  import {
    updatePlayersInLineup,
    updateTeamTables,
  } from '$lib/components/common/utils';
  import { createChangeTeesOptionItems } from '$lib/components/lineup/optionitems/utils';
  import { buildTeeArray, set } from '$lib/components/common/utils';

  const courseIndex = courses.indexOf($course);
  let value = buildTeeArray($teesSelected[$course]);
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
    let _teesSelected = _.cloneDeep($teesSelected)
    _teesSelected[$course] = tees;
    $teesSelected = _teesSelected;
    $showChangeTees = false;
    updatePlayersInLineup();
    updateTeamTables();
    console.log("😊😊 $playersInLineup", $playersInLineup);
    console.log("😊😊 $teamTables", $teamTables);
  }
  let allOptionItems = createChangeTeesOptionItems();
  let optionItems = allOptionItems[courseIndex];
</script>

<div class='titled_inner'>
  <h3>Change Tees</h3>
  <form on:submit={handleSubmit}>
    <select
      multiple
      bind:value={value}
      id='teeSelector'
      name='tees'
      size={13}>
      {#each optionItems as teeItem}
        <option value={teeItem.value}>
          {teeItem.label} {#if teeItem.limit}{teeItem.limit}{/if}
        </option>
      {/each}
    </select>
    <div class='buttons'>
      <button class='not-stacked' type='submit'>
        Change
      </button>
      <CancelChangeTeesButton />
    </div>
  </form>
</div>

<style>
  form {
    margin: 0 auto;
    padding: 0 0.5em 0.5em 0.5em;
    text-align: center;
    width: fit-content;
  }

  select {
    margin: 0.5em auto;
    padding: 0.5em;
    overflow-y: hidden;
  }
</style>

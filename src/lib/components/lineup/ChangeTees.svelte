<script>
  import { course, teesSelected, showChangeTees} from '$lib/store';
  import { CancelChangeTeesButton } from '$lib/components/lineup/buttons';
  import { courses } from '$lib/components/common/data';
  import {
    updatePlayersInLineup,
    updateTeamTables,
  } from '$lib/components/common/utils';
  import { createChangeTeesOptionItems } from '$lib/components/lineup/optionitems/utils';
  import { buildTeeArray, set } from '$lib/components/common/utils';
  import * as _ from 'lodash';
  import { v4 as uuidv4 } from 'uuid';

  const courseIndex = courses.indexOf($course);
  const defaultValue = buildTeeArray($teesSelected[$course]);
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
    $teesSelected = { ...$teesSelected, [course]: tees };
    $showChangeTees = false;
    updatePlayersInLineup();
    updateTeamTables();
  }
  let allOptionItems = createChangeTeesOptionItems();
  let optionItems = allOptionItems[courseIndex];
</script>

<div class='titled_inner'>
  <h3>Change Tees</h3>
  <form on:submit={handleSubmit}>
    <select
      defaultValue={defaultValue}
      id='teeSelector'
      name='tees'
      multiple={true}
      size={13}>
      {#each optionItems as teeItem (uuidv4())}
        <option value={teeItem.value}>
          {teeItem.label} {teeItem?.limit}
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

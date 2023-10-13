  <script>
    import { snapshots, currentLineupIndex } from '$lib/store';
    import { Table } from '$lib/components/export';
    import { get } from '$lib/components/common/utils';

  const ghinNumber = get('ghinNumber') 
    ? get('ghinNumber')
    : '';

  const aLineup = $snapshots[$currentLineupIndex];
  let savedLineup;
  try {
    savedLineup = aLineup.val();
  } catch (error) {
    window.location = '/';
  }
  set('lineup', savedLineup.lineup);
  set('title', savedLineup.title);
  </script>

  <Table />
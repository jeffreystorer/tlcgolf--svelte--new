<script>
    export let data;
    /**
       const items = {
			local: {
			ghinNumber: ghinNumber,
			lastName: lastName,
			dataMode: dataMode,
			},
			captains: captains,
			bets: bets,
			hasSchedule: hasSchedule,
			schedules: schedules,
			foundGolfer: foundGolfer,
			wednesdaySchedules: wednesdaySchedules,
			defaultTeesSelected: defaultTeesSelected,
			groups: groups,
			allPlayersInTable: allPlayersInTable,
			courseData: courseData,
			roster: roster,
	};
    */
    import { goto } from '$app/navigation';
	import { course, group, captains, bets, hasSchedule, schedules, foundGolfer,wednesdaySchedules, defaultTeesSelected, groups, allPlayersInTable, courseData, roster} from '$lib/store';
    import { get, set } from '$lib/components/common/utils/localStorage.js';
    import { sset } from '$lib/components/common/utils/sessionStorage.js';
    import { onMount } from 'svelte';
	$allPlayersInTable = data.items.allPlayersInTable;

    const keys = Object.keys(data.items.local);
    const values = Object.values(data.items.local);
    onMount(() => {
    keys.map((key, index) => set(key, values[index]));
    if (!get('teesSelected')) {
        set('teesSelected', data.items.defaultTeesSelected);
    }
    set('teesSelectedSaturday', data.items.defaultTeesSelected);
    sset('isLoggedIn', true);
	$course = get('course');
	$group = get('group');
	$captains = data.items.captains;
	$bets = data.items.bets;
	$hasSchedule = data.items.hasSchedule;
	$schedules = data.items.schedules;
	$foundGolfer = data.items.foundGolfer;
	$wednesdaySchedules = data.items.wednesdaySchedules;
	$defaultTeesSelected = data.items.defaultTeesSelected;
	$groups = data.items.groups;
	$allPlayersInTable = data.items.allPlayersInTable;
	$courseData = data.items.courseData;
	$roster = roster;
    goto('/lineup');
    });
</script>

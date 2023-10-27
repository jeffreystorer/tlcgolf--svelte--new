<script>
    export let data;
    /**
        	const items = {
		ghinNumber: ghinNumber,
		lastName: lastName,
		dataMode: dataMode,
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
        };
    */
    import { goto } from '$app/navigation';
	import { course, group, groups, captains, courseData, bets} from '$lib/store';
    import { get, remove, set } from '$lib/components/common/utils/localStorage.js';
    import { sset } from '$lib/components/common/utils/sessionStorage.js';
	import { allPlayersInTable } from '$lib/store';
    import { onMount } from 'svelte';
	$allPlayersInTable = data.items.allPlayersInTable;

    const keys = Object.keys(data.items);
    const values = Object.values(data.items);
    onMount(() => {
    keys.map((key, index) => set(key, values[index]));
    if (!get('teesSelected')) {
        set('teesSelected', data.items.defaultTeesSelected);
    }
    set('teesSelectedSaturday', data.items.defaultTeesSelected);
    remove('defaultTeesSelected');
    sset('isLoggedIn', true);
	$course = get('course');
	$group = get('group');
	$bets = data.items.bets;
	$groups = data.items.groups;
	$captains = data.items.captains;
	$courseData = data.items.courseData;
    goto('/lineup');
    });
</script>

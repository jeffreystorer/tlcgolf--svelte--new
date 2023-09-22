<script>
    export let data;
    import { snapshots } from '$lib/store'
    /**
        	const items = {
		//snapshots: snapshots,
		local: {
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
		rawAllPlayersInTable: rawAllPlayersInTable,
		token: token,
		},
	};
        };
    */
    import { goto } from '$app/navigation';
    import { get, remove, set } from '$lib/components/common/utils/localStorage.js';
    import { sset } from '$lib/components/common/utils/sessionStorage.js';
    import { onMount } from 'svelte';

    const keys = Object.keys(data.items.local);
    const values = Object.values(data.items.local);
    onMount(() => {
    keys.map((key, index) => set(key, values[index]));
    if (!get('teesSelected')) {
        set('teesSelected', data.items.local.defaultTeesSelected);
    }
    set('teesSelectedSaturday', data.items.local.defaultTeesSelected);
    remove('defaultTeesSelected');
    sset('isLoggedIn', true);
    //$snapshots = data.items.snapshots;
    goto('/lineup');
    });
</script>

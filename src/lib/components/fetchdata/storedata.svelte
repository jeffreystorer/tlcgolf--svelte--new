<script>
    export let data;
    /**
        data.items= {
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
    */
    import { goto } from '$app/navigation';
    import { get, remove, set } from '$lib/components/common/utils/localStorage.js';
    import { sset } from '$lib/components/common/utils/sessionStorage.js';
    import { onMount } from 'svelte';

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
    goto('/lineup');
    });
</script>

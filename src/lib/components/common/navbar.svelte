<script>
  import { page } from '$app/stores';
  import { get } from '$lib/components/common/utils/localStorage.js'
  let path;
  $: path = $page.url.pathname;

  const routes = [
    {
      path: '/lineup',
      title: 'Lineup',
    },
    {
      path: '/export',
      title: 'Export',
    },
  ];
  
  const ghinNumber = get('ghinNumber');
  const hasSchedule = get('hasSchedule');
  const schedules = get('schedules');
</script>

<header>
  <h1>TLC Golf</h1>
  <nav>
    <ul>
      {#each routes as route}
        <li>
          <a
            class={path === route.path ? 'active' :  'inactive'} 
            href={route.path}>{route.title}
          </a>
        </li>
      {/each}
      <li>
        <p>More...</p> 
          <ul>
            <li><a href='/individual'>Individual</a></li>
            <li><a href='/groups'>Groups</a></li>
            {#if (ghinNumber === '585871')}
              <li><a href='/saturday'>Saturday</a></li>
            {/if}
            <li><a href='/lookup'>Lookup GHIN Information</a></li>
            <div class='divider'></div>
            {#if (hasSchedule)}
              {#each schedules as schedule (schedule.name)}
                <li>
                  <a href={`/viewschedule?id=${schedule.url.split('/')[5]}&gid=${schedule.url.split('/')[6].substring(9)}`}>{schedule.name} Schedule</a>
                </li>
              {/each}
            {/if}                        
            <div class='divider'></div>
            <li>
              <a href='/edittable'>Edit Table</a>
            </li>
            <li>
              <a href='/editbets'>Edit Bets</a>
            </li>
            <li>
              <a href='/editschedules'>Add or Delete a Schedule</a>
            </li>
            <div class='divider'></div>
            <li><a href='/tutorials'>Tutorials</a></li>
            <li><a href='/help'>Help</a></li>
            <div class='divider'></div>
            <li>
              <a href='/signout'>Sign Out</a>
            </li>
          </ul>
      </li>
    </ul>
  </nav>
</header>

 
  


<style>
  nav {
		height: fit-content;
		
		& ul {
		display: flex;
		flex-direction: row;
		background: var(--background-white);
		height: fit-content;
		justify-content: space-around;
		list-style-type: none;
		}
		& li {
		display: inline-block;
		margin: 0 0.5em;
		}
		& a {
		background-color: var(--color-white);
		color: var(--color-black);
		font-family: var(--font-sans-serif);
		font-size: var(--step-0);
		font-weight: 500;
		line-height: 1.5em;
		margin-top: 0;
		outline: 0;
		overflow-wrap: break-word;
		padding: 0 0.5em;
		text-align: center;
		text-decoration: none;
		text-size-adjust: 100%;
		}
		& a:link,
		a:visited {
		color: var(--color-black);
		}
		& a:hover,
		a.inactive:hover {
		background-color: var(--color-link-hover);
		color: var(--color-white);
		}
		& a.active {
		background: var(--color-link-active);
		color: var(--color-white);
		}
		& a.inactive {
		background: var(--color-white);
		color: var(--color-black);
		}
    & ul > li:last-of-type {
      position: relative;
      display: inline-block;
    }
    & ul > li:last-of-type > ul {
      display: none;
      position: absolute;
      background-color: var(--background-button);
      margin-left: -11.5em;      
      padding: 0.75em 1em;
      width: 16em;
      z-index: 2;
    }
    & ul > li:last-of-type:hover ul {
      display: flex;
      flex-direction: column;
      text-align: left;
    }
    
    & ul > li:last-of-type ul > li > button,
    & ul > li:last-of-type ul > li > a {
      background-color: var(--background-button);
      border: none;
      font-size: inherit;
      font-weight: normal;
      text-align: left;
    }
    
    & ul > li:last-of-type ul > li > a:hover{
		background-color: var(--color-link-hover);
		color: var(--color-white);
		}
    
    & ul > li:last-of-type ul div + li {
      font-weight: 700;
    }
  }


</style>
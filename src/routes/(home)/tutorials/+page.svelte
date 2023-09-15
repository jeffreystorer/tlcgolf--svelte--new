<script>
  export let data;
  import setTutorials from './setTutorials';
  const tutorialValues = setTutorials(data.tutorials.values);
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { sget } from '$lib/components/common/utils';
  const isLoggedIn = sget('isLoggedIn');
  onMount(() => {
    if (!isLoggedIn) {
      goto('/');
    }
  });

  function handleClick(e) {
    e.preventDefault();
    const details = document.getElementById('details');
    details.removeAttribute('open');
    const href = e.target.hash;
    const id = href.slice(1);
    const link = document.getElementById(id);
    link.scrollIntoView();
  }
</script>

    <div id='tutorials'>
      <h2>Tutorials</h2>
      <details id='details'>
        <summary>Table of Contents</summary>
        <ul>
          <li>
            <a on:cllck={handleClick} href='#0'>
              Creating and Sending Out a Lineup
            </a>
          </li>
          <li>
            <a on:cllck={handleClick} href='#1'>
              Automatically Assigning Players to Teams
            </a>
          </li>
          <li>
            <a on:cllck={handleClick} href='#2'>
              Adding a Guest
            </a>
          </li>
        </ul>
      </details>
      {#each tutorialValues as tutorial, index (index)}
            <h3 id={index}>
              {tutorial.title}
            </h3>
            <div class='iframe'>
              <iframe
                src={tutorial.link + '?skipIntro=true'}
                width='640'
                height='360'
                frameBorder='0'
                title={tutorial.title}></iframe>
            </div>
      {/each}
    </div>

    <style>
			#tutorials h2 {
				font-size: var(--step-1);
				font-weight: 700;
				text-align: center;
			}

			#tutorials h3 {
				font-size: var(--step-1);
				font-weight: 700;
				text-align: center;
			}
			#tutorials details summary {
				font-size: var(--step-0);
			}
			#tutorials details ul {
				margin-left: 1em;
				text-align: left;
			}
			#tutorials summary {
				font-style: italic;
			}
    </style>

<script>
    export let showOnPx = 150;
    let hidden = true;
  
    function goTop() {
      document.body.scrollIntoView();
    }
  
    function scrollContainer() {
      return document.documentElement || document.body;
    }
  
    function handleOnScroll() {
      if (!scrollContainer()) {
        return;
      }
  
      if (scrollContainer().scrollTop > showOnPx) {
        hidden = false;
      } else {
        hidden = true;
      }
    }
  </script>
  
  <style>

    #backToTop {
	display:block;
	position:sticky;
	z-index:600;
	bottom:0;
	width:4rem;
	height:4rem;
	padding-bottom:1rem;
	margin:-3.5rem 0 0 auto;
	opacity:0.6;
	transition:opacity 0.3s;
}

#backToTop.hidden {
	opacity:0;
    visibility: hidden;
}

#backToTop:not(.hidden):focus,
#backToTop:not(.hidden):hover {
	opacity:1;
}

#backToTop:after {
	content:"^";
	position:relative;
	display:block;
	width:2.5rem;
	height:2.5rem;
	text-align:center;
	font-size: 4rem;
	border-radius:50%;
	color:var(--heroBgColor);
	background:var(--heroColor);
}
  </style>
  
  <svelte:window on:scroll={handleOnScroll} />
  
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div id="backToTop" on:click={goTop} class:hidden></div>
  
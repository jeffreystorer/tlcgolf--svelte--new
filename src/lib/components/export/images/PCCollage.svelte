<script>
    export let pcSetting;
    import PhotoSwipeGallery from "svelte-photoswipe";
    const images = pcSetting.images;
  </script>
  
  <PhotoSwipeGallery {images} styling="grid" gridColumns={pcSetting.columns} />
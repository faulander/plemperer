<script>
  import Ausgaben from "$lib/components/Ausgaben.svelte";
  import Eingaben from "$lib/components/Eingaben.svelte";
  export let data;
</script>

<div class="bg-slate-200 container mx-auto p-2 mt-2 mb-2 rounded-md shadow-lg">
  <div class="" />
  <div class=""><Eingaben {data} /></div>
  <div class="">ausgaben</div>
</div>

<style>
</style>

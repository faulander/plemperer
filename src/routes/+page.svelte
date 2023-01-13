<script>
  import Eingaben from "$lib/components/Eingaben.svelte";
  import Statistik from "$lib/components/Statistik.svelte";
  export let data;
  const flat = data.flat;
</script>

<div class="bg-slate-200 container mx-auto p-2 mt-2 mb-2 rounded-md shadow-lg">
  <div class="" />
  <div class=""><Eingaben {data} /></div>
  <div class="grid grid-cols-8 gap-3">
    <div class="col-span-5">ausgaben</div>
    <div class="col-span-3"><Statistik data={flat} /></div>
  </div>
</div>

<style>
</style>

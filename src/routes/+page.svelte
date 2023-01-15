<script>
  import Eingaben from "$lib/components/Eingaben.svelte";
  import Ausgaben from "$lib/components/Ausgaben.svelte";
  import Statistik from "$lib/components/Statistik.svelte";
  export let data;
</script>

<div class="bg-slate-200 container mx-auto p-2 mt-2 mb-2 rounded-md shadow-lg">
  <div class=""><Eingaben {data} /></div>
  <div class="grid lg:grid-cols-8 lg:gap-3 mx-auto w-full">
    <div class="lg:col-span-5"><Ausgaben {data} /></div>
    <div class="lg:col-span-3"><Statistik {data} /></div>
  </div>
</div>

<style>
</style>

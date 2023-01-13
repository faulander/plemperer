<script>
    export let data;
    //console.log("Data on Statistik.svelte: ", data);
    const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    });
</script>

<div class="grid grid-cols-3">
    <div class="col-span-3">Ausgaben im aktuellen Monat:</div>
    {#each data as stat}
        <div class="">{stat.hauptkategorie}</div>
        <div class="">{stat.subkategorie}</div>
        <div class="text-right pr-2">{formatter.format(stat.summe * -1)}</div>
    {/each}
</div>

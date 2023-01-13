<script>
    export let data;
    //console.log("Data on Statistik.svelte: ", data);
    const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    });
    let gesamt = 0;
    data.forEach((el) => {
        gesamt += Math.abs(el.summe);
    });

    $: data = data;
</script>

<div class="grid grid-cols-3 bg-slate-100 rounded-md p-2">
    <div class="col-span-3 mb-2">Ausgaben im aktuellen Monat:</div>
    {#each data as stat, index}
        <div class=" pl-2">
            {stat.hauptkategorie}
        </div>
        <div class="">
            {stat.subkategorie}
        </div>
        <div class="text-right pr-2">
            {formatter.format(stat.summe * -1)}
        </div>
    {/each}
    <div class="pl-2 col-span-2">GESAMT</div>
    <div class="text-right pr-2">{formatter.format(gesamt)}</div>
</div>

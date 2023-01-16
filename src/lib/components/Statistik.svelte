<script>
    export let data;
    const flat = data.flat;
    const flatHaupt = data.flatHaupt;
    //console.log("Data on Statistik.svelte: ", data);
    const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    });

    function toggleHaupt() {
        nurHaupt = !nurHaupt;
    }

    let gesamt = 0;
    flat.forEach((el) => {
        gesamt += Math.abs(el.summe);
    });

    flat.sort((a, b) => a.summe - b.summe);

    let nurHaupt = false;

    $: {
        nurHaupt = nurHaupt;
        //cl({ nurHaupt });
    }
</script>

<div class="grid grid-cols-3 bg-slate-100 rounded-md p-2 text-xs">
    <div class="col-span-2 mb-2">Ausgaben im aktuellen Monat</div>
    <div class="col-span-1 mb-2 text-right">
        <div class="flex items-center justify-center w-full">
            <label for="toogleA" class="flex items-center cursor-pointer">
                <div class="relative">
                    <input
                        bind:checked={nurHaupt}
                        id="toogleA"
                        type="checkbox"
                        class="sr-only"
                    />
                    <div
                        class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"
                    />
                    <div
                        class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"
                    />
                </div>
                <div class="ml-3 text-gray-700 font-medium">
                    Hauptkategorien
                </div>
            </label>
        </div>
    </div>
    {#if !nurHaupt}
        {#each flat as stat, index}
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
        <div class="pl-2 col-span-2 font-semibold mt-1">GESAMT</div>
        <div class="text-right pr-2 font-semibold mt-1">
            {formatter.format(gesamt)}
        </div>
    {:else}
        {#each flatHaupt as stat, index}
            <div class="col-span-2 pl-2">
                {stat.hauptkategorie}
            </div>
            <div class="text-right pr-2">
                {formatter.format(stat.summe * -1)}
            </div>
        {/each}
        <div class="pl-2 col-span-2 font-semibold mt-1">GESAMT</div>
        <div class="text-right pr-2 font-semibold mt-1">
            {formatter.format(gesamt)}
        </div>
    {/if}
</div>

<style>
    input:checked ~ .dot {
        transform: translateX(100%);
        background-color: rgb(21, 128, 61);
    }
</style>

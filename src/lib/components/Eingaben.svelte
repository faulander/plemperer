<script>
    import Svelecte from "svelecte";
    export let data;
    //console.log("data: ", data);

    let hauptKategorieChosen;
    let supKategorieChosen;
    let supKategorienFiltered;
    let subKategorien = data.subkategorien;
    let datumChosen = new Date().toISOString().split("T")[0];
    let wertChosen;
    let artChosen;
    let memoChosen;

    $: {
        artChosen = artChosen;
        hauptKategorieChosen = hauptKategorieChosen;
        supKategorienFiltered = subKategorien.filter(
            (el) => el.hauptkategorie === hauptKategorieChosen
        );
        subKategorien = subKategorien;
        if (wertChosen < 0) {
            artChosen = 1;
        } else {
            artChosen = 2;
        }
    }

    async function saveData() {
        const response = await fetch("/api/db", {
            method: "POST",

            body: JSON.stringify({
                wert: wertChosen,
                hauptkategorie: hauptKategorieChosen,
                subkategorie: supKategorieChosen,
                art: artChosen,
                memo: memoChosen,
                datum: datumChosen,
            }),
        });
        hauptKategorieChosen = undefined;
        supKategorieChosen = undefined;
        memoChosen = undefined;
        artChosen = undefined;
        wertChosen = undefined;
    }
</script>

<div class="bg-slate-100 container mx-auto p-2 mt-2 mb-2 rounded-md shadow-lg">
    <div
        class="grid grid-cols-1 sm:grid-cols-5 sm:gap-1 md:grid-cols-12 border-green-700 border rounded p-2 md:gap-y-2 md:gap-1"
    >
        <div
            class="sm:col-span-2 md:col-span-2 lg:col-span-2 w-full col-span-1"
        >
            <label for="datum">Datum</label>
            <input
                bind:value={datumChosen}
                class="w-full h-[38px] border border-slate-300 pl-1"
                type="date"
                inputId="datum"
            />
        </div>
        <div class="w-full sm:col-span-1 md:col-span-2 md:mr-2 lg:col-span-2">
            <label for="eingaben_ausgaben">€</label>
            <input
                bind:value={wertChosen}
                class="w-full h-[38px] border border-slate-300 pl-2 focus:border-slate-800 active:border-slate-800"
                type="number"
                inputId="eingaben_ausgaben"
            />
        </div>
        <div class="w-full  sm:col-span-2 md:col-span-2: lg:col-span-2">
            <label for="art">Ausgabeart</label>
            <Svelecte
                options={data.arten}
                bind:value={artChosen}
                inputId="art"
            />
        </div>

        <div class=" sm:col-span-2 col-span-1 md:col-span-6 lg:col-span-3">
            <label for="hauptkategorie">Hauptkategorie</label>
            <Svelecte
                options={data.hauptkategorien}
                bind:value={hauptKategorieChosen}
                inputId="hauptkategorie"
            />
        </div>
        <div class="md:col-span-4 sm:col-span-3 col-span-1 lg:col-span-3">
            <label for="subkategorie">Subkategorie</label>
            <Svelecte
                options={supKategorienFiltered}
                bind:value={supKategorieChosen}
                inputId="subkategorie"
            />
        </div>
        <div class="lg:col-span-10 md:col-span-8 sm:col-span-5">
            <label for="memo">Notiz</label>
            <input
                bind:value={memoChosen}
                class="h-[38px] w-full pl-2"
                type="text"
                inputId="notiz"
            />
        </div>
        <div class="grid lg:col-span-2 md:col-span-4 md:ml-2 mt-2 md:items-end">
            {#if wertChosen > 0 || wertChosen < 0}
                <button
                    on:click={saveData}
                    class="w-full h-[38px] rounded-lg bg-green-700 text-slate-200 hover:bg-green-900 hover:text-slate-100"
                    >Speichern</button
                >
            {:else}
                <button
                    class="w-full  h-[38px] rounded-lg bg-orange-600 text-slate-200"
                    >Speichern</button
                >
            {/if}
        </div>
    </div>
</div>

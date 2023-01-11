<script>
    import Svelecte from "svelecte";
    export let data;
    console.log("data: ", data);

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
        console.log("wertChosen: ", wertChosen);
        console.log("hauptKategorieChosen: ", hauptKategorieChosen);
        console.log("supKategorieChosen: ", supKategorieChosen);
        console.log("artChosen: ", artChosen);
        console.log("memoChosen: ", memoChosen);
        console.log("datumChosen: ", datumChosen);

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

<div class="bg-slate-200 container mx-auto p-2 mt-2 mb-2 rounded-md shadow-lg">
    <div
        class="grid grid-cols-12 border-green-700 border rounded p-2 gap-y-2 gap-1"
    >
        <div class=" mr-2 col-span-4">
            <label for="eingaben_ausgaben">Wert</label>
            <input
                bind:value={wertChosen}
                class="w-full h-[38px] border border-slate-300 pl-2 focus:border-slate-800 active:border-slate-800"
                type="number"
                inputId="eingaben_ausgaben"
            />
        </div>
        <div class="col-span-4">
            <label for="hauptkategorie">Hauptkategorie</label>
            <Svelecte
                options={data.hauptkategorien}
                bind:value={hauptKategorieChosen}
                inputId="hauptkategorie"
            />
        </div>
        <div class="col-span-4">
            <label for="subkategorie">Subkategorie</label>
            <Svelecte
                options={supKategorienFiltered}
                bind:value={supKategorieChosen}
                inputId="subkategorie"
            />
        </div>
        <div class="col-span-3 w-full">
            <label for="datum">Datum</label>
            <input
                bind:value={datumChosen}
                class="w-full h-[38px] border border-slate-300 "
                type="date"
                inputId="datum"
            />
        </div>
        <div class="w-full col-span-2">
            <label for="art">Ausgabeart</label>
            <Svelecte
                options={data.arten}
                bind:value={artChosen}
                inputId="art"
            />
        </div>
        <div class="col-span-5">
            <label for="memo">Notiz</label>
            <input
                bind:value={memoChosen}
                class="h-[38px] w-full border border-slate-300 pl-2 focus:border-slate-800 active:border-slate-800"
                type="text"
                inputId="notiz"
            />
        </div>
        <div class="col-span-2 ml-2">
            {#if wertChosen > 0 || wertChosen < 0}
                <button
                    on:click={saveData}
                    class="w-full h-full rounded-lg bg-green-700 text-slate-200 hover:bg-green-900 hover:text-slate-100"
                    >Speichern</button
                >
            {:else}
                <button
                    class="w-full h-full rounded-lg bg-orange-600 text-slate-200"
                    >Speichern</button
                >
            {/if}
        </div>
    </div>
</div>

<style>
</style>

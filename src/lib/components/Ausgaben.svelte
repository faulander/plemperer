<script>
    //TODO:Table component
    export let data;
    const hauptkategorien = data.hauptkategorien;
    const subkategorien = data.subkategorien;
    const arten = data.arten;
    const ausgaben = data.ausgaben;

    const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    });

    let ausTab = [];
    ausgaben.forEach((e) => {
        const artId = e.art;
        const subId = e.subkategorie;
        const hauptArray = subkategorien.filter(
            (e) => e.subkategorie_id === subId
        );
        const hauptId = hauptArray[0].hauptkategorie;
        const subFiltered = subkategorien.filter(
            (e) => e.subkategorie_id === subId
        );
        const hauptFiltered = hauptkategorien.filter(
            (e) => e.hauptkategorie_id === hauptId
        );

        ausTab.push({
            id: e.id,
            wert: e.wert,
            datum: e.datum,
            subkategorie: subFiltered[0].name,
            hauptkategorie: hauptFiltered[0].name,
            memo: e.memo,
        });
    });
    ausTab.sort((a, b) => {
        let da = new Date(a.datum);
        let db = new Date(b.datum);
        return db - da;
    });
</script>

<div class="grid gap-x-2 grid-cols-12 bg-slate-100 rounded-md p-2 text-xs">
    <div class="col-span-2 font-semibold mb-1">Datum</div>
    <div class="col-span-2 font-semibold">Hauptkategorie</div>
    <div class="pl-2 col-span-4 font-semibold">Subkategorie</div>
    <div class="col-span-2 font-semibold">Notiz</div>
    <div class="col-span-2 text-right font-semibold">Wert</div>
    {#each ausTab as a}
        <div class="col-span-2">{a.datum}</div>
        <div class="col-span-2">{a.hauptkategorie}</div>
        <div class="pl-2 col-span-4">{a.subkategorie}</div>
        <div class="col-span-2">{a.memo}</div>
        <div class="col-span-2 text-right">{formatter.format(a.wert)}</div>
    {/each}
</div>

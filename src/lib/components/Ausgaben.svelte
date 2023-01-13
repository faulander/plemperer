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
    console.log(ausTab);
</script>

<div class="grid gap-x-2 grid-cols-12 bg-slate-100 rounded-md p-2 text-xs">
    {#each ausTab as a}
        <div class="col-span-2">{a.datum}</div>
        <div class="col-span-2">{a.hauptkategorie}</div>
        <div class="pl-2 col-span-4">{a.subkategorie}</div>
        <div class="col-span-2">{a.memo}</div>
        <div class="col-span-2 text-right">{formatter.format(a.wert)}</div>
    {/each}
</div>

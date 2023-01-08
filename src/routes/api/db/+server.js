import { getOrCreateDB, saveDataToDB } from "$lib/database.js";

const db = await getOrCreateDB()
//console.log("db after calling getOrCreateDB: ", db)

export async function GET({url}) {
  const haupt = await db.prepare('SELECT * FROM hauptkategorie').all()
  const sub = await db.prepare('SELECT * FROM subkategorie').all()
  const art = await db.prepare('SELECT * FROM art').all()
  const aus = await db.prepare('SELECT * FROM ausgaben').all()

  const data = {
    hauptkategorien: haupt,
    subkategorien: sub,
    arten: art,
    ausgaben: aus
  }
  return new Response(JSON.stringify(data))
}

export async function POST({request}) {
  const data = await request.json()
  console.log("request: ", data)
  const info = saveDataToDB(data.wert, data.subkategorie, data.art, data.memo, data.datum)
  return new Response
}
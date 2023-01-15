import { getCurrentMonth } from '$lib/components/helpers.js';
import { getOrCreateDB, saveDataToDB } from "$lib/database.js";

const db = await getOrCreateDB()
//console.log("db after calling getOrCreateDB: ", db)

export async function GET({url}) {
  const haupt = await db.prepare('SELECT * FROM hauptkategorie').all()
  const sub = await db.prepare('SELECT * FROM subkategorie').all()
  const art = await db.prepare('SELECT * FROM art').all()
  const aus = await db.prepare('SELECT * FROM ausgaben').all()

  const [startOfMonth, endOfMonth] = getCurrentMonth()
  const stmt = `
  SELECT SUM(wert) AS summe, hauptkategorie.name AS hauptkategorie, subkategorie.name AS subkategorie FROM ausgaben
  LEFT JOIN subkategorie
    ON ausgaben.subkategorie = subkategorie.subkategorie_id
  LEFT JOIN hauptkategorie
    ON subkategorie.hauptkategorie = hauptkategorie.hauptkategorie_id
  LEFT JOIN art
    ON ausgaben.art = art.art_id
  WHERE ausgaben.datum BETWEEN '${startOfMonth}' AND '${endOfMonth}'
  GROUP BY ausgaben.subkategorie  
  `
  const flat = await db.prepare(stmt).all()

  const stmtHaupt = `
  SELECT SUM(wert) AS summe, hauptkategorie.name AS hauptkategorie  FROM ausgaben
  LEFT JOIN subkategorie
    ON ausgaben.subkategorie = subkategorie.subkategorie_id
  LEFT JOIN hauptkategorie
    ON subkategorie.hauptkategorie = hauptkategorie.hauptkategorie_id
  LEFT JOIN art
    ON ausgaben.art = art.art_id
  WHERE ausgaben.datum BETWEEN '${startOfMonth}' AND '${endOfMonth}'
  GROUP BY hauptkategorie
  `  

  const flatHaupt = db.prepare(stmtHaupt).all()

  const data = {
    hauptkategorien: haupt,
    subkategorien: sub,
    arten: art,
    ausgaben: aus,
    flat: flat,
    flatHaupt: flatHaupt
  }
  return new Response(JSON.stringify(data))
}

export async function POST({request}) {
  const data = await request.json()
  //console.log("request: ", data)
  const info = saveDataToDB(data.wert, data.subkategorie, data.art, data.memo, data.datum)
  return new Response
}
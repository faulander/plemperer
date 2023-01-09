import Database from 'better-sqlite3'
let db

async function createTables(db) {

  const hauptkategorieTableCreate = `CREATE TABLE hauptkategorie (
    hauptkategorie_id INTEGER   PRIMARY KEY AUTOINCREMENT,
    name              TEXT      NOT NULL
  )`

  const artTableCreate = `CREATE TABLE art (
    art_id            INTEGER   PRIMARY KEY AUTOINCREMENT,
    name              TEXT      NOT NULL
  )`

  const supkategorieTableCreate = `CREATE Table subkategorie (
    subkategorie_id   INTEGER   PRIMARY KEY AUTOINCREMENT,
    name              TEXT      NOT NULL,
    hauptkategorie    INTEGER,

    FOREIGN KEY (hauptkategorie) REFERENCES hauptkategorie (hauptkategorie_id) ON DELETE CASCADE ON UPDATE NO ACTION
  )`

  const ausgabenTableCreate = `CREATE TABLE ausgaben (
    id                INTEGER    PRIMARY KEY AUTOINCREMENT,
    datum             DATE,
    wert              REAL       NOT NULL,
    memo              TEXT,
    art               INTEGER,
    subkategorie      INTEGER,

    FOREIGN KEY (art) REFERENCES art (art_id) ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (subkategorie) REFERENCES subkategorie (subkategorie_id) ON DELETE CASCADE ON UPDATE NO ACTION
  )`  
    
    db.prepare(hauptkategorieTableCreate).run()
    db.prepare(artTableCreate).run()
    db.prepare(supkategorieTableCreate).run()
    db.prepare(ausgabenTableCreate).run()
  }

export async function getOrCreateDB() {
  try {
    db = new Database('Plemperer.db', { verbose: console.log, fileMustExist: true });
  } catch (err) {
    db = new Database('Plemperer.db', { verbose: console.log });
    createTables(db)
    
    db.prepare(`INSERT INTO art (name) VALUES(?)`).run("Ausgabe")
    db.prepare(`INSERT INTO art (name) VALUES(?)`).run("Einnahme")
    db.prepare(`INSERT INTO hauptkategorie (name) VALUES(?)`).run("WOHNEN")
    db.prepare(`INSERT INTO hauptkategorie (name) VALUES(?)`).run("HAUSHALT")
    db.prepare(`INSERT INTO hauptkategorie (name) VALUES(?)`).run("TRANSPORT")
    db.prepare(`INSERT INTO hauptkategorie (name) VALUES(?)`).run("FREIZEIT")
    db.prepare(`INSERT INTO hauptkategorie (name) VALUES(?)`).run("SCHULE, STUDIUM, ARBEIT")
    db.prepare(`INSERT INTO hauptkategorie (name) VALUES(?)`).run("GESUNDHEIT")
    db.prepare(`INSERT INTO hauptkategorie (name) VALUES(?)`).run("SONSTIGES")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(1, "Miete")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(1, "Nebenkosten")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(1, "Anschaffung & Reparatur")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(1, "Telekommunikation")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(1, "Sonstiges")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(2, "Lebensmittel & Getränke")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(2, "Verbrauchsmaterialien")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(2, "Hygiene & Friseur")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(2, "Sonstiges")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(3, "öffentlicher Transport")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(3, "Auto")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(3, "Flug & Bahn")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(3, "Sonstiges")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(4, "Auswärts essen & trinken")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(4, "Kino, Theater, etc.")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(4, "Hobbies & Haustiere")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(4, "Bücher, Zeitschriften, Musik, Spiele")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(4, "Urlaub")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(4, "Sonstiges")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(5, "Fachbücher und -zeitschriften")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(5, "Computer")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(5, "Sonstiges")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(6, "Arzt")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(6, "Medikamente")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(6, "Therapien")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(6, "Sonstiges")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(7, "Kontogebühren")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(7, "Versicherungen")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(7, "Kreditraten")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(7, "Kontogebühren")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(7, "Bekleidung")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(7, "Geschenke")
    db.prepare(`INSERT INTO subkategorie (hauptkategorie, name) VALUES(?,?)`).run(7, "Sonstiges")
  }
  console.log("db after getOrCreateDB: ", db)
  return db
}

export async function saveDataToDB(wert, sub, art, memo, datum) {  
  const db = await getOrCreateDB();
  console.log("wert: ", wert)
  console.log("sub: ", sub)
  console.log("art: ", art)
  console.log("memo: ", memo)
  console.log("datum: ", datum)
  const stmt = db.prepare("INSERT INTO ausgaben (datum, wert, memo, art, subkategorie) VALUES (?,?,?,?,?)")
  const info = stmt.run(datum, wert, memo, art, sub)
  return info.changes
}
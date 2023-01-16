export function getMigrations() {
    let migrations = []
    migrations[0] = {
        0:"ALTER TABLE hauptkategorie ADD COLUMN budget INTEGER",
        1:"ALTER TABLE subkategorie ADD COLUMN budget INTEGER"
}
    return migrations    
}
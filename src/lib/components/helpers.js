export function getCurrentMonth() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return [firstDay.toISOString().split("T")[0], lastDay.toISOString().split("T")[0]]
}

export function cl(dict) {
    const name = Object.keys(dict)[0];
    const value = dict[name]
    console.log(`${name}: `, value)
}

export function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
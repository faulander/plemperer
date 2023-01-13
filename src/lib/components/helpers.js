export function getCurrentMonth() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return [firstDay.toISOString().split("T")[0], lastDay.toISOString().split("T")[0]]
}
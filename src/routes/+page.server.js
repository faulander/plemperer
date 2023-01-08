/** @type {import('./$types').PageServerLoad} */

export async function load({ fetch }) {
  const response = await fetch('/api/db')
  const data = await response.json()
  if (data) {
    return data;
  }
 
  throw error(404, 'No data from database');
}
<script context="module">
	import { PrismaClient } from '@prisma/client';
	const prisma = new PrismaClient();

	export async function load({}) {
		const kategorien = await prisma.kategorie.findMany();
		const ausgaben = await prisma.ausgabe.findMany();

		return {
			props: {
				kategorien,
				ausgaben
			}
		};
	}
</script>

<script>
	export let kategorien;
	export let ausgaben;
</script>

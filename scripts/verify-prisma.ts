import prisma from "../lib/prisma";

async function main(): Promise<void> {
  const count = await prisma.user.count();
  console.log(`✅ Connected to Supabase Postgres (${count} user${count === 1 ? "" : "s"})`);
}

main()
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

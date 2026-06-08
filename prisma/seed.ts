import prisma from "../lib/prisma";

async function main(): Promise<void> {
  await Promise.all([
    prisma.user.upsert({
      where: { email: "alice@aktie-tracker.dev" },
      update: {},
      create: {
        email: "alice@aktie-tracker.dev",
        name: "Alice",
      },
    }),
    prisma.user.upsert({
      where: { email: "bob@aktie-tracker.dev" },
      update: {},
      create: {
        email: "bob@aktie-tracker.dev",
        name: "Bob",
      },
    }),
  ]);

  console.log("Seeded 2 users.");
}

main()
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

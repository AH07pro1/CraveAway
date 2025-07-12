const { PrismaClient } = require('../app/generated/prisma');
const prisma = new PrismaClient();




const cravingTypes = [
  "food",
  "smoke",
  "drink",
  "cigarette",
  "vape",
  "weed",
  "cocaine",
  "heroin",
  "other",
];

async function main() {
  for (const name of cravingTypes) {
    await prisma.cravingType.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log('Seeding complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

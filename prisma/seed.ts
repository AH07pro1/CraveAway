import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const builtInTypes = ['food', 'smoke', 'drink', 'cigarette'];

  for (const name of builtInTypes) {
    const type = await prisma.cravingType.upsert({
      where: { name },
      update: {},
      create: {
        name,
        isCustom: false,
        userId: null,
      },
    });
    console.log(`✅ Inserted built-in type: ${name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

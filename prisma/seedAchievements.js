// prisma/seedAchievements.js
const { PrismaClient } = require('../app/generated/prisma');
const prisma = new PrismaClient();

const achievements = [
  {
    title: 'Level 5 Achiever',
    description: 'Reach level 5',
    type: 'XP',
    value: 50,
    xpReward: 10,
  },
  {
    title: 'First Craving',
    description: 'Log your first craving',
    type: 'CRAVING',
    value: 1,
    xpReward: 5,
  },
  {
    title: 'Resolver',
    description: 'Resolve 5 cravings',
    type: 'RESOLVED_CRAVING',
    value: 5,
    xpReward: 10,
  },
];

async function main() {
  for (const ach of achievements) {
    await prisma.achievement.upsert({
  where: { title: ach.title },  // title is now unique
  update: {},
  create: ach,
});
  }
  console.log('Achievements seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

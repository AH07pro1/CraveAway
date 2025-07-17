const { PrismaClient } = require('../app/generated/prisma');
const prisma = new PrismaClient();

const achievements = [
  { title: 'Level 5 Achiever', description: 'Reach level 5', type: 'XP', value: 50, xpReward: 10 },
  { title: 'First Craving', description: 'Log your first craving', type: 'CRAVING', value: 1, xpReward: 5 },
  { title: 'Resolver', description: 'Resolve 5 cravings', type: 'RESOLVED_CRAVING', value: 5, xpReward: 10 },

  { title: 'Craving Logger', description: 'Log 10 cravings', type: 'CRAVING', value: 10, xpReward: 10 },
  { title: 'Craving Master', description: 'Log 50 cravings', type: 'CRAVING', value: 50, xpReward: 25 },
  { title: 'Quick Resolver', description: 'Resolve a craving within 5 minutes', type: 'FAST_RESOLUTION', value: 1, xpReward: 10 },
  { title: 'Daily Starter', description: 'Use the app 3 days in a row', type: 'STREAK', value: 3, xpReward: 15 },
  { title: 'Weekly Warrior', description: 'Use the app 7 days in a row', type: 'STREAK', value: 7, xpReward: 25 },
  { title: 'XP Collector I', description: 'Earn 100 XP', type: 'XP', value: 100, xpReward: 10 },
  { title: 'XP Collector II', description: 'Earn 500 XP', type: 'XP', value: 500, xpReward: 30 },
  { title: 'New Habit', description: 'Resist 3 cravings', type: 'RESISTED_CRAVING', value: 3, xpReward: 10 },
  { title: 'Strong Mind', description: 'Resist 10 cravings', type: 'RESISTED_CRAVING', value: 10, xpReward: 25 },
  { title: 'Reflection Time', description: 'Complete 1 journal entry', type: 'JOURNAL', value: 1, xpReward: 5 },
  { title: 'Writing Streak', description: 'Write 5 journal entries', type: 'JOURNAL', value: 5, xpReward: 15 },
  { title: 'Supportive', description: 'Give 1 piece of feedback', type: 'FEEDBACK', value: 1, xpReward: 5 },
  { title: 'Helper', description: 'Give 5 pieces of feedback', type: 'FEEDBACK', value: 5, xpReward: 20 },
  { title: 'Milestone Reached', description: 'Reach level 10', type: 'XP', value: 100, xpReward: 20 },
  { title: 'Veteran User', description: 'Use the app for 30 days', type: 'DAYS_ACTIVE', value: 30, xpReward: 40 },
  { title: 'No Cravings Today!', description: 'Finish a day with 0 cravings', type: 'NO_CRAVINGS_DAY', value: 1, xpReward: 15 },
  { title: 'Double Resolver', description: 'Resolve 2 cravings in one day', type: 'DAILY_RESOLVED_CRAVINGS', value: 2, xpReward: 10 },
];

async function main() {
  for (const ach of achievements) {
    await prisma.achievement.upsert({
      where: { title: ach.title }, // assuming title is unique
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

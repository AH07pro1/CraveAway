import prisma from './lib/prisma';

async function test() {
  try {
    await prisma.userProgress.upsert({
      where: { userId: 'test-user' },
      update: { photoUrl: 'https://example.com', message: 'test' },
      create: { userId: 'test-user', photoUrl: 'https://example.com', message: 'test' },
    });
    console.log('Upsert worked with photoUrl field!');
  } catch (error) {
    console.error('Upsert failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();

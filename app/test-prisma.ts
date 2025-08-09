// test-prisma.ts
import prisma from "./backend/lib/prisma";

async function testUpsert() {
  try {
    const res = await prisma.userProgress.upsert({
      where: { userId: 'user_2ztNz1QkA4i3kDRUKHIUldj2MD0' },
      update: { committed: true, message: 'test', photoUrl: 'https://example.com/photo.jpg' },
      create: { userId: 'user_2ztNz1QkA4i3kDRUKHIUldj2MD0', committed: true, message: 'test', photoUrl: 'https://example.com/photo.jpg' },
    });
    console.log('Upsert success:', res);
  } catch (e) {
    console.error('Upsert error:', e);
  }
}

testUpsert();

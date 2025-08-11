// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '../../generated/prisma'; // i made the backend server run by changing the prisma client import path
const prisma = new PrismaClient();



console.log('🚀 Starting test...');

async function testConnection() {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Prisma is working. Result:', result);
  } catch (error) {
    console.error('❌ Prisma error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

export default prisma;





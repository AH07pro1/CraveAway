const { PrismaClient } = require('../app/generated/prisma'); // Adjust path if needed
const prisma = new PrismaClient();

async function testConnection() {
  try {
    const cravingTypes = await prisma.cravingType.findMany();
    console.log("Craving Types in DB:", cravingTypes);
  } catch (error) {
    console.error("Error querying DB:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

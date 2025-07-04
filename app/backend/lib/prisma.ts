// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '../../generated/prisma'; // i made the backend server run by changing the prisma client import path
const prisma = new PrismaClient();

export default prisma;
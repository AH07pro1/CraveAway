"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { PrismaClient } from '@prisma/client';
var prisma_1 = require("../../generated/prisma"); // i made the backend server run by changing the prisma client import path
var prisma = new prisma_1.PrismaClient();
console.log('Stating test...');
exports.default = prisma;

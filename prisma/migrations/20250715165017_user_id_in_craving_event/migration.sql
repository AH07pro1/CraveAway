/*
  Warnings:

  - Added the required column `userId` to the `CravingEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CravingEvent" ADD COLUMN     "userId" TEXT NOT NULL;

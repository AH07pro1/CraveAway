/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `CravingType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "CravingType_userId_idx" ON "CravingType"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CravingType_name_userId_key" ON "CravingType"("name", "userId");

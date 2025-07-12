/*
  Warnings:

  - You are about to drop the column `type` on the `CravingEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CravingEvent" DROP COLUMN "type",
ADD COLUMN     "typeId" INTEGER;

-- CreateTable
CREATE TABLE "CravingType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isCustom" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CravingType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CravingType_name_key" ON "CravingType"("name");

-- AddForeignKey
ALTER TABLE "CravingEvent" ADD CONSTRAINT "CravingEvent_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "CravingType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

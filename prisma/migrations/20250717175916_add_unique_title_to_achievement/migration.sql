/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Achievement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Achievement_title_key" ON "Achievement"("title");

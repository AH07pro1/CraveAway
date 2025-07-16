-- CreateTable
CREATE TABLE "UserDailyCheckin" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDailyCheckin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDailyCheckin_userId_date_key" ON "UserDailyCheckin"("userId", "date");

-- CreateTable
CREATE TABLE "CravingType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,

    CONSTRAINT "CravingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CravingEvent" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "intensity" INTEGER,
    "notes" TEXT,
    "resolved" BOOLEAN NOT NULL,
    "typeId" INTEGER,
    "userId" TEXT NOT NULL,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "CravingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProgress" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "committed" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT,
    "photoUrl" TEXT,

    CONSTRAINT "UserProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDailyCheckin" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDailyCheckin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CravingType_name_key" ON "CravingType"("name");

-- CreateIndex
CREATE INDEX "CravingType_userId_idx" ON "CravingType"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CravingType_name_userId_key" ON "CravingType"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_key" ON "UserProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDailyCheckin_userId_date_key" ON "UserDailyCheckin"("userId", "date");

-- AddForeignKey
ALTER TABLE "CravingEvent" ADD CONSTRAINT "CravingEvent_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "CravingType"("id") ON DELETE SET NULL ON UPDATE CASCADE;


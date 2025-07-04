-- CreateTable
CREATE TABLE "CravingEvent" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "intensity" INTEGER,
    "notes" TEXT,
    "resolved" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "CravingEvent_pkey" PRIMARY KEY ("id")
);

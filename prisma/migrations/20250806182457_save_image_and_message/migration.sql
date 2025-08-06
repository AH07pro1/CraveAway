-- AlterTable
ALTER TABLE "UserProgress" ADD COLUMN     "committed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "message" TEXT,
ADD COLUMN     "photoUrl" TEXT;

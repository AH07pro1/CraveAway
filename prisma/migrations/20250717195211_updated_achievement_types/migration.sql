-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AchievementType" ADD VALUE 'FAST_RESOLUTION';
ALTER TYPE "AchievementType" ADD VALUE 'RESISTED_CRAVING';
ALTER TYPE "AchievementType" ADD VALUE 'JOURNAL';
ALTER TYPE "AchievementType" ADD VALUE 'FEEDBACK';
ALTER TYPE "AchievementType" ADD VALUE 'DAYS_ACTIVE';
ALTER TYPE "AchievementType" ADD VALUE 'NO_CRAVINGS_DAY';
ALTER TYPE "AchievementType" ADD VALUE 'DAILY_RESOLVED_CRAVINGS';

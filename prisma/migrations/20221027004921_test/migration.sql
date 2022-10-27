/*
  Warnings:

  - You are about to drop the column `userId` on the `UserProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_userId_fkey";

-- DropIndex
DROP INDEX "UserProfile_userId_key";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "userId";

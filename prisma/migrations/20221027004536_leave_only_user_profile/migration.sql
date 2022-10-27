/*
  Warnings:

  - You are about to drop the column `model` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `type` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "model";
ALTER TABLE "Account" ADD COLUMN     "type" STRING NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt";
ALTER TABLE "User" DROP COLUMN "password";
ALTER TABLE "User" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "password" STRING;

/*
  Warnings:

  - You are about to drop the column `password` on the `Merchant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Merchant_password_key";

-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "password";

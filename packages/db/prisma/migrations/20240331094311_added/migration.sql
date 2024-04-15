/*
  Warnings:

  - Added the required column `auth_type` to the `Merchant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "auth_type" "AuthType" NOT NULL;

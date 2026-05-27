/*
  Warnings:

  - You are about to drop the column `so_bhxh` on the `nhan_vien` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "nhan_vien_so_bhxh_key";

-- AlterTable
ALTER TABLE "nhan_vien" DROP COLUMN "so_bhxh";

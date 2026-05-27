/*
  Warnings:

  - You are about to drop the column `bac_luongId_bac_luong` on the `quyet_dinh_nhan_su` table. All the data in the column will be lost.
  - You are about to drop the column `bac_luongId_chuc_vu` on the `quyet_dinh_nhan_su` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "quyet_dinh_nhan_su" DROP CONSTRAINT "quyet_dinh_nhan_su_bac_luongId_bac_luong_bac_luongId_chuc__fkey";

-- AlterTable
ALTER TABLE "quyet_dinh_nhan_su" DROP COLUMN "bac_luongId_bac_luong",
DROP COLUMN "bac_luongId_chuc_vu";

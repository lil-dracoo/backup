/*
  Warnings:

  - Added the required column `ngay_ap_dung` to the `chuc_vu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chuc_vu" ADD COLUMN     "ngay_ap_dung" DATE NOT NULL,
ADD COLUMN     "trang_thai" VARCHAR(20) NOT NULL DEFAULT 'hoat_dong';

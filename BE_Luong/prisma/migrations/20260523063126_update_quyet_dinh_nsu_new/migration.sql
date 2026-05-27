-- AddForeignKey
ALTER TABLE "quyet_dinh_nhan_su" ADD CONSTRAINT "quyet_dinh_nhan_su_id_chuc_vu_moi_fkey" FOREIGN KEY ("id_chuc_vu_moi") REFERENCES "chuc_vu"("id_chuc_vu") ON DELETE NO ACTION ON UPDATE NO ACTION;

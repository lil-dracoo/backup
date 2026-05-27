-- CreateTable
CREATE TABLE "bac_luong" (
    "id_bac_luong" CHAR(5) NOT NULL,
    "id_chuc_vu" VARCHAR(5) NOT NULL,
    "luong_p1" DECIMAL(15,2) NOT NULL,
    "ngay_ap_dung" DATE NOT NULL,

    CONSTRAINT "bac_luong_pkey" PRIMARY KEY ("id_bac_luong","id_chuc_vu")
);

-- CreateTable
CREATE TABLE "chuc_vu" (
    "id_chuc_vu" VARCHAR(5) NOT NULL,
    "ten_chuc_vu" VARCHAR(100) NOT NULL,

    CONSTRAINT "chuc_vu_pkey" PRIMARY KEY ("id_chuc_vu")
);

-- CreateTable
CREATE TABLE "moi_quan_he" (
    "id_mqh" SERIAL NOT NULL,
    "ten_quan_he" VARCHAR(20) NOT NULL,

    CONSTRAINT "moi_quan_he_pkey" PRIMARY KEY ("id_mqh")
);

-- CreateTable
CREATE TABLE "ngan_hang" (
    "id_ngan_hang" SERIAL NOT NULL,
    "ten_ngan_hang" VARCHAR(100) NOT NULL,

    CONSTRAINT "ngan_hang_pkey" PRIMARY KEY ("id_ngan_hang")
);

-- CreateTable
CREATE TABLE "nhan_vien" (
    "cccd" CHAR(12) NOT NULL,
    "ho_ten" VARCHAR(100) NOT NULL,
    "gioi_tinh" BOOLEAN,
    "sdt" VARCHAR(15),
    "email" VARCHAR(100),
    "ngay_sinh" DATE,
    "dan_toc" VARCHAR(20),
    "dia_chi" VARCHAR(255),
    "chuyen_nganh" VARCHAR(100),
    "ngay_vao_lam" DATE,
    "ngay_nghi_viec" DATE,
    "trang_thai" VARCHAR(50),
    "so_bhxh" VARCHAR(20),
    "so_bhyt" VARCHAR(20),
    "id_tai_khoan" INTEGER,

    CONSTRAINT "nhan_vien_pkey" PRIMARY KEY ("cccd")
);

-- CreateTable
CREATE TABLE "phong_ban" (
    "id_pb" VARCHAR(5) NOT NULL,
    "ten_pb" VARCHAR(100) NOT NULL,
    "mo_ta" TEXT,
    "ngay_thanh_lap" TIMESTAMP(3),
    "trang_thai" VARCHAR(20) NOT NULL DEFAULT 'hoat_dong',

    CONSTRAINT "phong_ban_pkey" PRIMARY KEY ("id_pb")
);

-- CreateTable
CREATE TABLE "loai_qd_nhan_su" (
    "id_loai_qd_ns" VARCHAR(10) NOT NULL,
    "ten_loai_qd_ns" VARCHAR(100) NOT NULL,

    CONSTRAINT "loai_qd_nhan_su_pkey" PRIMARY KEY ("id_loai_qd_ns")
);

-- CreateTable
CREATE TABLE "loai_qd_luong" (
    "id_loai_qd_luong" VARCHAR(10) NOT NULL,
    "ten_loai_qd_luong" VARCHAR(100) NOT NULL,

    CONSTRAINT "loai_qd_luong_pkey" PRIMARY KEY ("id_loai_qd_luong")
);

-- CreateTable
CREATE TABLE "quyet_dinh_nhan_su" (
    "so_quyet_dinh" VARCHAR(50) NOT NULL,
    "cccd" CHAR(12),
    "id_pban_moi" VARCHAR(5),
    "id_loai_qd_ns" VARCHAR(10) NOT NULL,
    "id_chuc_vu_moi" VARCHAR(5),
    "ngay_hieu_luc" DATE NOT NULL,
    "ngay_het_han" DATE,
    "nguoi_ky" VARCHAR(100),
    "trang_thai" VARCHAR(20) DEFAULT 'HIEU_LUC',
    "bac_luongId_bac_luong" CHAR(5),
    "bac_luongId_chuc_vu" VARCHAR(5),

    CONSTRAINT "quyet_dinh_nhan_su_pkey" PRIMARY KEY ("so_quyet_dinh")
);

-- CreateTable
CREATE TABLE "quyet_dinh_luong" (
    "id_qd_luong" VARCHAR(10) NOT NULL,
    "so_quyet_dinh" VARCHAR(50) NOT NULL,
    "ngay_ban_hanh" DATE NOT NULL,
    "cccd_nv" CHAR(12) NOT NULL,
    "id_bac_luong" CHAR(5) NOT NULL,
    "id_chuc_vu" VARCHAR(5) NOT NULL,
    "id_loai_qd_luong" VARCHAR(10) NOT NULL,
    "ngay_ap_dung" DATE NOT NULL,
    "ngay_ket_thuc" DATE,
    "ghi_chu" TEXT,

    CONSTRAINT "quyet_dinh_luong_pkey" PRIMARY KEY ("id_qd_luong")
);

-- CreateTable
CREATE TABLE "loai_phu_cap" (
    "id_loai_pc" VARCHAR(10) NOT NULL,
    "ten_loai" VARCHAR(100) NOT NULL,

    CONSTRAINT "loai_phu_cap_pkey" PRIMARY KEY ("id_loai_pc")
);

-- CreateTable
CREATE TABLE "phu_cap" (
    "id_pc" VARCHAR(10) NOT NULL,
    "ten_pc" VARCHAR(100) NOT NULL,
    "kieu_tinh" VARCHAR(30) NOT NULL,
    "id_loai_pc" VARCHAR(10) NOT NULL,

    CONSTRAINT "phu_cap_pkey" PRIMARY KEY ("id_pc")
);

-- CreateTable
CREATE TABLE "muc_phu_cap" (
    "id_muc_pc" VARCHAR(10) NOT NULL,
    "id_phu_cap" VARCHAR(10) NOT NULL,
    "so_tien" DECIMAL(15,2) NOT NULL,
    "ngay_ap_dung" DATE NOT NULL,
    "ngay_ket_thuc" DATE,

    CONSTRAINT "muc_phu_cap_pkey" PRIMARY KEY ("id_muc_pc")
);

-- CreateTable
CREATE TABLE "phu_cap_nhan_vien" (
    "id_phu_cap_nv" VARCHAR(10) NOT NULL,
    "cccd_nv" CHAR(12) NOT NULL,
    "id_muc_phu_cap" VARCHAR(10) NOT NULL,
    "ngay_bat_dau" DATE NOT NULL,
    "ngay_ket_thuc" DATE,

    CONSTRAINT "phu_cap_nhan_vien_pkey" PRIMARY KEY ("id_phu_cap_nv")
);

-- CreateTable
CREATE TABLE "phu_cap_phong_ban" (
    "id_phu_cap_pb" VARCHAR(10) NOT NULL,
    "id_pban" VARCHAR(5) NOT NULL,
    "id_muc_phu_cap" VARCHAR(10) NOT NULL,
    "ngay_bat_dau" DATE NOT NULL,
    "ngay_ket_thuc" DATE,

    CONSTRAINT "phu_cap_phong_ban_pkey" PRIMARY KEY ("id_phu_cap_pb")
);

-- CreateTable
CREATE TABLE "phu_cap_chuc_vu" (
    "id_phu_cap_cv" VARCHAR(10) NOT NULL,
    "id_chuc_vu" VARCHAR(5) NOT NULL,
    "id_muc_phu_cap" VARCHAR(10) NOT NULL,
    "ngay_bat_dau" DATE NOT NULL,
    "ngay_ket_thuc" DATE,

    CONSTRAINT "phu_cap_chuc_vu_pkey" PRIMARY KEY ("id_phu_cap_cv")
);

-- CreateTable
CREATE TABLE "loai_khau_tru" (
    "id_loai_khau_tru" VARCHAR(10) NOT NULL,
    "ten_loai" VARCHAR(100) NOT NULL,
    "loai_tinh" VARCHAR(30) NOT NULL,

    CONSTRAINT "loai_khau_tru_pkey" PRIMARY KEY ("id_loai_khau_tru")
);

-- CreateTable
CREATE TABLE "muc_khau_tru" (
    "id_muc_khau_tru" VARCHAR(10) NOT NULL,
    "id_loai_khau_tru" VARCHAR(10) NOT NULL,
    "gia_tri" DECIMAL(15,2) NOT NULL,
    "ngay_ap_dung" DATE NOT NULL,
    "ngay_ket_thuc" DATE,
    "trang_thai" VARCHAR(20) NOT NULL DEFAULT 'HOAT_DONG',

    CONSTRAINT "muc_khau_tru_pkey" PRIMARY KEY ("id_muc_khau_tru")
);

-- CreateTable
CREATE TABLE "khau_tru_nhan_vien" (
    "id_khau_tru_nv" VARCHAR(10) NOT NULL,
    "cccd_nv" CHAR(12) NOT NULL,
    "id_muc_khau_tru" VARCHAR(10) NOT NULL,
    "thang" INTEGER NOT NULL,
    "nam" INTEGER NOT NULL,
    "so_tien_thuc_te" DECIMAL(15,2) NOT NULL,
    "ghi_chu" TEXT,

    CONSTRAINT "khau_tru_nhan_vien_pkey" PRIMARY KEY ("id_khau_tru_nv")
);

-- CreateTable
CREATE TABLE "bac_thue_tncn" (
    "id_bac_thue" VARCHAR(10) NOT NULL,
    "ten_bac_thue" VARCHAR(100) NOT NULL,
    "thu_nhap_tu" DECIMAL(15,2) NOT NULL,
    "thu_nhap_den" DECIMAL(15,2) NOT NULL,
    "phan_tram_thue" DECIMAL(15,2) NOT NULL,
    "ngay_ap_dung" DATE NOT NULL,
    "ngay_ket_thuc" DATE,

    CONSTRAINT "bac_thue_tncn_pkey" PRIMARY KEY ("id_bac_thue")
);

-- CreateTable
CREATE TABLE "giam_tru_gia_canh" (
    "id_giam_tru" VARCHAR(10) NOT NULL,
    "giam_tru_ban_than" DECIMAL(15,2) NOT NULL,
    "giam_tru_nguoi_phu_thuoc" DECIMAL(15,2) NOT NULL,
    "ngay_ap_dung" DATE NOT NULL,
    "ngay_ket_thuc" DATE,

    CONSTRAINT "giam_tru_gia_canh_pkey" PRIMARY KEY ("id_giam_tru")
);

-- CreateTable
CREATE TABLE "lich_su_thue_tncn" (
    "id_lich_su_thue" VARCHAR(10) NOT NULL,
    "cccd_nv" CHAR(12) NOT NULL,
    "thang" INTEGER NOT NULL,
    "nam" INTEGER NOT NULL,
    "tong_thu_nhap" DECIMAL(15,2) NOT NULL,
    "thu_nhap_chiu_thue" DECIMAL(15,2) NOT NULL,
    "tong_giam_tru" DECIMAL(15,2) NOT NULL,
    "thu_nhap_tinh_thue" DECIMAL(15,2) NOT NULL,
    "so_thue_phai_nop" DECIMAL(15,2) NOT NULL,
    "id_giam_tru" VARCHAR(10) NOT NULL,

    CONSTRAINT "lich_su_thue_tncn_pkey" PRIMARY KEY ("id_lich_su_thue")
);

-- CreateTable
CREATE TABLE "loai_thuong_phat" (
    "id_loai_tp" VARCHAR(10) NOT NULL,
    "ten_loai" VARCHAR(100) NOT NULL,
    "loai" VARCHAR(20) NOT NULL,

    CONSTRAINT "loai_thuong_phat_pkey" PRIMARY KEY ("id_loai_tp")
);

-- CreateTable
CREATE TABLE "muc_thuong_phat" (
    "id_muc_tp" VARCHAR(10) NOT NULL,
    "id_loai_tp" VARCHAR(10) NOT NULL,
    "ten_muc" VARCHAR(100) NOT NULL,
    "gia_tri" DECIMAL(15,2) NOT NULL,
    "hinh_thuc" VARCHAR(30) NOT NULL,
    "ngay_ap_dung" DATE NOT NULL,
    "ngay_ket_thuc" DATE,

    CONSTRAINT "muc_thuong_phat_pkey" PRIMARY KEY ("id_muc_tp")
);

-- CreateTable
CREATE TABLE "quyet_dinh_thuong_phat" (
    "id_qd_tp" VARCHAR(10) NOT NULL,
    "so_quyet_dinh" VARCHAR(50) NOT NULL,
    "cccd_nv" CHAR(12) NOT NULL,
    "id_muc_tp" VARCHAR(10) NOT NULL,
    "ngay_ban_hanh" DATE NOT NULL,
    "ngay_hieu_luc" DATE NOT NULL,
    "ngay_het_han" DATE,
    "nguoi_ky" VARCHAR(100),
    "ghi_chu" TEXT,

    CONSTRAINT "quyet_dinh_thuong_phat_pkey" PRIMARY KEY ("id_qd_tp")
);

-- CreateTable
CREATE TABLE "tai_khoan" (
    "id_tai_khoan" SERIAL NOT NULL,
    "ten_tai_khoan" VARCHAR(50) NOT NULL,
    "mat_khau" VARCHAR(255) NOT NULL,
    "trang_thai" VARCHAR(20) DEFAULT 'HOATDONG',
    "dang_nhap_lan_dau" BOOLEAN DEFAULT true,
    "id_vai_tro" INTEGER,

    CONSTRAINT "tai_khoan_pkey" PRIMARY KEY ("id_tai_khoan")
);

-- CreateTable
CREATE TABLE "tai_khoan_ngan_hang" (
    "stk" VARCHAR(30) NOT NULL,
    "chi_nhanh" VARCHAR(100),
    "ngay_mo_the" DATE,
    "trang_thai" VARCHAR(20),
    "id_ngan_hang" INTEGER,
    "cccd" CHAR(12),

    CONSTRAINT "tai_khoan_ngan_hang_pkey" PRIMARY KEY ("stk")
);

-- CreateTable
CREATE TABLE "than_nhan" (
    "ma_dinh_danh" CHAR(12) NOT NULL,
    "ten_tn" VARCHAR(100) NOT NULL,
    "ngay_sinh" DATE,

    CONSTRAINT "than_nhan_pkey" PRIMARY KEY ("ma_dinh_danh")
);

-- CreateTable
CREATE TABLE "tnhan_nvien" (
    "cccd" CHAR(12) NOT NULL,
    "ma_dinh_danh" CHAR(12) NOT NULL,
    "id_mqh" INTEGER,

    CONSTRAINT "tnhan_nvien_pkey" PRIMARY KEY ("cccd","ma_dinh_danh")
);

-- CreateTable
CREATE TABLE "vai_tro" (
    "id_vai_tro" SERIAL NOT NULL,
    "ten_vai_tro" VARCHAR(50) NOT NULL,

    CONSTRAINT "vai_tro_pkey" PRIMARY KEY ("id_vai_tro")
);

-- CreateIndex
CREATE UNIQUE INDEX "nhan_vien_sdt_key" ON "nhan_vien"("sdt");

-- CreateIndex
CREATE UNIQUE INDEX "nhan_vien_email_key" ON "nhan_vien"("email");

-- CreateIndex
CREATE UNIQUE INDEX "nhan_vien_so_bhxh_key" ON "nhan_vien"("so_bhxh");

-- CreateIndex
CREATE UNIQUE INDEX "nhan_vien_so_bhyt_key" ON "nhan_vien"("so_bhyt");

-- CreateIndex
CREATE UNIQUE INDEX "nhan_vien_id_tai_khoan_key" ON "nhan_vien"("id_tai_khoan");

-- CreateIndex
CREATE UNIQUE INDEX "quyet_dinh_luong_so_quyet_dinh_key" ON "quyet_dinh_luong"("so_quyet_dinh");

-- CreateIndex
CREATE UNIQUE INDEX "quyet_dinh_thuong_phat_so_quyet_dinh_key" ON "quyet_dinh_thuong_phat"("so_quyet_dinh");

-- CreateIndex
CREATE UNIQUE INDEX "tai_khoan_ten_tai_khoan_key" ON "tai_khoan"("ten_tai_khoan");

-- AddForeignKey
ALTER TABLE "bac_luong" ADD CONSTRAINT "bac_luong_id_chuc_vu_fkey" FOREIGN KEY ("id_chuc_vu") REFERENCES "chuc_vu"("id_chuc_vu") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nhan_vien" ADD CONSTRAINT "nhan_vien_id_tai_khoan_fkey" FOREIGN KEY ("id_tai_khoan") REFERENCES "tai_khoan"("id_tai_khoan") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quyet_dinh_nhan_su" ADD CONSTRAINT "quyet_dinh_nhan_su_id_pban_moi_fkey" FOREIGN KEY ("id_pban_moi") REFERENCES "phong_ban"("id_pb") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quyet_dinh_nhan_su" ADD CONSTRAINT "quyet_dinh_nhan_su_cccd_fkey" FOREIGN KEY ("cccd") REFERENCES "nhan_vien"("cccd") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quyet_dinh_nhan_su" ADD CONSTRAINT "quyet_dinh_nhan_su_id_loai_qd_ns_fkey" FOREIGN KEY ("id_loai_qd_ns") REFERENCES "loai_qd_nhan_su"("id_loai_qd_ns") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quyet_dinh_nhan_su" ADD CONSTRAINT "quyet_dinh_nhan_su_bac_luongId_bac_luong_bac_luongId_chuc__fkey" FOREIGN KEY ("bac_luongId_bac_luong", "bac_luongId_chuc_vu") REFERENCES "bac_luong"("id_bac_luong", "id_chuc_vu") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quyet_dinh_luong" ADD CONSTRAINT "quyet_dinh_luong_cccd_nv_fkey" FOREIGN KEY ("cccd_nv") REFERENCES "nhan_vien"("cccd") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quyet_dinh_luong" ADD CONSTRAINT "quyet_dinh_luong_id_loai_qd_luong_fkey" FOREIGN KEY ("id_loai_qd_luong") REFERENCES "loai_qd_luong"("id_loai_qd_luong") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quyet_dinh_luong" ADD CONSTRAINT "quyet_dinh_luong_id_bac_luong_id_chuc_vu_fkey" FOREIGN KEY ("id_bac_luong", "id_chuc_vu") REFERENCES "bac_luong"("id_bac_luong", "id_chuc_vu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phu_cap" ADD CONSTRAINT "phu_cap_id_loai_pc_fkey" FOREIGN KEY ("id_loai_pc") REFERENCES "loai_phu_cap"("id_loai_pc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "muc_phu_cap" ADD CONSTRAINT "muc_phu_cap_id_phu_cap_fkey" FOREIGN KEY ("id_phu_cap") REFERENCES "phu_cap"("id_pc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phu_cap_nhan_vien" ADD CONSTRAINT "phu_cap_nhan_vien_cccd_nv_fkey" FOREIGN KEY ("cccd_nv") REFERENCES "nhan_vien"("cccd") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phu_cap_nhan_vien" ADD CONSTRAINT "phu_cap_nhan_vien_id_muc_phu_cap_fkey" FOREIGN KEY ("id_muc_phu_cap") REFERENCES "muc_phu_cap"("id_muc_pc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phu_cap_phong_ban" ADD CONSTRAINT "phu_cap_phong_ban_id_pban_fkey" FOREIGN KEY ("id_pban") REFERENCES "phong_ban"("id_pb") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phu_cap_phong_ban" ADD CONSTRAINT "phu_cap_phong_ban_id_muc_phu_cap_fkey" FOREIGN KEY ("id_muc_phu_cap") REFERENCES "muc_phu_cap"("id_muc_pc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phu_cap_chuc_vu" ADD CONSTRAINT "phu_cap_chuc_vu_id_chuc_vu_fkey" FOREIGN KEY ("id_chuc_vu") REFERENCES "chuc_vu"("id_chuc_vu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phu_cap_chuc_vu" ADD CONSTRAINT "phu_cap_chuc_vu_id_muc_phu_cap_fkey" FOREIGN KEY ("id_muc_phu_cap") REFERENCES "muc_phu_cap"("id_muc_pc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "muc_khau_tru" ADD CONSTRAINT "muc_khau_tru_id_loai_khau_tru_fkey" FOREIGN KEY ("id_loai_khau_tru") REFERENCES "loai_khau_tru"("id_loai_khau_tru") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "khau_tru_nhan_vien" ADD CONSTRAINT "khau_tru_nhan_vien_cccd_nv_fkey" FOREIGN KEY ("cccd_nv") REFERENCES "nhan_vien"("cccd") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "khau_tru_nhan_vien" ADD CONSTRAINT "khau_tru_nhan_vien_id_muc_khau_tru_fkey" FOREIGN KEY ("id_muc_khau_tru") REFERENCES "muc_khau_tru"("id_muc_khau_tru") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lich_su_thue_tncn" ADD CONSTRAINT "lich_su_thue_tncn_cccd_nv_fkey" FOREIGN KEY ("cccd_nv") REFERENCES "nhan_vien"("cccd") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lich_su_thue_tncn" ADD CONSTRAINT "lich_su_thue_tncn_id_giam_tru_fkey" FOREIGN KEY ("id_giam_tru") REFERENCES "giam_tru_gia_canh"("id_giam_tru") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "muc_thuong_phat" ADD CONSTRAINT "muc_thuong_phat_id_loai_tp_fkey" FOREIGN KEY ("id_loai_tp") REFERENCES "loai_thuong_phat"("id_loai_tp") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quyet_dinh_thuong_phat" ADD CONSTRAINT "quyet_dinh_thuong_phat_cccd_nv_fkey" FOREIGN KEY ("cccd_nv") REFERENCES "nhan_vien"("cccd") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quyet_dinh_thuong_phat" ADD CONSTRAINT "quyet_dinh_thuong_phat_id_muc_tp_fkey" FOREIGN KEY ("id_muc_tp") REFERENCES "muc_thuong_phat"("id_muc_tp") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tai_khoan" ADD CONSTRAINT "tai_khoan_id_vai_tro_fkey" FOREIGN KEY ("id_vai_tro") REFERENCES "vai_tro"("id_vai_tro") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tai_khoan_ngan_hang" ADD CONSTRAINT "tai_khoan_ngan_hang_cccd_fkey" FOREIGN KEY ("cccd") REFERENCES "nhan_vien"("cccd") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tai_khoan_ngan_hang" ADD CONSTRAINT "tai_khoan_ngan_hang_id_ngan_hang_fkey" FOREIGN KEY ("id_ngan_hang") REFERENCES "ngan_hang"("id_ngan_hang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tnhan_nvien" ADD CONSTRAINT "tnhan_nvien_cccd_fkey" FOREIGN KEY ("cccd") REFERENCES "nhan_vien"("cccd") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tnhan_nvien" ADD CONSTRAINT "tnhan_nvien_id_mqh_fkey" FOREIGN KEY ("id_mqh") REFERENCES "moi_quan_he"("id_mqh") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tnhan_nvien" ADD CONSTRAINT "tnhan_nvien_ma_dinh_danh_fkey" FOREIGN KEY ("ma_dinh_danh") REFERENCES "than_nhan"("ma_dinh_danh") ON DELETE NO ACTION ON UPDATE NO ACTION;

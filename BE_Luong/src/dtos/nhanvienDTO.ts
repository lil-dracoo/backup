import dayjs from "dayjs";

const EmployeeListDTO = (emp: any) => {

  const luong_hien_tai = emp.quyet_dinh_luong?.[0]?.bac_luong?.luong_p1 || 0;

  return {
    cccd: emp.cccd,
    ho_ten: emp.ho_ten,
    vi_tri: emp.quyet_dinh_nhan_su?.[0]?.chuc_vu?.ten_chuc_vu,
    phong_ban: emp.quyet_dinh_nhan_su?.[0]?.phong_ban?.ten_pb,
    email: emp.email,
    sdt: emp.sdt,
    ngay_sinh: emp.ngay_sinh ? dayjs(emp.ngay_sinh).format('DD/MM/YYYY') : null,
    ngay_vao_lam: emp.ngay_vao_lam ? dayjs(emp.ngay_vao_lam).format('DD/MM/YYYY') : null,
    luong_p1: Number(luong_hien_tai),
    trang_thai: emp.trang_thai,
  };
};

const EmployeeDetailDTO = (emp: any) => {
  // Mapping danh sách thân nhân, có sử dụng fallback [] nếu mảng undefined
  const than_nhan = emp.tnhan_nvien?.map((tn: any) => ({
    ma_dinh_danh: tn.than_nhan?.ma_dinh_danh,
    ho_ten: tn.than_nhan?.ten_tn,
    quan_he: tn.moi_quan_he?.ten_quan_he,
    ngay_sinh: tn.than_nhan?.ngay_sinh ? dayjs(tn.than_nhan.ngay_sinh).format('DD/MM/YYYY') : null,
  })) || [];

  // Mapping lịch sử quyết định nhân sự
  const lich_su_nhan_su =
    emp.quyet_dinh_nhan_su?.map((qd: any) => ({
      so_quyet_dinh: qd.so_quyet_dinh,
      loai_quyet_dinh: qd.loai_qd_nhan_su?.ten_loai_qd_ns,
      vi_tri_moi: qd.chuc_vu?.ten_chuc_vu,
      phong_ban_moi: qd.phong_ban?.ten_pb,
      ngay_hieu_luc: qd.ngay_hieu_luc ? dayjs(qd.ngay_hieu_luc).format("DD/MM/YYYY"): null,
      ngay_het_han: qd.ngay_het_han? dayjs(qd.ngay_het_han).format("DD/MM/YYYY"): "Chưa rõ",
      trang_thai: qd.trang_thai,
      nguoi_ky: qd.nguoi_ky,
    })) ?? [];

  const lich_su_luong =
    emp.quyet_dinh_luong?.map((qd: any) => ({
      so_quyet_dinh: qd.so_quyet_dinh,
      loai_quyet_dinh: qd.loai_qd_luong ?.ten_loai_qd_luong,
      ngay_ap_dung: qd.ngay_ap_dung ? dayjs(qd.ngay_ap_dung).format("DD/MM/YYYY"): null,
      ngay_het_han: qd.ngay_ket_thuc? dayjs(qd.ngay_ket_thuc).format("DD/MM/YYYY"): "Chưa rõ",
      id_bac_luong: qd.bac_luong?.id_bac_luong,
      ten_chuc_vu: qd.bac_luong?.chuc_vu?.ten_chuc_vu,
      luong_p1: Number(qd.bac_luong?.luong_p1) || 0,
    })) ?? [];

  const tai_khoan_ngan_hang =
    emp.tai_khoan_ngan_hang?.map((tknh: any) => ({
        stk: tknh.stk,
        ten_ngan_hang:tknh.ngan_hang?.ten_ngan_hang,
        ten_chi_nhanh:tknh.chi_nhanh,
        ngay_mo_the: tknh.ngay_mo_the? dayjs(tknh.ngay_mo_the).format("DD/MM/YYYY"): null,
        trang_thai: tknh.trang_thai,
      })
    ) ?? [];


  return {
    thong_tin_chung: {
      cccd: emp.cccd,
      ho_ten: emp.ho_ten,
      gioi_tinh: emp.gioi_tinh,
      sdt: emp.sdt,
      email: emp.email,
      ngay_sinh: emp.ngay_sinh ? dayjs(emp.ngay_sinh).format('DD/MM/YYYY') : null,
      dan_toc: emp.dan_toc,
      dia_chi: emp.dia_chi,
      chuyen_nganh: emp.chuyen_nganh,
      ngay_nghi_viec: emp.ngay_nghi_viec ? dayjs(emp.ngay_nghi_viec).format('DD/MM/YYYY') : null,
      trang_thai: emp.trang_thai,
      so_bhyt: emp.so_bhyt,
      so_bhxh: emp.cccd,
      ngay_vao_lam: emp.ngay_vao_lam ? dayjs(emp.ngay_vao_lam).format('DD/MM/YYYY') : null,
      phong_ban: emp.quyet_dinh_nhan_su?.[0]?.phong_ban?.ten_pb || "Chưa phân bổ",
      chuc_vu: emp.quyet_dinh_nhan_su?.[0]?.chuc_vu?.ten_chuc_vu || "Chưa phân bổ",
    },
    tai_khoan_ngan_hang,
    than_nhan,
    lich_su_nhan_su,
    lich_su_luong,

  };
};

export const nhanVienDTO = {EmployeeListDTO, EmployeeDetailDTO}
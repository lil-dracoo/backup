import dayjs from "dayjs";
const DeptListDTO = (dept: any) => {
  return {
    id_pb: dept.id_pb,
    ten_pb: dept.ten_pb,
    ngay_thanh_lap: dept.ngay_thanh_lap? dayjs(dept.ngay_thanh_lap).format("DD/MM/YYYY"): null,
    trang_thai: dept.trang_thai,
    so_luong_nhan_vien: dept._count.quyet_dinh_nhan_su,
    truong_phong: dept.quyet_dinh_nhan_su?.[0]?.nhan_vien?.ho_ten || "Chưa bổ nhiệm",
  };
}

const DeptDetailDTO = (dept: any) => {
  return {
    id_pb: dept.id_pb,
    ten_pb: dept.ten_pb,
    ngay_thanh_lap: dept.ngay_thanh_lap? dayjs(dept.ngay_thanh_lap).format("DD/MM/YYYY"): null,
    trang_thai: dept.trang_thai,
    mo_ta: dept.mo_ta,
  }
}

export const phongBanDTO = {DeptListDTO, DeptDetailDTO};

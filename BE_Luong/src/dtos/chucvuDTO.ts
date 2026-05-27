import dayjs from "dayjs";

const PosListDTO = (pos: any) => {
  return {
    id_chuc_vu: pos.id_chuc_vu,
    ten_chuc_vu: pos.ten_chuc_vu,
    trang_thai: pos.trang_thai,
  };
};

export const chucVuDTO = { PosListDTO };

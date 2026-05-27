import { prisma } from "../config/prisma";

  // Lấy danh sách tất cả nhân viên kèm tên phòng ban
  const findAll= async () => {
    return await prisma.nhan_vien.findMany({
      orderBy: {
        ngay_vao_lam: "desc",
      },
      include: {
        quyet_dinh_luong: {
          where: {trang_thai: 'HIEU_LUC'},
          include: {
            bac_luong: true,
          }
        },
        quyet_dinh_nhan_su: {
          where: {trang_thai: 'HIEU_LUC'},
          include: {
            chuc_vu: true,
            phong_ban: true,
          },
        },
      },
    });
  }

  // Tìm chi tiết một nhân viên qua CCCD 
  const findById= async (cccd: string) => {
    return await prisma.nhan_vien.findUnique({
      where: { cccd },
      include: {
        tnhan_nvien: {
          include: {
            than_nhan: true,
            moi_quan_he: true,
          },
        },
        quyet_dinh_nhan_su: {
          orderBy: {ngay_hieu_luc: "desc"},
          include: {
            chuc_vu: true,
            phong_ban: true,
            loai_qd_nhan_su: true,
          },
        },
        quyet_dinh_luong: {
          orderBy: {ngay_ap_dung: "desc"},
          include: {
            loai_qd_luong: true,
            bac_luong: {
            include: {
              chuc_vu: true,
            },
          },
        },
        },
        tai_khoan_ngan_hang:{
          include: {
            ngan_hang: true
          }
        }
      },
    });
  }

  const searchEmployees = async (keyword: string) => {
    return await prisma.nhan_vien.findMany({
      where: {
        OR: [
          { ho_ten: { contains: keyword } }, // Tìm theo tên
          { cccd: { contains: keyword } },   // Tìm theo CCCD
          { sdt: { contains: keyword } },    // Tìm theo số điện thoại
        ],
      },
    orderBy: {
      ngay_vao_lam: "desc",
    },
      include: {
        quyet_dinh_nhan_su: {
          orderBy: { ngay_hieu_luc: "desc" },
          include: {
            chuc_vu: true,
            phong_ban: true,
          },
        },
        quyet_dinh_luong: {
          where: {trang_thai: 'HIEU_LUC'},
          include: {
            bac_luong: true,
          }
        },
      },
      
    });
  };
  export const nhanVienRepository = { findAll, findById, searchEmployees };

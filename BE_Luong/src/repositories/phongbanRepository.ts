import { prisma } from "../config/prisma";
const findAll = async () => {
  return await prisma.phong_ban.findMany({
    include: {
      _count: {
        select: {
          quyet_dinh_nhan_su: {
            where: {
              trang_thai: "HIEU_LUC",
            },
          },
        },
      },

      quyet_dinh_nhan_su: {
        where: {
          trang_thai: "HIEU_LUC",
          id_chuc_vu_moi: "TP",
        },

        include: {
          nhan_vien: {
            select: {
              ho_ten: true,
            },
          },
        },
      },
    },
  });
};

const findByID = async (id: string) => {
  return await prisma.phong_ban.findUnique({
    where: {
      id_pb: id,
    },
    include: {
      _count: {
        select: {
          quyet_dinh_nhan_su: {
            where: {
              trang_thai: "HIEU_LUC",
            },
          },
        },
      },
    }
  });
};

const createPhongBan = async (data: any) => {
  return await prisma.phong_ban.create({
    data,
  });
};

const updatePhongBan = async (id: string, data: any) => {
  return await prisma.phong_ban.update({
    where: {
      id_pb: id,
    },
    data,
  });
};




export const phongBanRepository = {
  findAll,
  findByID,
  createPhongBan,
  updatePhongBan,
};
import { prisma } from "../config/prisma";
const findAll = async () => {
  return prisma.chuc_vu.findMany({
    include: {
      _count: {
        select: {
          quyet_dinh_nhan_su: true,
        },
      },
      quyet_dinh_nhan_su: {
        include: {
          phong_ban: true,
        },
      },
    },
  });
};

const findByID = async (id: string) => {
  return await prisma.chuc_vu.findUnique({
    where: {
      id_chuc_vu: id,
    },
    include: {
      _count: {
        select: {
          quyet_dinh_nhan_su: true,
        },
      },
    },
  });
};

const create = async (data: any) => {
  return await prisma.chuc_vu.create({
    data,
  });
};

const update = async (id: string, data: any) => {
  return await prisma.chuc_vu.update({
    where: {
      id_chuc_vu: id,
    },
    data,
  });
};

const softdelete = async (id: string) => {
  return await prisma.chuc_vu.update({
    where: {
      id_chuc_vu: id,
    },
    data: {
      trang_thai: 'ngung_hoat_dong',
    },
  });
};

export const chucVuRepository = {
  findAll,
  findByID,
  create,
  update,
  softdelete,
};
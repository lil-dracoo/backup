import { prisma } from "../config/prisma";

const findAll = async () => {
  return await prisma.loai_phu_cap.findMany();
};

const findByID = async (id_loai_pc: string) => {
  return await prisma.loai_phu_cap.findUnique({
    where: { id_loai_pc },
    include: {
      _count:{
        select: {
          phu_cap: true,
        },
      }
    }
  });
};

const createLoaiPhuCap = async (data: any) => {
  return await prisma.loai_phu_cap.create({
    data,
  });
};

const updateLoaiPhuCap = async (id_loai_pc: string, data: any) => {
  return await prisma.loai_phu_cap.update({
    where: { id_loai_pc },
    data,
  });
};

const deleteLoaiPhuCap = async (id_loai_pc: string) => {
  return await prisma.loai_phu_cap.delete({
    where: { id_loai_pc },
  });
};

export const phucapRepository = { findAll, findByID, createLoaiPhuCap, updateLoaiPhuCap, deleteLoaiPhuCap };

import { phucapRepository } from "../repositories/loaiphucapRepository";

const getAllLoaiPhuCap = async () => {
  return await phucapRepository.findAll();
};

const getLoaiPhuCapById = async (id: string) => {
  const loaiPhuCap = await phucapRepository.findByID(id);
  if (!loaiPhuCap) throw new Error("NOT_FOUND");
  return loaiPhuCap;
};

const createLoaiPhuCap = async (data: any) => {
  const loaiPhuCap = await phucapRepository.findByID(data.id_loai_pc);
  if (loaiPhuCap) throw new Error("DUPLICATE_ID");

  return await phucapRepository.createLoaiPhuCap(data);
};

const updateLoaiPhuCap = async (id: string, data: any) => {
  const loaiPhuCap = await phucapRepository.findByID(id);
  if (!loaiPhuCap) throw new Error("NOT_FOUND");
  return await phucapRepository.updateLoaiPhuCap(id, data);
};

const deleteLoaiPhuCap = async (id: string) => {
  const loaiPhuCap = await phucapRepository.findByID(id);
  if (!loaiPhuCap) throw new Error("NOT_FOUND");
  if (loaiPhuCap._count.phu_cap > 0) throw new Error("NOT_DELETE");
  return await phucapRepository.deleteLoaiPhuCap(id);
};
export const phucapService = { getAllLoaiPhuCap, getLoaiPhuCapById, createLoaiPhuCap, updateLoaiPhuCap, deleteLoaiPhuCap };

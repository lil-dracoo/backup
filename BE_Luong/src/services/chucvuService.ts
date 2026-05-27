import { chucVuRepository } from "../repositories/chucvuRepository";
import { chucVuDTO } from "../dtos/chucvuDTO";

const getAllPos = async () => {
  const chucvus = await chucVuRepository.findAll();
  return chucvus.map(chucVuDTO.PosListDTO);
};

const getPosDetail = async (id: string) => {
  const chucvu = await chucVuRepository.findByID(id);
  if (!chucvu) throw new Error("NOT_FOUND");
  return chucVuDTO.PosListDTO(chucvu);
};

const createPos = async (data: any)=> {
  const cv = await chucVuRepository.findByID(data.id_chuc_vu);
  if(cv) throw new Error("DUPLICATE");

  return await chucVuRepository.create(data);
}

const updatePos = async (id: string, data: any) => {
  const cv = await chucVuRepository.findByID(id);
  if (!cv) throw new Error("NOT_FOUND");

  return await chucVuRepository.update(id, data);
};

const deletePos = async (id: string) => {
  const cv = await chucVuRepository.findByID(id);
  if (!cv) throw new Error("NOT_FOUND");
  
  const soLuongNhanVien = cv._count?.quyet_dinh_nhan_su || 0;
  if (soLuongNhanVien > 0) throw new Error("NOT_DELETE");
  return await chucVuRepository.softdelete(id);
};

export const chucVuService = { getAllPos, getPosDetail, createPos, updatePos, deletePos };
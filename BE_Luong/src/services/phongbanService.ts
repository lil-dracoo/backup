import { phongBanRepository } from "../repositories/phongbanRepository";
import { phongBanDTO } from "../dtos/phongbanDTO";

const findAll = async () => {
  const phongbans = await phongBanRepository.findAll();
  return phongbans.map(phongBanDTO.DeptListDTO);
};

const findByID = async (id: string) => {
  const phongban = await phongBanRepository.findByID(id);
  
  if (!phongban) throw new Error("NOT_FOUND");

  return phongBanDTO.DeptDetailDTO(phongban);
};

const createDept = async (data: any)=> {
  const pb = await phongBanRepository.findByID(data.id);
  if(pb) throw new Error("DUPLICATE");

  return await phongBanRepository.createPhongBan(data);
}

const updateDept = async (id: string, data: any) => {
  const pb = await phongBanRepository.findByID(id);
  if (!pb) throw new Error("NOT_FOUND");

  return await phongBanRepository.updatePhongBan(id, data);
};

const deleteDept = async (id: string) => {
  const pb = await phongBanRepository.findByID(id);
  if (!pb) throw new Error("NOT_FOUND");
  
  const isHoatDong = pb.trang_thai === "hoat_dong";

  if (isHoatDong) {
    const soLuongNhanVien = pb._count?.quyet_dinh_nhan_su || 0;
    if (soLuongNhanVien > 0) throw new Error("NOT_DELETE");
  }

  const newStatus = isHoatDong ? "ngung_hoat_dong" : "hoat_dong";
  return await phongBanRepository.updatePhongBan(id, { trang_thai: newStatus });
};


export const phongBanService = { findAll, findByID, createDept, updateDept, deleteDept};
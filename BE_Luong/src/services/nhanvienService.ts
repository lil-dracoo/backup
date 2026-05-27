import { nhanVienRepository } from "../repositories/nhanvienRepository";
import { nhanVienDTO } from "../dtos/nhanvienDTO";

const getAllEmployees = async () => {
  const employees = await nhanVienRepository.findAll();
  return employees.map((nhanVienDTO.EmployeeListDTO));
}

const getEmployeeDetail = async (cccd: string) => {
    const emp = await nhanVienRepository.findById(cccd);
    if (!emp) throw new Error("NOT_FOUND");
    return nhanVienDTO.EmployeeDetailDTO(emp);
};

const searchEmployees = async (keyword: string) => {
  if (!keyword || keyword.trim() === "") {
    return []; 
  }

  const employees = await nhanVienRepository.searchEmployees(keyword.trim());
  
  return employees.map(nhanVienDTO.EmployeeListDTO);
}

export const nhanVienService = { getAllEmployees, getEmployeeDetail,searchEmployees };
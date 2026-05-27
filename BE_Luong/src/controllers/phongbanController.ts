import { Request, Response } from "express";
import { phongBanService } from "../services/phongbanService";
// Không cần import phongBanValidation ở đây nữa

const getAllDept = async (req: Request, res: Response) => {
  try {
    const phongbans = await phongBanService.findAll();
    return res.status(200).json({success: true, data: phongbans,});
  } catch (error: any) {
    return res.status(500).json({success: false, message: error.message || "Internal Server Error"});
  }
};

const getDeptDetail = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const phongban = await phongBanService.findByID(id);
    
    return res.status(200).json({success: true, data: phongban});
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Không tìm thấy phòng ban"});
    }
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error",});
  }
};

const createDept = async (req: Request, res: Response) => {
  try {
    const data = await phongBanService.createDept(req.body);
    return res.status(201).json({ success: true, data });
  } catch (error: any) {
    if (error.message === "DUPLICATE") {
      return res.status(400).json({ success: false, message: "Phòng ban đã tồn tại" });
    }
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

const updateDept = async (req: Request<{ id: string }>, res: Response) => {
   try {
    const { id } = req.params;
    const data = await phongBanService.updateDept(id, req.body);
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Không tìm thấy phòng ban" });
    }
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  } 
};

const deleteDept = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const data = await phongBanService.deleteDept(id);
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Không tìm thấy phòng ban" });
    }
    if (error.message === "NOT_DELETE") {
      return res.status(400).json({ success: false, message: "Không thể xóa do phòng ban vẫn còn nhân viên" });
    }
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const phongBanController = { getAllDept, getDeptDetail, createDept, updateDept, deleteDept };
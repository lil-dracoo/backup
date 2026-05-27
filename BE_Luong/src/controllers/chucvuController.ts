import { Request, Response } from "express";
import { chucVuService } from "../services/chucvuService";
// Không cần import chucVuValidation ở đây nữa

const getAllPos = async (req: Request, res: Response) => {
  try {
    const chuc_vu_list = await chucVuService.getAllPos();
    
    return res.status(200).json({success: true, data: chuc_vu_list});
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error"});
  }
};

const getPosDetail = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const chuc_vu = await chucVuService.getPosDetail(id);
    
    return res.status(200).json({
      success: true,
      data: chuc_vu,
    });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({success: false, message: "Không tìm thấy chức vụ"});
    }
    return res.status(500).json({success: false, message: error.message || "Internal Server Error",
    });
  }
};

const createPos = async (req: Request, res: Response) => {
  try {
    const data = await chucVuService.createPos(req.body);
    return res.status(201).json({ success: true, data });
  } catch (error: any) {
    if (error.message === "DUPLICATE") {
      return res.status(400).json({ success: false, message: "Chức vụ đã tồn tại" });
    }
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

const updatePos = async (req: Request<{ id: string }>, res: Response) => {
   try {
    const { id } = req.params;
    const data = await chucVuService.updatePos(id, req.body);
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Không tìm thấy chức vụ" });
    }
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  } 
};

const deletePos = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const data = await chucVuService.deletePos(id);
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Không tìm thấy chức vụ" });
    }
    if (error.message === "NOT_DELETE") {
      return res.status(400).json({ success: false, message: "Không thể xóa do chức vụ vẫn còn nhân viên đang đảm nhận" });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const chucVuController = { getAllPos, getPosDetail, createPos, updatePos, deletePos };
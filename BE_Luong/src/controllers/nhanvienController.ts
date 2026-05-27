import { Request, Response } from "express";
import { nhanVienService } from "../services/nhanvienService";

const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const nv = await nhanVienService.getAllEmployees();
    return res.status(200).json({success: true, data: nv});
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || "Internal Server Error"});
  }
};

const getEmployeeDetail = async (req: Request<{ cccd: string }>, res: Response) => {
  try {
    const { cccd } = req.params;
    const nv = await nhanVienService.getEmployeeDetail(cccd);
    return res.status(200).json({success: true, data: nv});

  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy nhân viên",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const searchEmployees = async (req: Request<{}, {}, {}, { q?: string }>, res: Response) => {
  try {
    // Lấy từ khóa 'q' từ query URL (ví dụ: ?q=nguyen)
    const keyword = req.query.q || "";
    
    const data = await nhanVienService.searchEmployees(keyword);
    
    // Trả thẳng data về giống format của bạn
    res.json(data);
  } catch (error: any) {
    // Với search, nếu có lỗi catch được thì thường là lỗi Server/DB
    res.status(500).json({ error: error.message });
  }
};

export const nhanVienController = { getAllEmployees, getEmployeeDetail, searchEmployees };

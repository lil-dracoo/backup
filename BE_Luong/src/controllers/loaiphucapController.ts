import { Request, Response } from "express";
import { phucapService } from "../services/loaiphucapService";

const getAllLoaiPhuCap = async (req: Request, res: Response) => {
  try {
    const data = await phucapService.getAllLoaiPhuCap();
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || "Internal Server Error" });
  }
};

const getLoaiPhuCapById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const data = await phucapService.getLoaiPhuCapById(req.params.id);
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") return res.status(404).json({ success: false, message: "Không tìm thấy loại phụ cấp" });
    return res.status(500).json({ success: false, error: error.message || "Internal Server Error"});
  }
};

const createLoaiPhuCap = async (req: Request, res: Response) => {
  try {
    const data = await phucapService.createLoaiPhuCap(req.body);
    return res.status(201).json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || "Internal Server Error"});
  }
};

const updateLoaiPhuCap = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const data = await phucapService.updateLoaiPhuCap(req.params.id, req.body);
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") return res.status(404).json({ success: false, message: "Không tìm thấy loại phụ cấp" });
    return res.status(500).json({ success: false, error: error.message || "Internal Server Error"});
  }
};

const deleteLoaiPhuCap = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await phucapService.deleteLoaiPhuCap(req.params.id);
    return res.status(200).json({ success: true, message: "Xóa danh mục thành công" });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") return res.status(404).json({ success: false, message: "Không tìm thấy loại phụ cấp" });
    if (error.message === "NOT_DELETE") {
      return res.status(400).json({ success: false, message: "Không thể xóa vì loại phụ cấp này đang được sử dụng" });
    }
    return res.status(500).json({ success: false, error: error.message || "Internal Server Error"});
  }
};

export const phucapController = { getAllLoaiPhuCap, getLoaiPhuCapById, createLoaiPhuCap, updateLoaiPhuCap, deleteLoaiPhuCap };

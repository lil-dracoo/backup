import { Request, Response, NextFunction } from 'express';

// Tách logic kiểm tra tên chức vụ ra một hàm dùng chung để tránh lặp code
const checkTenChucVu = (ten_chuc_vu: string, errors: string[]) => {
  if (!ten_chuc_vu || ten_chuc_vu.trim() === "") {
    errors.push("Tên chức vụ không được để trống");
  } else if (ten_chuc_vu.length < 2 || ten_chuc_vu.length > 100) {
    errors.push("Tên chức vụ phải từ 2 đến 100 ký tự");
  } else if (!/^[\p{L}\s]+$/u.test(ten_chuc_vu)) {
    errors.push("Tên chức vụ chỉ được chứa chữ cái, không có số và ký tự đặc biệt");
  }
};

const validateCreate = (req: Request, res: Response, next: NextFunction): void => {
  const data = req.body;
  const errors: string[] = [];

  // 1. Kiểm tra id_chuc_vu
  if (!data.id_chuc_vu) {
    errors.push("ID chức vụ không được để trống");
  } else if (data.id_chuc_vu.length > 10) { // Đã sửa lại > 10 cho khớp thông báo
    errors.push("ID chức vụ không được vượt quá 10 ký tự");
  } else if (!/^[A-Z]+$/.test(data.id_chuc_vu)) {
    errors.push("ID chức vụ chỉ được chứa chữ cái VIẾT HOA");
  }

  // 2. Kiểm tra tên chức vụ
  checkTenChucVu(data.ten_chuc_vu, errors);

  // Nếu có lỗi, chặn request và trả về lỗi 400 (Bad Request) ngay lập tức
  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "Dữ liệu đầu vào không hợp lệ",
      errors: errors 
    });
    return; // Dừng thực thi
  }

  // Nếu dữ liệu đúng, cho phép đi tiếp vào Controller
  next();
};

const validateUpdate = (req: Request, res: Response, next: NextFunction): void => {
  const data = req.body;
  const errors: string[] = [];
  
  if (data.ten_chuc_vu !== undefined) {
    checkTenChucVu(data.ten_chuc_vu, errors);
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "Dữ liệu đầu vào không hợp lệ",
      errors: errors
    });
    return;
  }
  next();
};

export const chucVuValidation = { validateCreate, validateUpdate };
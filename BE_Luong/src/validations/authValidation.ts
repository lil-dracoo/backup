import { Request, Response, NextFunction } from 'express';

const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const data = req.body;
  const errors: string[] = [];

  if (!data.ten_tai_khoan || data.ten_tai_khoan.trim() === "") {
    errors.push("Tên tài khoản không được để trống");
  }

  if (!data.mat_khau || data.mat_khau.trim() === "") {
    errors.push("Mật khẩu không được để trống");
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

const validateChangePassword = (req: Request, res: Response, next: NextFunction): void => {
  const data = req.body;
  const errors: string[] = [];

  if (!data.mat_khau_cu || data.mat_khau_cu.trim() === "") {
    errors.push("Mật khẩu cũ không được để trống");
  }

  if (!data.mat_khau_moi || data.mat_khau_moi.trim() === "") {
    errors.push("Mật khẩu mới không được để trống");
  } else if (data.mat_khau_moi.length < 6) {
    errors.push("Mật khẩu mới phải có ít nhất 6 ký tự");
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

export const authValidation = { validateLogin, validateChangePassword };
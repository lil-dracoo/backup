import { Request, Response, NextFunction } from "express";

const checkTenPhongBan = (ten_pb: string, errors: string[]) => {
  if (!ten_pb || ten_pb.trim() === "") {
    errors.push("Tên phòng ban không được để trống");
  } else if (ten_pb.length < 2 || ten_pb.length > 100) {
    errors.push("Tên phòng ban phải từ 2 đến 100 ký tự");
  } else if (!/^[\p{L}\s]+$/u.test(ten_pb)) {
    errors.push("Tên phòng ban chỉ được chứa chữ cái (kể cả tiếng Việt), không có số và ký tự đặc biệt");
  }
};

const checkNgayThanhLap = (ngay_thanh_lap: string, errors: string[]) => {
  if (!ngay_thanh_lap) {
    errors.push("Ngày thành lập không được để trống");
  } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(ngay_thanh_lap)) {
    errors.push("Ngày thành lập phải có định dạng DD/MM/YYYY");
  }
};

const validateCreate = (req: Request, res: Response, next: NextFunction): void => {
  const data = req.body;
  const errors: string[] = [];

  // 1. Kiểm tra id_pb
  if (!data.id_pb) {
    errors.push("ID phòng ban không được để trống");
  } else if (data.id_pb.length > 10) {
    errors.push("ID phòng ban không được vượt quá 10 ký tự");
  } else if (!/^[A-Z]+$/.test(data.id_pb)) {
    errors.push("ID phòng ban chỉ được chứa chữ cái VIẾT HOA");
  }

  // 2. Kiểm tra tên phòng ban
  checkTenPhongBan(data.ten_pb, errors);

  // 3. Kiểm tra ngày thành lập
  checkNgayThanhLap(data.ngay_thanh_lap, errors);

  if (errors.length > 0) {
    res.status(400).json({ success: false, message: "Dữ liệu đầu vào không hợp lệ", errors: errors });
    return;
  }
  next();
};

const validateUpdate = (req: Request, res: Response, next: NextFunction): void => {
  const data = req.body;
  const errors: string[] = [];

  // 1. Kiểm tra tên phòng ban (nếu có gửi lên)
  if (data.ten_pb !== undefined) {
    checkTenPhongBan(data.ten_pb, errors);
  }

  // 2. Kiểm tra ngày thành lập (nếu có gửi lên)
  if (data.ngay_thanh_lap !== undefined) {
    checkNgayThanhLap(data.ngay_thanh_lap, errors);
  }

  if (errors.length > 0) {
    res.status(400).json({ success: false, message: "Dữ liệu đầu vào không hợp lệ", errors: errors });
    return;
  }
  next();
};

export const phongBanValidation = { validateCreate, validateUpdate };
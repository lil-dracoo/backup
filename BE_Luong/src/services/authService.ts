import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import {authRepository} from "../repositories/authRepository";

const loginService = async (ten_tai_khoan: string, mat_khau: string) => {
  // 1. Prisma sử dụng findUnique thay vì findByPk
  const user = await authRepository.findUser(ten_tai_khoan);

  if (!user) throw new Error("Tài khoản / mật khẩu không chính xác");

  // So sánh mật khẩu băm
  const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
  if (!isMatch) {
    throw new Error("Tài khoản / mật khẩu không chính xác");
  }

  // Thuộc tính trang_thai trong CSDL là kiểu chuỗi: "HOATDONG",...
  if (user.trang_thai !== "HOATDONG") {
    throw new Error("Tài khoản / mật khẩu không chính xác");
  }
const secret = process.env.JWT_SECRET || "secret"; 
const token = jwt.sign(
  { 
    cccd: user.nhan_vien?.cccd, 
    ten_tai_khoan: user.ten_tai_khoan, 
    role: user.vai_tro?.ten_vai_tro 
  },
  secret,
  {expiresIn: "30m"}
);

  return {
    token
  };
};

export { loginService };
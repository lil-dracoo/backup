import { Request, Response } from "express";
import { loginService } from "../services/authService";

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ten_tai_khoan, mat_khau } = req.body;
    const result = await loginService(ten_tai_khoan, mat_khau);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: "Tài khoản hoặc mật khẩu không chính xác" });
  }
};

export { login };
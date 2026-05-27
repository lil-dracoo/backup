import { prisma } from "../config/prisma";

const findUser = async (ten_tai_khoan: string) => {
    return await prisma.tai_khoan.findUnique({
    where: { ten_tai_khoan: ten_tai_khoan },
    include: {
      nhan_vien: true,
      vai_tro: true
    }
  });
}

export const authRepository = {
    findUser
}
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client/index";
const bcrypt = require("bcrypt");
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter }); // ✅ v7 đúng chuẩn

// =========================
// HÀM HỖ TRỢ TẠO DỮ LIỆU
// =========================

// Mã tỉnh cho CCCD (3 số) và BHYT (2 số cuối)
const provinces = [
  { code3: "079", code2: "79", name: "TP Hồ Chí Minh" },
  { code3: "001", code2: "01", name: "Hà Nội" },
  { code3: "048", code2: "48", name: "Đà Nẵng" },
  { code3: "031", code2: "31", name: "Hải Phòng" },
  { code3: "074", code2: "74", name: "Bình Dương" },
  { code3: "070", code2: "70", name: "Đồng Nai" },
  { code3: "026", code2: "26", name: "Cần Thơ" },
  { code3: "056", code2: "56", name: "Khánh Hòa" },
  { code3: "038", code2: "38", name: "Quảng Ninh" },
  { code3: "045", code2: "45", name: "Thừa Thiên Huế" },
  { code3: "075", code2: "75", name: "Long An" },
  { code3: "072", code2: "72", name: "Tây Ninh" },
  { code3: "060", code2: "60", name: "Bình Thuận" },
  { code3: "058", code2: "58", name: "Bà Rịa - Vũng Tàu" },
  { code3: "066", code2: "66", name: "Đắk Lắk" },
  { code3: "067", code2: "67", name: "Đắk Nông" },
  { code3: "068", code2: "68", name: "Đồng Tháp" },
  { code3: "069", code2: "69", name: "Hậu Giang" },
  { code3: "071", code2: "71", name: "Tiền Giang" },
  { code3: "073", code2: "73", name: "Trà Vinh" },
];

// Mã đối tượng BHYT (2 chữ cái đầu)
const bhyyObjects = [
  { code: "DN", name: "Doanh nghiệp" },
  { code: "HC", name: "Cán bộ công chức" },
  { code: "QN", name: "Quân nhân" },
  { code: "CC", name: "Công chức" },
  { code: "TB", name: "Thương binh" },
  { code: "NT", name: "Người nghèo" },
  { code: "TE", name: "Trẻ em" },
];

// Mức hưởng BHYT (1-5)
const benefitLevels = ["1", "2", "3", "4", "5"];

// Hàm xác định mã giới tính + thế kỷ cho CCCD
function getGenderCenturyCode(gender: boolean, birthYear: number): string {
  const century = Math.floor(birthYear / 100);

  if (century === 19) {
    // 1900-1999
    return gender ? "1" : "0"; // Nữ: 1, Nam: 0
  } else if (century === 20) {
    // 2000-2099
    return gender ? "3" : "2"; // Nữ: 3, Nam: 2
  } else if (century === 21) {
    // 2100-2199
    return gender ? "5" : "4"; // Nữ: 5, Nam: 4
  }
  return gender ? "1" : "0"; // Mặc định thế kỷ 20
}

function generateRandomSixDigits(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function removeVietnameseTones(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

// Tạo CCCD theo format chuẩn: 3 số tỉnh + 1 số (giới tính+thế kỷ) + 2 số năm sinh + 6 số random
function generateCCCD(
  provinceCode: string,
  gender: boolean,
  birthYear: number,
): string {
  const province = provinceCode; // 3 số mã tỉnh
  const genderCenturyCode = getGenderCenturyCode(gender, birthYear); // 1 số: giới tính + thế kỷ
  const yearTwoDigits = birthYear.toString().slice(-2); // 2 số cuối của năm sinh
  const random = generateRandomSixDigits();

  return `${province}${genderCenturyCode}${yearTwoDigits}${random}`;
}

// Tạo BHYT theo format: 2 chữ cái + 1 số (mức hưởng) + 2 số (mã tỉnh) + 10 số cuối CCCD
function generateBHYT(cccd: string, provinceCode2: string): string {
  const objectCode =
    bhyyObjects[Math.floor(Math.random() * bhyyObjects.length)].code;
  const benefitLevel =
    benefitLevels[Math.floor(Math.random() * benefitLevels.length)];
  const last10OfCCCD = cccd.slice(-10); // Lấy 10 số cuối của CCCD

  return `${objectCode}${benefitLevel}${provinceCode2}${last10OfCCCD}`;
}

// Tạo số điện thoại
function generatePhone(): string {
  const prefixes = [
    "091",
    "098",
    "097",
    "096",
    "095",
    "094",
    "093",
    "092",
    "090",
    "089",
    "088",
    "086",
    "085",
    "084",
    "083",
    "082",
    "081",
    "079",
    "078",
    "077",
    "076",
    "075",
    "074",
    "073",
    "072",
    "071",
    "070",
  ];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 10000000)
    .toString()
    .padStart(7, "0");
  return `${prefix}${number}`;
}

// Tạo email từ tên
function generateEmail(
  fullName: string,
  domain: string = "company.com",
): string {
  const emailBase = removeVietnameseTones(fullName)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "");
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `${emailBase}${randomNum}@${domain}`;
}

// Danh sách tên thật
const firstNames = [
  "Nguyễn",
  "Trần",
  "Lê",
  "Phạm",
  "Hoàng",
  "Huỳnh",
  "Võ",
  "Đặng",
  "Bùi",
  "Đỗ",
  "Hồ",
  "Ngô",
  "Dương",
  "Lý",
  "Vũ",
  "Phan",
  "Trương",
  "Quách",
  "Mai",
  "Lương",
  "Châu",
  "La",
  "Lâm",
  "Quảng",
  "Thái",
  "Triệu",
  "Tôn",
  "Tăng",
  "Trịnh",
  "Lữ",
];

const middleNames = [
  "Văn",
  "Thị",
  "Hữu",
  "Đức",
  "Minh",
  "Thanh",
  "Ngọc",
  "Quốc",
  "Bảo",
  "Anh",
  "Tuấn",
  "Thành",
  "Công",
  "Xuân",
  "Hồng",
  "Kim",
  "Thúy",
  "Hương",
  "Phương",
  "Lan",
  "Mỹ",
  "Nhật",
  "Phúc",
  "Quang",
  "Thái",
  "Thiên",
  "Thu",
  "Trọng",
  "Việt",
  "Vinh",
];

const lastNames = [
  "An",
  "Bình",
  "Hưng",
  "Dũng",
  "Cường",
  "Mạnh",
  "Tuấn",
  "Thắng",
  "Quang",
  "Huy",
  "Hoa",
  "Hồng",
  "Mai",
  "Lan",
  "Phượng",
  "Thảo",
  "Vân",
  "Trang",
  "Linh",
  "Ngân",
  "Anh",
  "Bảo",
  "Chi",
  "Duyên",
  "Hà",
  "Hiếu",
  "Khánh",
  "Lam",
  "My",
  "Nhi",
];

// Tạo tên ngẫu nhiên
function generateFullName(): string {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const middleName =
    middleNames[Math.floor(Math.random() * middleNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${middleName} ${lastName}`;
}

// Tạo ngày sinh ngẫu nhiên (từ 20-60 tuổi, thế kỷ 20 hoặc 21)
function generateRandomBirthDate(): Date {
  const currentYear = new Date().getFullYear();
  // 70% sinh thế kỷ 20 (1965-1999), 30% sinh thế kỷ 21 (2000-2004)
  const is20thCentury = Math.random() < 0.7;

  let year: number;
  if (is20thCentury) {
    year = 1965 + Math.floor(Math.random() * 35); // 1965-1999
  } else {
    year = 2000 + Math.floor(Math.random() * 5); // 2000-2004
  }

  const month = Math.floor(Math.random() * 12);
  const day = Math.floor(Math.random() * 28) + 1;
  return new Date(year, month, day);
}

// Tạo ngày vào làm (từ 18-22 tuổi trở lên)
function generateRandomStartDate(birthDate: Date): Date {
  const minStartYear = birthDate.getFullYear() + 22;
  const maxStartYear = new Date().getFullYear();
  const startYear =
    minStartYear + Math.random() * (maxStartYear - minStartYear);
  const month = Math.floor(Math.random() * 12);
  const day = Math.floor(Math.random() * 28) + 1;
  return new Date(startYear, month, day);
}

async function main() {
  console.log("🌱 Start seeding...");

  // =========================
  // 1. DỮ LIỆU CƠ BẢN
  // =========================

  console.log("📋 Creating basic data...");

  // Chức vụ
  const chucVuData = [
    { id_chuc_vu: "GD", ten_chuc_vu: "Giám đốc", trang_thai: "hoat_dong" },
    { id_chuc_vu: "PGD", ten_chuc_vu: "Phó Giám đốc" , trang_thai: "hoat_dong" },
    { id_chuc_vu: "TP", ten_chuc_vu: "Trưởng phòng" , trang_thai: "hoat_dong" },
    { id_chuc_vu: "PP", ten_chuc_vu: "Phó phòng" , trang_thai: "hoat_dong" },
    { id_chuc_vu: "NV", ten_chuc_vu: "Nhân viên" , trang_thai: "hoat_dong" },
    { id_chuc_vu: "KT", ten_chuc_vu: "Kế toán trưởng" , trang_thai: "hoat_dong" },
    { id_chuc_vu: "KTV", ten_chuc_vu: "Kế toán viên" , trang_thai: "hoat_dong" },
    { id_chuc_vu: "HC", ten_chuc_vu: "Chuyên viên hành chính" , trang_thai: "hoat_dong" },
    { id_chuc_vu: "NS", ten_chuc_vu: "Chuyên viên nhân sự" , trang_thai: "hoat_dong" },
    { id_chuc_vu: "IT", ten_chuc_vu: "Kỹ sư CNTT" , trang_thai: "hoat_dong" },
    { id_chuc_vu: "KD", ten_chuc_vu: "Chuyên viên kinh doanh" , trang_thai: "hoat_dong" },
    { id_chuc_vu: "MK", ten_chuc_vu: "Chuyên viên Marketing", trang_thai: "hoat_dong" },
  ];

  for (const cv of chucVuData) {
    await prisma.chuc_vu.upsert({
      where: { id_chuc_vu: cv.id_chuc_vu },
      update: {},
      create: cv,
    });
  }

  // Phòng ban
  const phongBanData = [
    {
      id_pb: "BGĐ",
      ten_pb: "Ban Giám đốc",
      ngay_thanh_lap: new Date("2020-01-01"),
      trang_thai: "hoat_dong",
      mo_ta: "Quản lý điều hành công ty",
    },
    {
      id_pb: "HCNS",
      ten_pb: "Hành chính - Nhân sự",
      ngay_thanh_lap: new Date("2020-01-01"),
      trang_thai: "hoat_dong",
      mo_ta: "Quản lý nhân sự và hành chính",
    },
    {
      id_pb: "KT",
      ten_pb: "Kế toán - Tài chính",
      ngay_thanh_lap: new Date("2020-01-01"),
      trang_thai: "hoat_dong",
      mo_ta: "Quản lý tài chính kế toán",
    },
    {
      id_pb: "KD",
      ten_pb: "Kinh doanh",
      ngay_thanh_lap: new Date("2020-01-01"),
      trang_thai: "hoat_dong",
      mo_ta: "Phát triển kinh doanh",
    },
    {
      id_pb: "IT",
      ten_pb: "Công nghệ thông tin",
      ngay_thanh_lap: new Date("2021-06-01"),
      trang_thai: "hoat_dong",
      mo_ta: "Phát triển và vận hành hệ thống",
    },
    {
      id_pb: "MK",
      ten_pb: "Marketing",
      ngay_thanh_lap: new Date("2021-06-01"),
      trang_thai: "hoat_dong",
      mo_ta: "Quảng bá thương hiệu",
    },
    {
      id_pb: "ĐT",
      ten_pb: "Đào tạo",
      ngay_thanh_lap: new Date("2022-01-01"),
      trang_thai: "hoat_dong",
      mo_ta: "Đào tạo và phát triển",
    },
    {
      id_pb: "CSKH",
      ten_pb: "Chăm sóc khách hàng",
      ngay_thanh_lap: new Date("2022-01-01"),
      trang_thai: "hoat_dong",
      mo_ta: "Chăm sóc khách hàng",
    },
  ];

  for (const pb of phongBanData) {
    await prisma.phong_ban.upsert({
      where: { id_pb: pb.id_pb },
      update: {},
      create: pb,
    });
  }

  // Loại quyết định nhân sự
  const loaiQDNSData = [
    { id_loai_qd_ns: "TD", ten_loai_qd_ns: "Tuyển dụng" },
    { id_loai_qd_ns: "TDN", ten_loai_qd_ns: "Thuyên chuyển" },
    { id_loai_qd_ns: "CB", ten_loai_qd_ns: "Bổ nhiệm" },
    { id_loai_qd_ns: "NV", ten_loai_qd_ns: "Nghỉ việc" },
  ];

  for (const lqd of loaiQDNSData) {
    await prisma.loai_qd_nhan_su.upsert({
      where: { id_loai_qd_ns: lqd.id_loai_qd_ns },
      update: {},
      create: lqd,
    });
  }

  // Loại quyết định lương
  const loaiQDLuongData = [
    { id_loai_qd_luong: "TL", ten_loai_qd_luong: "Tăng lương" },
    { id_loai_qd_luong: "GL", ten_loai_qd_luong: "Giảm lương" },
    { id_loai_qd_luong: "CT", ten_loai_qd_luong: "Chuyển lương" },
    { id_loai_qd_luong: "TD", ten_loai_qd_luong: "Tuyển dụng" },
  ];

  for (const lqd of loaiQDLuongData) {
    await prisma.loai_qd_luong.upsert({
      where: { id_loai_qd_luong: lqd.id_loai_qd_luong },
      update: {},
      create: lqd,
    });
  }

  // Ngân hàng
  const nganHangData = [
    { ten_ngan_hang: "Vietcombank" },
    { ten_ngan_hang: "Techcombank" },
    { ten_ngan_hang: "BIDV" },
    { ten_ngan_hang: "VietinBank" },
    { ten_ngan_hang: "Agribank" },
    { ten_ngan_hang: "MB Bank" },
    { ten_ngan_hang: "Sacombank" },
    { ten_ngan_hang: "VPBank" },
    { ten_ngan_hang: "TPBank" },
    { ten_ngan_hang: "ACB" },
  ];

  for (const nh of nganHangData) {
    const existingNganHang = await prisma.ngan_hang.findFirst({
      where: { ten_ngan_hang: nh.ten_ngan_hang },
    });

    if (!existingNganHang) {
      await prisma.ngan_hang.create({
        data: { ten_ngan_hang: nh.ten_ngan_hang },
      });
    }
  }

  // Loại phụ cấp
  const loaiPhuCapData = [
    { id_loai_pc: "CV", ten_loai: "Phụ cấp chức vụ" },
    { id_loai_pc: "TN", ten_loai: "Phụ cấp trách nhiệm" },
    { id_loai_pc: "DC", ten_loai: "Phụ cấp đi lại" },
    { id_loai_pc: "AN", ten_loai: "Phụ cấp ăn trưa" },
  ];

  for (const lpc of loaiPhuCapData) {
    await prisma.loai_phu_cap.upsert({
      where: { id_loai_pc: lpc.id_loai_pc },
      update: {},
      create: lpc,
    });
  }

  // Loại khấu trừ
  const loaiKhauTruData = [
    {
      id_loai_khau_tru: "BHXH",
      ten_loai: "Bảo hiểm xã hội",
      loai_tinh: "PHAN_TRAM",
    },
    {
      id_loai_khau_tru: "BHYT",
      ten_loai: "Bảo hiểm y tế",
      loai_tinh: "PHAN_TRAM",
    },
    {
      id_loai_khau_tru: "BHTN",
      ten_loai: "Bảo hiểm thất nghiệp",
      loai_tinh: "PHAN_TRAM",
    },
    { id_loai_khau_tru: "KT", ten_loai: "Khấu trừ khác", loai_tinh: "SO_TIEN" },
  ];

  for (const lkt of loaiKhauTruData) {
    await prisma.loai_khau_tru.upsert({
      where: { id_loai_khau_tru: lkt.id_loai_khau_tru },
      update: {},
      create: lkt,
    });
  }

  // Bậc thuế TNCN
  const bacThueData = [
    {
      id_bac_thue: "B1",
      ten_bac_thue: "Bậc 1",
      thu_nhap_tu: 0,
      thu_nhap_den: 5000000,
      phan_tram_thue: 5,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_thue: "B2",
      ten_bac_thue: "Bậc 2",
      thu_nhap_tu: 5000000,
      thu_nhap_den: 10000000,
      phan_tram_thue: 10,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_thue: "B3",
      ten_bac_thue: "Bậc 3",
      thu_nhap_tu: 10000000,
      thu_nhap_den: 18000000,
      phan_tram_thue: 15,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_thue: "B4",
      ten_bac_thue: "Bậc 4",
      thu_nhap_tu: 18000000,
      thu_nhap_den: 32000000,
      phan_tram_thue: 20,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_thue: "B5",
      ten_bac_thue: "Bậc 5",
      thu_nhap_tu: 32000000,
      thu_nhap_den: 52000000,
      phan_tram_thue: 25,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_thue: "B6",
      ten_bac_thue: "Bậc 6",
      thu_nhap_tu: 52000000,
      thu_nhap_den: 80000000,
      phan_tram_thue: 30,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_thue: "B7",
      ten_bac_thue: "Bậc 7",
      thu_nhap_tu: 80000000,
      thu_nhap_den: 1000000000,
      phan_tram_thue: 35,
      ngay_ap_dung: new Date("2024-01-01"),
    },
  ];

  for (const bt of bacThueData) {
    await prisma.bac_thue_tncn.upsert({
      where: { id_bac_thue: bt.id_bac_thue },
      update: {},
      create: bt,
    });
  }

  // Giảm trừ gia cảnh
  const giamTruData = [
    {
      id_giam_tru: "GT2024",
      giam_tru_ban_than: 11000000,
      giam_tru_nguoi_phu_thuoc: 4400000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
  ];

  for (const gt of giamTruData) {
    await prisma.giam_tru_gia_canh.upsert({
      where: { id_giam_tru: gt.id_giam_tru },
      update: {},
      create: gt,
    });
  }

  // Bậc lương
  const bacLuongData = [
    {
      id_bac_luong: "B1",
      id_chuc_vu: "GD",
      luong_p1: 30000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B2",
      id_chuc_vu: "GD",
      luong_p1: 35000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B1",
      id_chuc_vu: "PGD",
      luong_p1: 25000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B1",
      id_chuc_vu: "TP",
      luong_p1: 18000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B2",
      id_chuc_vu: "TP",
      luong_p1: 22000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B1",
      id_chuc_vu: "PP",
      luong_p1: 15000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B1",
      id_chuc_vu: "NV",
      luong_p1: 8000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B2",
      id_chuc_vu: "NV",
      luong_p1: 10000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B3",
      id_chuc_vu: "NV",
      luong_p1: 12000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B1",
      id_chuc_vu: "KT",
      luong_p1: 20000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B1",
      id_chuc_vu: "KTV",
      luong_p1: 10000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B1",
      id_chuc_vu: "HC",
      luong_p1: 9000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B1",
      id_chuc_vu: "NS",
      luong_p1: 9000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B1",
      id_chuc_vu: "IT",
      luong_p1: 12000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B2",
      id_chuc_vu: "IT",
      luong_p1: 15000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B1",
      id_chuc_vu: "KD",
      luong_p1: 9000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
    {
      id_bac_luong: "B1",
      id_chuc_vu: "MK",
      luong_p1: 9000000,
      ngay_ap_dung: new Date("2024-01-01"),
    },
  ];

  for (const bl of bacLuongData) {
    await prisma.bac_luong.upsert({
      where: {
        id_bac_luong_id_chuc_vu: {
          id_bac_luong: bl.id_bac_luong,
          id_chuc_vu: bl.id_chuc_vu,
        },
      },
      update: {},
      create: bl,
    });
  }

  // =========================
  // 2. TẠO VAI TRÒ
  // =========================
  console.log("👥 Creating roles...");

  const vaiTroData = [
    { ten_vai_tro: "admin" },
    { ten_vai_tro: "giám đốc" },
    { ten_vai_tro: "trưởng phòng" },
    { ten_vai_tro: "kế toán" },
    { ten_vai_tro: "hr" },
    { ten_vai_tro: "nhân viên" },
  ];

  const vaiTroMap = new Map();
  for (const vt of vaiTroData) {
    // prisma upsert requires a unique field in `where`. ten_vai_tro is not unique in the schema,
    // so use findFirst/create logic instead.
    let created = await prisma.vai_tro.findFirst({
      where: { ten_vai_tro: vt.ten_vai_tro },
    });
    if (!created) {
      created = await prisma.vai_tro.create({ data: vt });
    }
    vaiTroMap.set(vt.ten_vai_tro, created.id_vai_tro);
  }

  // =========================
  // 3. TẠO NHÂN VIÊN (30 NHÂN VIÊN VỚI CCCD & BHYT ĐÚNG FORMAT)
  // =========================
  console.log("👨‍💼 Creating 30 employees with correct CCCD & BHYT format...");

  const hashedPassword = await bcrypt.hash("123456", 10);
  const nhanVienList = [];

  for (let i = 1; i <= 30; i++) {
    const fullName = generateFullName();
    const nameParts = fullName.split(" ");
    const birthDate = generateRandomBirthDate();
    const birthYear = birthDate.getFullYear();
    const startDate = generateRandomStartDate(birthDate);
    const province = provinces[Math.floor(Math.random() * provinces.length)];
    const gender = Math.random() > 0.5; // true: Nữ, false: Nam

    // Tạo CCCD theo format chuẩn (đã chỉnh sửa thế kỷ)
    const cccd = generateCCCD(province.code3, gender, birthYear);

    // Tạo BHYT theo format chuẩn
    const so_bhyt = generateBHYT(cccd, province.code2);

    // Xác định chức vụ và phòng ban
    let chucVu = "NV";
    let phongBan = "";
    let role = "nhân viên";
    let luongBac = "B1";

    if (i === 1) {
      chucVu = "GD";
      phongBan = "BGĐ";
      role = "giám đốc";
      luongBac = "B2";
    } else if (i === 2) {
      chucVu = "PGD";
      phongBan = "BGĐ";
      role = "nhân viên";
      luongBac = "B1";
    } else if (i === 3) {
      chucVu = "TP";
      phongBan = "HCNS";
      role = "trưởng phòng";
      luongBac = "B2";
    } else if (i === 4) {
      chucVu = "KT";
      phongBan = "KT";
      role = "kế toán";
      luongBac = "B1";
    } else if (i === 5) {
      chucVu = "NS";
      phongBan = "HCNS";
      role = "hr";
      luongBac = "B1";
    } else if (i === 6) {
      chucVu = "TP";
      phongBan = "IT";
      role = "trưởng phòng";
      luongBac = "B1";
    } else if (i === 7) {
      chucVu = "TP";
      phongBan = "KD";
      role = "trưởng phòng";
      luongBac = "B1";
    } else if (i === 8) {
      chucVu = "TP";
      phongBan = "KT";
      role = "kế toán";
      luongBac = "B1";
    } else if (i === 9) {
      chucVu = "PP";
      phongBan = "HCNS";
      role = "nhân viên";
      luongBac = "B1";
    } else if (i === 10) {
      chucVu = "PP";
      phongBan = "IT";
      role = "nhân viên";
      luongBac = "B1";
    } else if (i >= 11 && i <= 15) {
      chucVu = "IT";
      phongBan = "IT";
      role = "nhân viên";
      luongBac = i % 2 === 0 ? "B2" : "B1";
    } else if (i >= 16 && i <= 20) {
      chucVu = "KD";
      phongBan = "KD";
      role = "nhân viên";
      luongBac = "B1";
    } else if (i >= 21 && i <= 25) {
      chucVu = "MK";
      phongBan = "MK";
      role = "nhân viên";
      luongBac = "B1";
    } else {
      chucVu = "HC";
      phongBan = "HCNS";
      role = "nhân viên";
      luongBac = "B1";
    }

    // Tạo email và số điện thoại
    const email = generateEmail(fullName);
    const sdt = generatePhone();

    // Tạo địa chỉ
    const diaChi = `${Math.floor(Math.random() * 200) + 1} ${["Nguyễn Huệ", "Lê Lợi", "Trần Hưng Đạo", "Phạm Ngũ Lão", "Võ Văn Kiệt"][Math.floor(Math.random() * 5)]}, ${province.name}`;

    // Tạo chuyên ngành
    const chuyenNganhList = [
      "Quản trị kinh doanh",
      "Kế toán",
      "Công nghệ thông tin",
      "Marketing",
      "Nhân sự",
      "Luật",
      "Tài chính ngân hàng",
      "Ngoại thương",
    ];
    const chuyenNganh =
      chuyenNganhList[Math.floor(Math.random() * chuyenNganhList.length)];

    // Trạng thái
    const trangThai = Math.random() > 0.1 ? "DANG_LAM_VIEC" : "DA_NGHI_VIEC";

    nhanVienList.push({
      cccd,
      ho_ten: fullName,
      gioi_tinh: gender,
      sdt,
      email,
      ngay_sinh: birthDate,
      dan_toc: "Kinh",
      dia_chi: diaChi,
      chuyen_nganh: chuyenNganh,
      ngay_vao_lam: startDate,
      ngay_nghi_viec: trangThai === "DA_NGHI_VIEC" ? new Date() : null,
      trang_thai: trangThai,
      so_bhyt,
      chuc_vu: chucVu,
      phong_ban: phongBan,
      role,
      luong_bac: luongBac,
    });
  }

  // Tạo tài khoản và nhân viên
  const createdEmployees = [];

  for (const nv of nhanVienList) {
    const existingEmployee = await prisma.nhan_vien.findUnique({
      where: { cccd: nv.cccd },
    });

    if (!existingEmployee) {
      const taiKhoan = await prisma.tai_khoan.create({
        data: {
          ten_tai_khoan: nv.email.split("@")[0],
          mat_khau: hashedPassword,
          trang_thai: "HOATDONG",
          dang_nhap_lan_dau: true,
          id_vai_tro: vaiTroMap.get(nv.role),
        },
      });

      const employee = await prisma.nhan_vien.create({
        data: {
          cccd: nv.cccd,
          ho_ten: nv.ho_ten,
          gioi_tinh: nv.gioi_tinh,
          sdt: nv.sdt,
          email: nv.email,
          ngay_sinh: nv.ngay_sinh,
          dan_toc: nv.dan_toc,
          dia_chi: nv.dia_chi,
          chuyen_nganh: nv.chuyen_nganh,
          ngay_vao_lam: nv.ngay_vao_lam,
          ngay_nghi_viec: nv.ngay_nghi_viec,
          trang_thai: nv.trang_thai,
          so_bhyt: nv.so_bhyt,
          id_tai_khoan: taiKhoan.id_tai_khoan,
        },
      });
      createdEmployees.push(employee);

      // Hiển thị thông tin CCCD và BHYT để kiểm tra
      const genderText = nv.gioi_tinh ? "Nữ" : "Nam";
      const birthYear = nv.ngay_sinh?.getFullYear();
      const century = Math.floor((birthYear || 0) / 100);
      const centuryText =
        century === 19
          ? "Thế kỷ 20"
          : century === 20
            ? "Thế kỷ 21"
            : "Thế kỷ 22";

      console.log(`✅ ${nv.ho_ten} (${genderText}, ${centuryText})`);
      console.log(`   CCCD: ${nv.cccd} | BHYT: ${nv.so_bhyt}`);
      console.log(
        `   Ngày sinh: ${nv.ngay_sinh?.toLocaleDateString("vi-VN")} | Vào làm: ${nv.ngay_vao_lam?.toLocaleDateString("vi-VN")}`,
      );
      console.log(`   ${nv.chuc_vu} - ${nv.phong_ban}\n`);
    } else {
      createdEmployees.push(existingEmployee);
      console.log(`⏭️ Skipped: ${nv.ho_ten} (${nv.cccd})`);
    }
  }

  // Tạo tài khoản admin
  const adminExists = await prisma.tai_khoan.findUnique({
    where: { ten_tai_khoan: "admin" },
  });

  if (!adminExists) {
    await prisma.tai_khoan.create({
      data: {
        ten_tai_khoan: "admin",
        mat_khau: hashedPassword,
        trang_thai: "HOATDONG",
        dang_nhap_lan_dau: false,
        id_vai_tro: vaiTroMap.get("admin"),
      },
    });
    console.log("✅ Created admin account");
  }

  // =========================
  // 4. TẠO QUAN HỆ THÂN NHÂN
  // =========================
  console.log("👨‍👩‍👧‍👦 Creating family relationships...");

  const moiQuanHeData = [
    { ten_quan_he: "Cha" },
    { ten_quan_he: "Mẹ" },
    { ten_quan_he: "Vợ" },
    { ten_quan_he: "Chồng" },
    { ten_quan_he: "Con" },
  ];

  for (const mqh of moiQuanHeData) {
    const existingQuanHe = await prisma.moi_quan_he.findFirst({
      where: { ten_quan_he: mqh.ten_quan_he },
    });

    if (!existingQuanHe) {
      await prisma.moi_quan_he.create({
        data: { ten_quan_he: mqh.ten_quan_he },
      });
    }
  }

  const relationships = await prisma.moi_quan_he.findMany();

  // Tạo thân nhân
  const thanNhanList = [];
  for (let i = 1; i <= 20; i++) {
    const tnFullName = generateFullName();
    thanNhanList.push({
      ma_dinh_danh: `12345678${String(i).padStart(4, "0")}`,
      ten_tn: tnFullName,
      ngay_sinh: generateRandomBirthDate(),
    });
  }

  for (const tn of thanNhanList) {
    await prisma.than_nhan.upsert({
      where: { ma_dinh_danh: tn.ma_dinh_danh },
      update: {},
      create: tn,
    });
  }

  const allThanNhan = await prisma.than_nhan.findMany();

  for (let i = 0; i < createdEmployees.length && i < allThanNhan.length; i++) {
    const employee = createdEmployees[i];
    const relative = allThanNhan[i % allThanNhan.length];
    const relationship =
      relationships[Math.floor(Math.random() * relationships.length)];

    await prisma.tnhan_nvien.upsert({
      where: {
        cccd_ma_dinh_danh: {
          cccd: employee.cccd,
          ma_dinh_danh: relative.ma_dinh_danh,
        },
      },
      update: {},
      create: {
        cccd: employee.cccd,
        ma_dinh_danh: relative.ma_dinh_danh,
        id_mqh: relationship.id_mqh,
      },
    });
  }

  // =========================
  // 5. TẠO TÀI KHOẢN NGÂN HÀNG
  // =========================
  console.log("🏦 Creating bank accounts...");

  const allNganHang = await prisma.ngan_hang.findMany();

  for (const employee of createdEmployees.slice(0, 25)) {
    const nganHang =
      allNganHang[Math.floor(Math.random() * allNganHang.length)];
    const stk = `STK${Math.floor(Math.random() * 1000000000000)
      .toString()
      .padStart(12, "0")}`;

    await prisma.tai_khoan_ngan_hang.upsert({
      where: { stk },
      update: {},
      create: {
        stk,
        chi_nhanh: `${nganHang.ten_ngan_hang} - Chi nhánh ${["Hà Nội", "TP HCM", "Đà Nẵng"][Math.floor(Math.random() * 3)]}`,
        ngay_mo_the: new Date(employee.ngay_vao_lam || new Date()),
        trang_thai: "HOAT_DONG",
        id_ngan_hang: nganHang.id_ngan_hang,
        cccd: employee.cccd,
      },
    });
  }

  // =========================
  // 6. TẠO PHỤ CẤP
  // =========================
  console.log("💰 Creating allowances...");

    const phuCapData = [
      {
        id_pc: "PC01",
        ten_pc: "Phụ cấp chức vụ",
        kieu_tinh: "SO_TIEN",
        id_loai_pc: "CV",
      },
      {
        id_pc: "PC02",
        ten_pc: "Phụ cấp trách nhiệm",
        kieu_tinh: "SO_TIEN",
        id_loai_pc: "TN",
      },
      {
        id_pc: "PC03",
        ten_pc: "Phụ cấp đi lại",
        kieu_tinh: "SO_TIEN",
        id_loai_pc: "DC",
      },
      {
        id_pc: "PC04",
        ten_pc: "Phụ cấp ăn trưa",
        kieu_tinh: "SO_TIEN",
        id_loai_pc: "AN",
      },
    ];

    for (const pc of phuCapData) {
      await prisma.phu_cap.upsert({
        where: { id_pc: pc.id_pc },
        update: {},
        create: pc,
      });
    }

    const mucPhuCapData = [
      {
        id_muc_pc: "MPC01",
        id_phu_cap: "PC01",
        so_tien: 5000000,
        ngay_ap_dung: new Date("2024-01-01"),
      },
      {
        id_muc_pc: "MPC02",
        id_phu_cap: "PC02",
        so_tien: 3000000,
        ngay_ap_dung: new Date("2024-01-01"),
      },
      {
        id_muc_pc: "MPC03",
        id_phu_cap: "PC03",
        so_tien: 1000000,
        ngay_ap_dung: new Date("2024-01-01"),
      },
      {
        id_muc_pc: "MPC04",
        id_phu_cap: "PC04",
        so_tien: 800000,
        ngay_ap_dung: new Date("2024-01-01"),
      },
    ];

    for (const mpc of mucPhuCapData) {
      await prisma.muc_phu_cap.upsert({
        where: { id_muc_pc: mpc.id_muc_pc },
        update: {},
        create: mpc,
      });
    }

    const allMucPhuCap = await prisma.muc_phu_cap.findMany();

    for (let i = 0; i < createdEmployees.length; i++) {
      const employee = createdEmployees[i];
      const mucPC = allMucPhuCap[i % allMucPhuCap.length];

      await prisma.phu_cap_nhan_vien.upsert({
        where: {
          id_phu_cap_nv: `PCNV${String(i + 1).padStart(3, "0")}`,
        },
        update: {},
        create: {
          id_phu_cap_nv: `PCNV${String(i + 1).padStart(3, "0")}`,
          cccd_nv: employee.cccd,
          id_muc_phu_cap: mucPC.id_muc_pc,
          ngay_bat_dau: new Date("2024-01-01"),
        },
      });
    }

    const allPhongBan = await prisma.phong_ban.findMany();

    for (let i = 0; i < allPhongBan.length; i++) {
      await prisma.phu_cap_phong_ban.upsert({
        where: {
          id_phu_cap_pb: `PCPB${String(i + 1).padStart(3, "0")}`,
        },
        update: {},
        create: {
          id_phu_cap_pb: `PCPB${String(i + 1).padStart(3, "0")}`,
          id_pban: allPhongBan[i].id_pb,
          id_muc_phu_cap: allMucPhuCap[i % allMucPhuCap.length].id_muc_pc,
          ngay_bat_dau: new Date("2024-01-01"),
        },
      });
    }

    const allChucVu = await prisma.chuc_vu.findMany();

    for (let i = 0; i < allChucVu.length; i++) {
      await prisma.phu_cap_chuc_vu.upsert({
        where: {
          id_phu_cap_cv: `PCCV${String(i + 1).padStart(3, "0")}`,
        },
        update: {},
        create: {
          id_phu_cap_cv: `PCCV${String(i + 1).padStart(3, "0")}`,
          id_chuc_vu: allChucVu[i].id_chuc_vu,
          id_muc_phu_cap: allMucPhuCap[i % allMucPhuCap.length].id_muc_pc,
          ngay_bat_dau: new Date("2024-01-01"),
        },
      });
    }

    // =========================
    // 7. TẠO KHẤU TRỪ
    // =========================
    console.log("📉 Creating deductions...");

    const mucKhauTruData = [
      {
        id_muc_khau_tru: "MKT01",
        id_loai_khau_tru: "BHXH",
        gia_tri: 8,
        ngay_ap_dung: new Date("2024-01-01"),
      },
      {
        id_muc_khau_tru: "MKT02",
        id_loai_khau_tru: "BHYT",
        gia_tri: 1.5,
        ngay_ap_dung: new Date("2024-01-01"),
      },
      {
        id_muc_khau_tru: "MKT03",
        id_loai_khau_tru: "BHTN",
        gia_tri: 1,
        ngay_ap_dung: new Date("2024-01-01"),
      },
      {
        id_muc_khau_tru: "MKT04",
        id_loai_khau_tru: "KT",
        gia_tri: 200000,
        ngay_ap_dung: new Date("2024-01-01"),
      },
    ];

    for (const mkt of mucKhauTruData) {
      await prisma.muc_khau_tru.upsert({
        where: { id_muc_khau_tru: mkt.id_muc_khau_tru },
        update: {},
        create: mkt,
      });
    }

    const allMucKhauTru = await prisma.muc_khau_tru.findMany();

    let khauTruCounter = 1;

    for (const employee of createdEmployees) {
      for (const mkt of allMucKhauTru) {
        await prisma.khau_tru_nhan_vien.upsert({
          where: {
            id_khau_tru_nv: `KTNV${String(khauTruCounter).padStart(3, "0")}`,
          },
          update: {},
          create: {
            id_khau_tru_nv: `KTNV${String(khauTruCounter).padStart(3, "0")}`,
            cccd_nv: employee.cccd,
            id_muc_khau_tru: mkt.id_muc_khau_tru,
            thang: 5,
            nam: 2026,
            so_tien_thuc_te:
              mkt.id_loai_khau_tru === "KT"
                ? 200000
                : Math.floor(Math.random() * 1000000) + 500000,
          },
        });

        khauTruCounter++;
      }
    }

    // =========================
    // 8. THUẾ TNCN
    // =========================
    console.log("🧾 Creating tax history...");

    for (let i = 0; i < createdEmployees.length; i++) {
      const employee = createdEmployees[i];

      const tongThuNhap = Math.floor(Math.random() * 20000000) + 10000000;
      const tongGiamTru = 15400000;
      const thuNhapTinhThue = Math.max(tongThuNhap - tongGiamTru, 0);

      const soThue = thuNhapTinhThue * 0.1;

      await prisma.lich_su_thue_tncn.upsert({
        where: {
          id_lich_su_thue: `TAX${String(i + 1).padStart(3, "0")}`,
        },
        update: {},
        create: {
          id_lich_su_thue: `TAX${String(i + 1).padStart(3, "0")}`,
          cccd_nv: employee.cccd,
          thang: 5,
          nam: 2026,
          tong_thu_nhap: tongThuNhap,
          thu_nhap_chiu_thue: tongThuNhap,
          tong_giam_tru: tongGiamTru,
          thu_nhap_tinh_thue: thuNhapTinhThue,
          so_thue_phai_nop: soThue,
          id_giam_tru: "GT2024",
        },
      });
    }

    // =========================
    // 9. THƯỞNG / PHẠT
    // =========================
    console.log("🏆 Creating reward & punishment data...");

    const loaiThuongPhatData = [
      {
        id_loai_tp: "THUONG",
        ten_loai: "Thưởng",
        loai: "THUONG",
      },
      {
        id_loai_tp: "PHAT",
        ten_loai: "Phạt",
        loai: "PHAT",
      },
    ];

    for (const ltp of loaiThuongPhatData) {
      await prisma.loai_thuong_phat.upsert({
        where: { id_loai_tp: ltp.id_loai_tp },
        update: {},
        create: ltp,
      });
    }

    const mucThuongPhatData = [
      {
        id_muc_tp: "MTP01",
        id_loai_tp: "THUONG",
        ten_muc: "Thưởng KPI",
        gia_tri: 3000000,
        hinh_thuc: "CONG_TIEN",
        ngay_ap_dung: new Date("2024-01-01"),
      },
      {
        id_muc_tp: "MTP02",
        id_loai_tp: "PHAT",
        ten_muc: "Đi trễ",
        gia_tri: 500000,
        hinh_thuc: "TRU_TIEN",
        ngay_ap_dung: new Date("2024-01-01"),
      },
    ];

    for (const mtp of mucThuongPhatData) {
      await prisma.muc_thuong_phat.upsert({
        where: { id_muc_tp: mtp.id_muc_tp },
        update: {},
        create: mtp,
      });
    }

    const allMucThuongPhat = await prisma.muc_thuong_phat.findMany();

    for (let i = 0; i < createdEmployees.length; i++) {
      const employee = createdEmployees[i];
      const mtp = allMucThuongPhat[i % allMucThuongPhat.length];

      await prisma.quyet_dinh_thuong_phat.upsert({
        where: {
          id_qd_tp: `QDTP${String(i + 1).padStart(3, "0")}`,
        },
        update: {},
        create: {
          id_qd_tp: `QDTP${String(i + 1).padStart(3, "0")}`,
          so_quyet_dinh: `QDTP-${2026}-${i + 1}`,
          cccd_nv: employee.cccd,
          id_muc_tp: mtp.id_muc_tp,
          ngay_ban_hanh: new Date(),
          ngay_hieu_luc: new Date(),
          nguoi_ky: "Nguyễn Văn A",
        },
      });
    }

    // =========================
    // 10. QUYẾT ĐỊNH NHÂN SỰ
    // =========================
    console.log("📄 Creating HR decisions...");

    for (let i = 0; i < createdEmployees.length; i++) {
      const employee = createdEmployees[i];
      const nvData = nhanVienList[i]; // Lấy dữ liệu chức vụ/phòng ban đã định sẵn

      await prisma.quyet_dinh_nhan_su.upsert({
        where: {
          so_quyet_dinh: `QDNS-${2026}-${i + 1}`,
        },
        update: {},
        create: {
          so_quyet_dinh: `QDNS-${2026}-${i + 1}`,
          cccd: employee.cccd,
          id_pban_moi: nvData.phong_ban,
          id_loai_qd_ns: "TD", // Thiết lập mặc định là quyết định Tuyển dụng ban đầu
          id_chuc_vu_moi: nvData.chuc_vu,
          ngay_hieu_luc: new Date(),
          nguoi_ky: "Giám đốc công ty",
        },
      });
    }

    // =========================
    // 11. QUYẾT ĐỊNH LƯƠNG
    // =========================
    console.log("💵 Creating salary decisions...");

    const allBacLuong = await prisma.bac_luong.findMany();

    for (let i = 0; i < createdEmployees.length; i++) {
      const employee = createdEmployees[i];
      const nvData = nhanVienList[i]; // Lấy dữ liệu dự định

      // Tìm bậc lương chính xác ứng với chức vụ và bậc lương của nhân viên này
      const bacLuong = allBacLuong.find(
        (b) => b.id_chuc_vu === nvData.chuc_vu && b.id_bac_luong === nvData.luong_bac
      ) || allBacLuong.find((b) => b.id_chuc_vu === nvData.chuc_vu); // Dự phòng nếu không khớp bậc

      await prisma.quyet_dinh_luong.upsert({
        where: {
          id_qd_luong: `QDL${String(i + 1).padStart(3, "0")}`,
        },
        update: {},
        create: {
          id_qd_luong: `QDL${String(i + 1).padStart(3, "0")}`,
          so_quyet_dinh: `QDL-${2026}-${i + 1}`,
          ngay_ban_hanh: new Date(),
          cccd_nv: employee.cccd,
          id_bac_luong: bacLuong!.id_bac_luong,
          id_chuc_vu: bacLuong!.id_chuc_vu,
          id_loai_qd_luong: "TD",
          ngay_ap_dung: new Date(),
        },
      });
    }

  console.log("✅ Seeding completed successfully!");
  console.log(`📊 Total employees created: ${createdEmployees.length}`);
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

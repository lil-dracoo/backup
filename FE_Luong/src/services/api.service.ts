import API from "./api"

const GetData_NhanVien =  async () => {
    const data = await API.get("/nhan-vien/");
    return data;
}

const ChiTietNhanVien = async (cccd: string) => {
    const data = await API.get(`/nhan-vien/${cccd}`);
    return data;
}

export { GetData_NhanVien, ChiTietNhanVien }
import API from "./api";

const GetData_CVu = async () => {
    const res = await API.get("/chuc-vu/");
    return res;
};

const GetDetail_CVu = async (id: string) => {
    const res = await API.get(`/chuc-vu/${id}`);
    return res;
};

const createCVu = async (data: any) => {
    const res = await API.post("/chuc-vu/create-pos", data);
    return res;
};

const UpdateCVu = async (id: string, data: any) => {
    const res = await API.put(`/chuc-vu/update-pos/${id}`, data);
    return res;
};

const DeleteCVu = async (id: string) => {
    const res = await API.delete(`/chuc-vu/delete-pos/${id}`);
    return res;
};

export { GetData_CVu, GetDetail_CVu, createCVu, UpdateCVu, DeleteCVu };
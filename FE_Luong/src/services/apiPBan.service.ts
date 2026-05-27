import API from "./api"

const GetDataPBan = async () => {
    const data = await API.get("/phong-ban/");
    return data;
}

const GetDetailPBan = async (id: string) => {
    const data = await API.get(`/phong-ban/${id}`)
    return data;
}

const createPBan = async (data: any) => {
    const response = await API.post ("/phong-ban/create-dept" , data);
    return response;
}

const UpdatePBan = async (id: string, data: any) => {
    const response = await API.put(`/phong-ban/update-dept/${id}`, data);
    return response;
}

const DeletePBan = async (id: string) => {
    const response = await API.delete(`/phong-ban/delete-dept/${id}`);
    return response;
}

export { GetDataPBan, GetDetailPBan , createPBan, UpdatePBan, DeletePBan }
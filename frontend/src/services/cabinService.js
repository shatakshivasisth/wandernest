import api from "./api";

export const getAllCabins = async () => {
    const response = await api.get("/cabins");
    return response.data;
};

export const getCabinById = async (id) => {
    const response = await api.get(`/cabins/${id}`);
    return response.data;
};

export const searchCabins = async (location) => {
    const response = await api.get("/cabins/search", {
        params: {
            location,
        },
    });

    return response.data;
};

export const filterCabins = async (params) => {
    const response = await api.get("/cabins/filter", {
        params,
    });

    return response.data;
};

export const deleteCabin = async (id) => {
    const response = await api.delete(`/cabins/${id}`);
    return response.data;
};
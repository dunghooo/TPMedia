import axios from "axios";

const API_URL = "https://localhost:7177";

export const getAllMembers = async () => {
    const response = await axios.get(
        `${API_URL}/GetAllMembers`
    );

    return response.data;
};

export const createMember = async (formData) => {
    const response = await axios.post(
        `${API_URL}/AddMember`,
        formData
    );

    return response.data;
};

export const updateMember = async (id, formData) => {
    const response = await axios.put(
        `${API_URL}/UpdateMember/${id}`,
        formData
    );

    return response.data;
};

export const deleteMember = async (id) => {
    const response = await axios.delete(
        `${API_URL}/DeleteMember/${id}`
    );

    return response.data;
};
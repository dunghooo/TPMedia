import axios from "axios";

const API_URL = "https://localhost:7177";

export const getAllCategories = async () => {
    const response = await axios.get(`${API_URL}/getAllCategory`);
    return response.data;
};
import axios from "axios";

const API_URL = "https://localhost:7177";

export const getAllCategories = async () => {
  const response = await axios.get(`${API_URL}/getAllCategory`);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/deleteCategory/${id}`);
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await axios.post(`${API_URL}/createCategory`, categoryData);
  return response.data;
}

export const updateCategory = async (id, categoryData) => {
  const response = await axios.put(`${API_URL}/updateCategory/${id}`, categoryData);
  return response.data;
}

import axios from "axios";

const API_URL = "https://localhost:7177/api/Project";

export const getAllProjects = async () => {
  const response = await axios.get(`${API_URL}/GetAllProjects`);
  return response.data;
};

export const createProject = async (formData) => {
  const response = await axios.post(
    `${API_URL}/AddProject`,
    formData
  );

  return response.data;
};

export const updateProject = async (id, formData) => {
  const response = await axios.put(
    `${API_URL}/UpdateProject/${id}`,
    formData
  );

  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(`${API_URL}/DeleteProject/${id}`);
  return response.data;
};
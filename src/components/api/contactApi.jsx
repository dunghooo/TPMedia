import axios from "axios";

const API_URL = "https://localhost:7177";

// =========================
// GET ALL CONTACT
// =========================

export const getAllContacts = async () => {
  const response = await axios.get(`${API_URL}/getAllContact`);

  return response.data;
};

// =========================
// ADD CONTACT
// =========================

export const createContact = async (data) => {
  const response = await axios.post(`${API_URL}/addContact`, data);

  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axios.delete(`${API_URL}/deleteContact/${id}`);
  return response.data;
};
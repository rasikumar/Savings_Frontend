/* eslint-disable no-useless-catch */
import { API } from "@/lib/api";
import Instance from "./Instance";

export const updateDay = async (day) => {
  try {
    const response = await Instance.post(`${API}/savings/update-savings`, {
      day: day,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllEntries = async (filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const response = await Instance.get(`${API}/savings/get-entries?${query}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

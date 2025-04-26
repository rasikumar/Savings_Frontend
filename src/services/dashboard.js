import { API } from "@/lib/api";
import Instance from "./Instance";

export const Dashboard = async () => {
  try {
    const response = await Instance.get(`${API}/auth/dashboard`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

import { API } from "@/lib/api";
import Instance from "./Instance";

export const signUp = async (signUpData) => {
  try {
    const response = await Instance.post(`${API}/auth/signup`, signUpData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const logIn = async (loginData) => {
  try {
    const response = await Instance.post(`${API}/auth/login`, loginData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const sendOtp = async (email) => {
  console.log(email);
  try {
    const response = await Instance.post(`${API}/auth/send-otp`, email);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const verifySendOtp = async (otp) => {
  try {
    const response = await Instance.post(`${API}/auth/verify-otp`, otp);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const resetPassword = async (updateData) => {
  try {
    const response = await Instance.post(
      `${API}/auth/reset-password`,
      updateData
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

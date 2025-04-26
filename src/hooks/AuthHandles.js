import {
  logIn,
  resetPassword,
  sendOtp,
  signUp,
  verifySendOtp,
} from "@/services/auth";
import { toast } from "sonner";

export const handleSignUp = async (values, setIsSubmitting, navigate) => {
  setIsSubmitting(true);
  try {
    const result = await signUp(values);
    if (result.status === true) {
      toast(result.message);
      navigate("/login");
    } else {
      toast(result.response?.data?.message || "Signup Failed");
    }
  } catch (error) {
    toast(error.message || "Something went wrong");
  } finally {
    setIsSubmitting(false);
  }
};

export const handleLogIn = async (
  values,
  setIsSubmitting,
  navigate,
  setUser
) => {
  setIsSubmitting(true);
  try {
    const result = await logIn(values);
    if (result.status === true) {
      const token = result.token || result.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      setUser(result.user);
      toast(result.message);
      navigate("/dashboard");
    } else {
      toast(result.response?.data?.message || "Login Failed");
    }
  } catch (error) {
    toast(error.message || "Something went Wrong");
  } finally {
    setIsSubmitting(false);
  }
};

export const handleSendOtp = async (email, setIsSubmitting, navigate) => {
  setIsSubmitting(true);
  try {
    const result = await sendOtp(email);
    if (result.status === true) {
      toast(result.message);
      navigate("/verify-otp");
    } else {
      toast(result.response?.data?.message || "OTP send Failed");
    }
  } catch (error) {
    toast(error.message || "Something went Wrong");
  } finally {
    setIsSubmitting(false);
  }
};

export const verifyOtp = async (otp, setIsSubmitting, navigate) => {
  setIsSubmitting(true);
  try {
    const result = await verifySendOtp(otp);
    if (result.status === true) {
      toast(result.message);
      navigate(`/reset-password/${result.resetToken}`);
    } else {
      toast(result.response?.data?.message || "OTP send Failed");
    }
  } catch (error) {
    toast(error.message || "Something went Wrong");
  } finally {
    setIsSubmitting(false);
  }
};

export const changePassword = async (payload, setIsSubmitting, navigate) => {
  setIsSubmitting(true);
  try {
    const result = await resetPassword(payload);
    if (result.status === true) {
      toast(result.message);
      navigate("/login");
    } else {
      toast(result.response?.data?.message || "Failed to Change Password");
    }
  } catch (error) {
    toast(error.message || "Something went Wrong");
  } finally {
    setIsSubmitting(false);
  }
};

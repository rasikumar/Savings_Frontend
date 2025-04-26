import { getAllEntries, updateDay } from "@/services/days";
import { toast } from "sonner";

export const getAllDate = async (
  setIsSubmitting,
  setData,
  setError,
  filters = {}
) => {
  setIsSubmitting(true);
  try {
    const result = await getAllEntries(filters);
    if (result.status === true) {
      setData(result);
    } else {
      setError(result.response?.data?.message || "Data Load Failed");
    }
  } catch (error) {
    setError(error.message || "Something went wrong");
  } finally {
    setIsSubmitting(false);
  }
};

export const updateRupee = async (amount, setIsSubmitting) => {
  setIsSubmitting(true);
  try {
    const result = await updateDay(amount);
    toast(result.message);
  } catch (error) {
    toast(error.response?.data?.message || "Something wssent wrong");
  } finally {
    setIsSubmitting(false);
  }
};

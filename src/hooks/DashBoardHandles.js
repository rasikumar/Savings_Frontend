import { Dashboard } from "@/services/dashboard";

export const DashboardData = async (setIsSubmitting, setData, setError) => {
  setIsSubmitting(true);
  try {
    const result = await Dashboard();
    if (result.status === true) {
      setData(result?.data?.savings);
    } else {
      setError(result.response?.data?.message || "Data Load Failed");
    }
  } catch (error) {
    setError(error.message || "Something went wrong");
  } finally {
    setIsSubmitting(false);
  }
};

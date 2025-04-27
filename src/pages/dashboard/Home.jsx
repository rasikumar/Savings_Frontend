import AnalyticsCards from "@/components/AnalyticsCards";
// import { BigAnalytics } from "@/components/BigAnalytics";
import WelcomeBanner from "@/components/WelcomeBanner";
import { useUser } from "@/context/UserContext";
import { DashboardData } from "@/hooks/DashBoardHandles";
import { useEffect, useState } from "react";

const Home = () => {
  const { user } = useUser() || {};
  const [data, setData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    DashboardData(setIsSubmitting, setData, setError);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <WelcomeBanner user={user} />
      <AnalyticsCards data={data} loading={isSubmitting} error={error} />
      {/* <BigAnalytics /> */}
    </div>
  );
};

export default Home;

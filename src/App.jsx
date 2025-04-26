import { Route, Routes } from "react-router";
import ScrollToTop from "./lib/ScrollToTop";

import SignUp from "./components/Auth/SignUp";
import LogIn from "./components/Auth/LogIn";
import SendOtp from "./components/Auth/SendOtp";
import VerifyOtp from "./components/Auth/VerifyOtp";
import ResetPassword from "./components/Auth/ResetPassword";

import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Home from "./pages/dashboard/Home";
import Profile from "./pages/dashboard/Profile";
import Days from "./pages/dashboard/Days";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Auth sections */}

        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/reset-password" element={<SendOtp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Core Sections */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="days" element={<Days />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

import { Route, Routes } from "react-router";
import ScrollToTop from "./lib/ScrollToTop";

import SignUp from "./components/Auth/SignUp";
import LogIn from "./components/Auth/LogIn";
import SendOtp from "./components/Auth/SendOtp";
import VerifyOtp from "./components/Auth/VerifyOtp";
import ResetPassword from "./components/Auth/ResetPassword";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/reset-password" element={<SendOtp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;

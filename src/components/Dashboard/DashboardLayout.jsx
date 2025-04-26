import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const mainRef = useRef(null);
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const mainEl = mainRef.current;

    const handleScroll = () => {
      if (mainEl.scrollTop > 0) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };

    mainEl.addEventListener("scroll", handleScroll);
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Topbar showShadow={showShadow} />

      <div className="flex md:flex-row flex-col flex-1 overflow-hidden">
        <Sidebar />

        <main ref={mainRef} className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

// src/components/Dashboard/Sidebar.jsx
import { Link, useLocation } from "react-router";
import { Home, Settings, CalendarDays } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navItems = [
    { label: "Home", path: "/dashboard", icon: <Home size={20} /> },
    {
      label: "Days",
      path: "/dashboard/days",
      icon: <CalendarDays size={20} />,
    },
    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="md:w-64 md:h-full max-md:p-2 mt-5 mr-10 max-md:fixed max-md:bottom-0 max-md:bg-orange-400 w-full overflow-auto z-50">
      <nav className="flex flex-row md:flex-col justify-between gap-4 ">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 md:rounded-r-full transition ${
              location.pathname === item.path
                ? "md:bg-[#59599B] text-white font-semibold md:text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

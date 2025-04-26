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
    <aside className="w-64 h-full mt-5 mr-10">
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-r-full transition ${
              location.pathname === item.path
                ? "bg-[#59599B] font-semibold text-white"
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

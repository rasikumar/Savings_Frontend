import { MoneyBox } from "@/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, CircleHelp, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Link, useNavigate } from "react-router";
import { useUser } from "@/context/UserContext";
import { PHOTO } from "@/lib/api";

const Topbar = ({ showShadow }) => {
  const { user } = useUser() || {};

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login"); // Navigates to login page
  };

  const handleProfile = () => {
    navigate("./settings"); // Navigates to profile page
  };

  return (
    <header
      className={`w-full px-6 py-4 sticky top-0 z-50 transition-shadow duration-300
          bg-white/30 backdrop-blur-md border-b border-white/20
          ${showShadow ? "shadow-md" : ""}
        `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 justify-center">
          <img src={MoneyBox} alt="Logo" className="w-10" />
          <h2 className="font-bold hidden md:block">Piggy365</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center text-sm gap-2 cursor-pointer">
            <HoverCard>
              <HoverCardTrigger>
                <CircleHelp className="cursor-pointer" />
              </HoverCardTrigger>
              <HoverCardContent className="text-sm max-w-xs flex flex-col gap-2">
                Piggy 365 – Your smart finance assistant. Track, save, and
                manage your goals efficiently.
                <Link className="underline text-[#59599B]">
                  To Know More About
                </Link>
              </HoverCardContent>
            </HoverCard>
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger
              aschild
              className="flex gap-4 items-center p-1 "
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  src={
                    user?.profilePicture?.includes("https://api.dicebear.com")
                      ? user.profilePicture
                      : `${PHOTO}${user.profilePicture}`
                  }
                  alt={user?.name || "No User"}
                />
                <AvatarFallback className="rounded-lg">
                  {user?.name}
                </AvatarFallback>
              </Avatar>
              <div className="md:grid hidden text-left text-sm leading-tight ">
                <span className="truncate font-semibold">
                  {user?.name || "No User"}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.subscription?.plan || "Empty Plan"}
                </span>
              </div>
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 mr-5">
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.profilePicture?.includes(
                          "https://api.dicebear.com"
                        )
                          ? user.profilePicture
                          : `${PHOTO}${user.profilePicture}`
                      }
                      alt={user?.name || "No User"}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.name}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.name || "No User"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.subscription?.plan || "Empty Plan"}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleProfile}>
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>Upgrade Plan</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

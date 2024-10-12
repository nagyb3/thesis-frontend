import { House, LogOut, User, UserRoundPen } from "lucide-react";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { logoutFromAccount } from "@/api-client/modules/authApiClient";

export default function Navbar() {
  const handleLogout = async () => {
    const result = await logoutFromAccount();

    if (result.status === 200) {
      window.location.href = "/login";
    }
  };

  const isCurrentPathAuthRoute =
    window.location.pathname === "/login" ||
    window.location.pathname === "/register";

  return (
    <div className="bg-slate-200 h-[50px] px-12 flex justify-between items-center">
      {!isCurrentPathAuthRoute && (
        <>
          <a href="/" className="cursor-pointer">
            <House />
          </a>

          <Popover>
            <PopoverTrigger className="h-fit">
              <div className="bg-primary p-2 rounded-full">
                <User color="white" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-fit mr-12 flex flex-col gap-y-4">
              <div
                onClick={() => (window.location.href = "/your-profile")}
                className="flex gap-x-2 items-center cursor-pointer justify-between"
              >
                <p>Your profile</p>
                <UserRoundPen />
              </div>
              <button
                onClick={() => handleLogout()}
                className="flex gap-x-2 items-center cursor-pointer justify-between"
              >
                <p className="text-red-500">Logout</p>
                <LogOut color="red" />
              </button>
            </PopoverContent>
          </Popover>
        </>
      )}
    </div>
  );
}

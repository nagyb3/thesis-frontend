import { House, LogOut, User, UserRoundPen } from "lucide-react";
import { logoutFromAccount } from "@/api-client/modules/authApiClient";
import { useAuthContext } from "@/contexts/AuthContext";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

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

  const { profile } = useAuthContext();

  return (
    <div className="bg-primary h-[50px] px-12 flex justify-between items-center">
      {!isCurrentPathAuthRoute && (
        <>
          <a href="/" className="cursor-pointer">
            <House color="white" />
          </a>

          <Popover>
            <PopoverTrigger className="h-fit">
              <div className="bg-white p-2 rounded-full cursor-pointer">
                <User color="black" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-y-4 p-4">
              <p className="font-bold text-lg">@{profile?.username}</p>

              <div
                onClick={() => (window.location.href = "/your-profile")}
                className="flex gap-x-2 items-center cursor-pointer justify-between w-full"
              >
                <p className="font-semibold">Your profile</p>
                <UserRoundPen />
              </div>
              <button
                onClick={() => handleLogout()}
                className="flex gap-x-2 items-center cursor-pointer justify-between w-full"
              >
                <p className="text-red-500 font-semibold">Logout</p>
                <LogOut color="red" />
              </button>
            </PopoverContent>
          </Popover>
        </>
      )}
    </div>
  );
}

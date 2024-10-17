import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { loginToAccount } from "@/api-client/modules/authApiClient";
import { AxiosError } from "axios";

export default function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorState, setErrorState] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await loginToAccount({
        username: usernameInput,
        password: passwordInput,
      });

      console.log({ result });
      if (result.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      setErrorState(
        (error as AxiosError<{ message: string }>)?.response?.data?.message
      );
      console.error({ error });
    }
  };

  return (
    <div className="bg-neutral-50 flex justify-center items-center h-[calc(100vh-50px)] px-4">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-y-4 items-center bg-white border border-slate-200 rounded px-4 py-8 min-w-[500px] h-fit"
      >
        <p className="text-xl font-semibold">Login</p>
        <div className="flex flex-col gap-y-2 w-full max-w-[300px]">
          <Label>Username</Label>
          <Input
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full max-w-[300px]">
          <Label>Password</Label>
          <Input
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            type="password"
            required
          />
        </div>
        {errorState && <p className="text-red-500">{errorState}</p>}
        <Button>Submit</Button>
        <a href="/register" className="self-end hover:underline text-sm">
          Don't have an account yet? Register!
        </a>
      </form>
    </div>
  );
}

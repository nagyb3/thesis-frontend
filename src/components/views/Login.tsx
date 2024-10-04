import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await fetch(`${import.meta.env.VITE_API_URI}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });

      console.log({ result });
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="bg-slate-50 flex justify-center items-center min-h-full px-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-y-4 items-center bg-white border border-slate-200 rounded px-4 py-8 min-w-[500px] h-fit"
        >
          <p className="text-xl font-semibold">Login</p>
          <div className="flex flex-col gap-y-2 w-full max-w-[300px]">
            <Label>Username</Label>
            <Input
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2 w-full max-w-[300px]">
            <Label>Password</Label>
            <Input
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              type="password"
              required
            />
          </div>
          <Button>Submit</Button>
          <a href="/register" className="self-end hover:underline text-sm">
            Don't have an account yet? Register!
          </a>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { registerNewAccount } from "@/api-client/modules/authApiClient";

export default function Register() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordInput !== confirmPasswordInput) {
      alert("Passwords do not match");
      return;
    }
    try {
      const result = await registerNewAccount({
        username: usernameInput,
        password: passwordInput,
      });

      if (result.status === 201) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="bg-slate-50 flex justify-center items-center h-[calc(100vh-50px)] px-4">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-y-4 items-center bg-white border border-slate-200 rounded px-4 py-8 min-w-[500px] h-fit"
      >
        <p className="text-xl font-semibold">Register</p>
        <div className="flex flex-col gap-y-2 w-full max-w-[300px]">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full max-w-[300px]">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            type="password"
            required
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full max-w-[300px]">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            value={confirmPasswordInput}
            onChange={(e) => setConfirmPasswordInput(e.target.value)}
            type="password"
            required
          />
        </div>
        <Button>Register</Button>
        <a href="/login" className="self-end hover:underline text-sm">
          Already have an account? Login!
        </a>
      </form>
    </div>
  );
}

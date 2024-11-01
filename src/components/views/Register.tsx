import { useState } from "react";
import { registerNewAccount } from "@/api-client/modules/authApiClient";
import { Button, Card, Input } from "@nextui-org/react";
import { AxiosError } from "axios";

export default function Register() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const [errorState, setErrorState] = useState<string | undefined>(undefined);

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

      setErrorState(undefined);

      if (result.status === 201) {
        window.location.href = "/login";
      }
    } catch (error) {
      setErrorState(
        (error as AxiosError<{ message: string }>)?.response?.data?.message
      );
      console.error({ error });
    }
  };

  return (
    <div className="bg-background flex justify-center items-center h-[calc(100vh-50px)] px-4">
      <Card
        classNames={{
          base: "border-black/20 border",
        }}
        className="p-3"
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-y-6 items-center px-4 py-8 min-w-[500px] h-fit"
        >
          <p className="text-3xl font-semibold">Register</p>
          <div className="flex flex-col gap-y-2 w-full max-w-[300px]">
            <Input
              classNames={{
                inputWrapper: "border-black/40 border",
              }}
              label="Username"
              id="username"
              variant="bordered"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              isRequired
            />
          </div>
          <div className="flex flex-col gap-y-2 w-full max-w-[300px]">
            <Input
              classNames={{
                inputWrapper: "border-black/40 border",
              }}
              label="Password"
              id="password"
              variant="bordered"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              type="password"
              isRequired
            />
          </div>
          <div className="flex flex-col gap-y-2 w-full max-w-[300px]">
            <Input
              classNames={{
                inputWrapper: "border-black/40 border",
              }}
              label="Confirm Password"
              id="confirm-password"
              variant="bordered"
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
              type="password"
              isRequired
            />
          </div>
          {errorState && <p className="text-red-500">{errorState}</p>}
          <Button type="submit" color="primary" className="font-bold">
            Submit
          </Button>
          <a href="/login" className="self-end hover:underline text-sm">
            Already have an account? Login!
          </a>
        </form>
      </Card>
    </div>
  );
}

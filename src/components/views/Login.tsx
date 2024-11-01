import { useState } from "react";
import { loginToAccount } from "@/api-client/modules/authApiClient";
import { AxiosError } from "axios";
import { Input } from "@nextui-org/input";
import { Button, Card, CardBody } from "@nextui-org/react";

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
    <div className="bg-background flex justify-center items-center h-[calc(100vh-50px)] px-4">
      <Card
        classNames={{
          base: "border-black/20 border",
        }}
      >
        <CardBody>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-y-6 items-center px-4 py-8 min-w-[500px] h-fit"
          >
            <p className="text-3xl font-semibold">Login</p>
            <div className="flex flex-col gap-y-2 w-full max-w-[300px]">
              <Input
                classNames={{
                  inputWrapper: "border-black/40 border",
                }}
                label="Username"
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
                variant="bordered"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                type="password"
                isRequired
              />
            </div>
            {errorState && <p className="text-red-500">{errorState}</p>}
            <Button color="primary" type="submit" className="font-bold">
              Submit
            </Button>
            <a href="/register" className="self-end hover:underline text-sm">
              Don't have an account yet? Register!
            </a>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

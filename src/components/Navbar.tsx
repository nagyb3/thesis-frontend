import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="bg-slate-200 h-[50px] px-8 flex justify-end items-center">
      <a href="/login">
        <Button>Login</Button>
      </a>
    </div>
  );
}

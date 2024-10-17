import { ArrowLeft } from "lucide-react";

export default function BackButtonWithLink({ backLink }: { backLink: string }) {
  return (
    <a href={backLink} className="self-start ml-16">
      <div className="flex gap-x-2 items-center hover:underline">
        <ArrowLeft size={20} />
        Back
      </div>
    </a>
  );
}

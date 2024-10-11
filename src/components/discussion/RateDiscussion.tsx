import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function RateDiscussion() {
  const [isOn, setIsOn] = useState(false);

  const [isDown, setIsDown] = useState(false);

  return (
    <div className="flex gap-x-2">
      <Button
        className="p-2 h-fit"
        variant="outline"
        onClick={() => {
          setIsOn(!isOn);
          setIsDown(false);
        }}
      >
        <ArrowUp strokeWidth="3px" color={!isOn ? "gray" : "orange"} />
      </Button>
      <Button
        className="p-2 w-fit h-fit"
        variant="outline"
        onClick={() => {
          setIsDown(!isDown);
          setIsOn(false);
        }}
      >
        <ArrowDown strokeWidth="3px" color={!isDown ? "gray" : "orange"} />
      </Button>
    </div>
  );
}

declare module "react-arrows" {
  import * as React from "react";

  export type Direction = "TOP" | "BOTTOM" | "LEFT" | "RIGHT";

  export const DIRECTION: {
    TOP: Direction;
    BOTTOM: Direction;
    LEFT: Direction;
    RIGHT: Direction;
  };

  export interface ArrowProps {
    from: {
      direction: Direction;
      node: () => HTMLElement | null;
      translation?: [number, number];
    };
    to: {
      direction: Direction;
      node: () => HTMLElement | null;
      translation?: [number, number];
    };
    className?: string;
    color?: string;
    thickness?: number;
  }

  const Arrow: React.FC<ArrowProps>;
  export default Arrow;
}

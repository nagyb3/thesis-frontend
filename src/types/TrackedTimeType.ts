import { UserType } from "./UserType";

export type TrackedTimeType = {
  id: string;
  user: UserType;
  minutes: number;
  date: Date;
  created_at: Date;
};

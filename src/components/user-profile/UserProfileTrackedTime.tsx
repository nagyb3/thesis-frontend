import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Pencil, Trash } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";
import { TrackedTimeType } from "@/types/TrackedTimeType";
import {
  getTrackedTimesByUserId,
  updateTrackedMinutesDailyGoal,
} from "@/api-client/modules/userApiClient";
import {
  createTrackedTime,
  deleteTrackedTime,
} from "@/api-client/modules/trackedTimeApiClient";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { fillTrackedTimeDataWithZeroMinutes } from "@/utils/fillTrackedTimeDataWithZeroMinutes";
import { useAuthContext } from "@/contexts/AuthContext";
import { Label } from "@radix-ui/react-label";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

const chartConfig = {
  minutes: {
    label: "Minutes",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function UserProfileTrackedTime({
  userId,
  isMyProfile,
}: {
  userId: string | undefined;
  isMyProfile: boolean;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [minutes, setMinutes] = useState<number | undefined>(undefined);
  const [isEditingDailyGoal, setIsEditingDailyGoal] = useState<boolean>(false);

  const { profile, fetchProfile } = useAuthContext();

  const [newDailyGoalState, setNewDailyGoalState] = useState<number | "">(
    profile?.trackedMinutesDailyGoal ?? 30
  );

  useEffect(() => {
    if (profile) {
      setNewDailyGoalState(profile?.trackedMinutesDailyGoal ?? 30);
    }
  }, [profile]);

  const [trackedTimes, setTrackedTimes] = useState<
    TrackedTimeType[] | undefined
  >(undefined);

  const [trackedTimesData, setTrackedTimesData] = useState<
    { date: string; minutes: number }[] | undefined
  >(undefined);

  useEffect(() => {
    if (trackedTimes) {
      let newData: { date: string; minutes: number }[] = [];

      const convertDateToISOString = trackedTimes.map((trackedTime) => ({
        ...trackedTime,
        date: new Date(trackedTime.date).toISOString().slice(0, 10),
      }));

      convertDateToISOString.forEach((trackedTime) => {
        const existingData = newData.find(
          (newDataItem) => newDataItem.date === trackedTime.date
        );

        if (existingData) {
          newData = newData.map((newDataItem) =>
            newDataItem.date === trackedTime.date
              ? {
                  ...newDataItem,
                  minutes: newDataItem.minutes + trackedTime.minutes,
                }
              : newDataItem
          );
        } else {
          newData.push({
            date: trackedTime.date,
            minutes: trackedTime.minutes,
          });
        }
      });
      newData = fillTrackedTimeDataWithZeroMinutes(newData);
      setTrackedTimesData(newData);
    }
  }, [trackedTimes]);

  const fetchTrackedTimes = async () => {
    if (!userId) return;
    const result = await getTrackedTimesByUserId(userId ?? "");

    if (result.status === 200) {
      setTrackedTimes(result.data);
    }
  };

  useEffect(() => {
    fetchTrackedTimes();
  }, [userId]);

  const handleSubmitTrackedTime = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!date || !minutes) return;
    const result = await createTrackedTime({
      date,
      minutes,
    });
    if (result.status === 201) {
      setMinutes(undefined);
      fetchTrackedTimes();
    }
  };

  const [triggerData, setTriggerData] = useState<TrackedTimeType | undefined>(
    undefined
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBarClick = (e: any) => {
    const { payload } = e;
    if (!payload) return;

    const triggerButton = document.getElementById("bar-modal-trigger");
    triggerButton?.click();

    setTriggerData(payload);
  };

  const handleSaveNewDailyGoal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    if (newDailyGoalState === "") return;

    e.preventDefault();

    const result = await updateTrackedMinutesDailyGoal(
      userId ?? "",
      newDailyGoalState
    );
    if (result.status === 200) {
      setIsEditingDailyGoal(false);
      fetchProfile();
    }
  };

  const handleDeleteTrackedTime = async (trackedTimeId: string) => {
    const result = await deleteTrackedTime(trackedTimeId);
    if (result.status === 204) {
      window.location.reload();
    }
  };

  // state management for 'tracked times per day' modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-2xl font-semibold">Time Tracker</p>
      <div className="flex flex-col items-between gap-y-4">
        {isMyProfile && (
          <form
            onSubmit={(e) => handleSubmitTrackedTime(e)}
            className="flex gap-x-2"
          >
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="tracked-time-date-picker">Date:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="tracked-time-date-picker"
                    variant="flat"
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Minutes:</Label>
              <Input
                isRequired
                variant="faded"
                type="number"
                placeholder="25"
                min={1}
                value={String(minutes)}
                onChange={(e) =>
                  setMinutes(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
              />
            </div>
            <Button color="primary" className="self-end" type="submit">
              Submit
            </Button>
          </form>
        )}
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-2">
            <p className="font-semibold text-lg">Statistics:</p>
            {trackedTimesData && trackedTimesData.length > 0 ? (
              <>
                <p className="text-black/70 text-sm">
                  Click on a bar to see the details for the day!
                </p>
                <ChartContainer config={chartConfig} className="min-h-[200px]">
                  <BarChart accessibilityLayer data={trackedTimesData}>
                    <CartesianGrid vertical={true} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      onClick={(e) => isMyProfile && handleBarClick(e)}
                      dataKey="minutes"
                      fill="var(--color-minutes)"
                      radius={4}
                      className={isMyProfile ? "cursor-pointer" : ""}
                    />
                  </BarChart>
                </ChartContainer>
              </>
            ) : (
              <div className="w-full rounded-lg bg-default-100 py-24 flex justify-center">
                <p className="text-default-500">
                  You didn't submit a tracked time yet...
                </p>
              </div>
            )}

            <button
              onClick={onOpen}
              className="hidden"
              id="bar-modal-trigger"
            />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                <ModalHeader>
                  <p>
                    Tracked times for{" "}
                    {triggerData?.date ? format(triggerData?.date, "PPP") : ""}
                  </p>
                </ModalHeader>
                <ModalBody>
                  {trackedTimes &&
                    trackedTimes
                      .filter(
                        (trackedTime) => trackedTime.date === triggerData?.date
                      )
                      .map((trackedTime: TrackedTimeType) => (
                        <div key={trackedTime.id} className="flex flex-col">
                          <div className="flex justify-between">
                            <p className="py-2">
                              {trackedTime.minutes} minutes
                            </p>
                            <Button
                              isIconOnly
                              color="danger"
                              onClick={() =>
                                handleDeleteTrackedTime(trackedTime?.id ?? "")
                              }
                            >
                              <Trash className="h-fit" />
                            </Button>
                          </div>
                        </div>
                      ))}
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>

          <p className="font-semibold text-lg">Daily goal:</p>
          <div className="flex gap-x-2 items-center">
            {!isEditingDailyGoal ? (
              <>
                <p className="font-semibold">
                  {profile?.trackedMinutesDailyGoal} Minutes
                </p>
                {isMyProfile && (
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={() => setIsEditingDailyGoal((prev) => !prev)}
                  >
                    <Pencil />
                  </Button>
                )}
              </>
            ) : (
              <>
                <form
                  onSubmit={(e) => handleSaveNewDailyGoal(e)}
                  className="flex gap-x-2"
                >
                  <Input
                    variant="faded"
                    type="number"
                    placeholder="Daily goal minutes..."
                    className="w-[200px]"
                    min={1}
                    value={String(newDailyGoalState)}
                    onChange={(e) =>
                      setNewDailyGoalState(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  />

                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                  <Button
                    variant="faded"
                    onClick={() => {
                      setIsEditingDailyGoal((prev) => !prev);
                      setNewDailyGoalState(
                        profile?.trackedMinutesDailyGoal ?? 30
                      );
                    }}
                  >
                    Cancel
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

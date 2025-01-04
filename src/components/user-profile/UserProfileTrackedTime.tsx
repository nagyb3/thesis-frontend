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
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";

const chartConfig = {
  minutes: {
    label: "Minutes",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export type TimeRangeType = "all-time" | "last-30-days" | "last-7-days";

export default function UserProfileTrackedTime({
  userId,
  isMyProfile,
  onTrackedTimeDataChange,
}: {
  userId: string | undefined;
  isMyProfile: boolean;
  onTrackedTimeDataChange?: () => void;
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

    // check if this date is after today
    if (new Date(date) > new Date()) {
      alert("You can't submit a tracked time for a future date!");
      return;
    }

    const result = await createTrackedTime({
      date,
      minutes,
    });
    if (result.status === 201) {
      setMinutes(undefined);
      fetchTrackedTimes();
      if (onTrackedTimeDataChange) {
        onTrackedTimeDataChange();
      }
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
      if (onTrackedTimeDataChange) {
        onTrackedTimeDataChange();
      }
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

  const [selectedTimeRange, setSelectedTimeRange] =
    useState<TimeRangeType>("all-time");

  const [timeDataInTimeRange, setTimeDataInTimeRange] = useState<
    { date: string; minutes: number }[] | []
  >([]);

  useEffect(() => {
    if (trackedTimesData) {
      setTimeDataInTimeRange(
        filterTrackedTimeWithTimeRange(selectedTimeRange, trackedTimesData)
      );
    }
  }, [trackedTimesData, selectedTimeRange]);

  const filterTrackedTimeWithTimeRange = (
    timeRange: TimeRangeType,
    trackedTimes: { date: string; minutes: number }[]
  ) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    switch (timeRange) {
      case "all-time":
        return trackedTimes;
      case "last-30-days":
        return trackedTimes.filter(
          (trackedTime) =>
            new Date(trackedTime.date) >= thirtyDaysAgo &&
            new Date(trackedTime.date) <= new Date()
        );
      case "last-7-days":
        return trackedTimes.filter(
          (trackedTime) =>
            new Date(trackedTime.date) >= sevenDaysAgo &&
            new Date(trackedTime.date) <= new Date()
        );
    }
  };

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
                classNames={{
                  inputWrapper: "border-black/40 border",
                }}
                isRequired
                variant="bordered"
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
          <div className="flex flex-col gap-y-4">
            <p className="font-semibold text-lg">Statistics:</p>
            <div className="flex gap-x-2 items-center justify-between">
              <div className="flex gap-x-2 items-center">
                <p>Show:</p>
                <Select
                  aria-label="Time range selector"
                  onChange={(e) => {
                    if (e.target.value) {
                      setSelectedTimeRange(e.target.value as TimeRangeType);
                    }
                  }}
                  selectedKeys={[selectedTimeRange]}
                  defaultSelectedKeys={["all-time"]}
                  className="max-w-xs w-[250px]"
                >
                  <SelectItem key="all-time">All time</SelectItem>
                  <SelectItem key="last-30-days">Last 30 days</SelectItem>
                  <SelectItem key="last-7-days">Last 7 days</SelectItem>
                </Select>
              </div>
              <div className="flex gap-x-2 items-center">
                Tracked minutes in this period:{" "}
                <span className="font-bold">
                  {timeDataInTimeRange?.reduce((a, b) => a + b.minutes, 0)}{" "}
                  minutes
                </span>
              </div>
            </div>
            {timeDataInTimeRange && timeDataInTimeRange.length > 0 ? (
              <>
                <p className="text-black/70 text-sm">
                  Click on a bar to see the details for the day!
                </p>
                <ChartContainer config={chartConfig} className="min-h-[200px]">
                  <BarChart
                    accessibilityLayer
                    data={fillTrackedTimeDataWithZeroMinutes(
                      timeDataInTimeRange,
                      selectedTimeRange
                    )}
                  >
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
                    onPress={() => setIsEditingDailyGoal((prev) => !prev)}
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
                    classNames={{
                      inputWrapper: "border-black/40 border",
                    }}
                    variant="bordered"
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
                    Save
                  </Button>
                  <Button
                    variant="bordered"
                    onPress={() => {
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

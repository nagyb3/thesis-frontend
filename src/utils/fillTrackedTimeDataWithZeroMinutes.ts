import { TimeRangeType } from "@/components/user-profile/UserProfileTrackedTime";

export const fillTrackedTimeDataWithZeroMinutes = (
  array: { date: string; minutes: number }[],
  selectedTimeRange: TimeRangeType
) => {
  if (array.length === 0) {
    return array;
  }
  array.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const startDate = new Date();
  if (selectedTimeRange === "all-time") {
    startDate.setTime(new Date(array[0].date).getTime());
  } else if (selectedTimeRange === "last-7-days") {
    startDate.setDate(startDate.getDate() - 6);
  } else {
    startDate.setDate(startDate.getDate() - 29);
  }

  const endDate = new Date();

  const dateMap = new Map(array.map((item) => [item.date, item.minutes]));

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const dateStr = date.toISOString().slice(0, 10);

    if (!dateMap.has(dateStr)) {
      array.push({
        date: dateStr,
        minutes: 0,
      });
    }
  }

  array.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return array;
};

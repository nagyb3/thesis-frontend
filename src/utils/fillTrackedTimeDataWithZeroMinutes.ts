export const fillTrackedTimeDataWithZeroMinutes = (
  array: { date: string; minutes: number }[]
) => {
  array.forEach((trackedTime) => {
    const currentDate = new Date(trackedTime.date);

    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);

    const nextDayFormatted = nextDay.toISOString().slice(0, 10);

    if (array.some((item) => item.date === nextDayFormatted)) {
      return;
    } else {
      array.push({
        date: nextDayFormatted,
        minutes: 0,
      });
    }
  });

  array.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return array.splice(0, array.length - 1);
};

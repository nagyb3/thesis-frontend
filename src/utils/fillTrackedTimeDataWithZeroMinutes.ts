export const fillTrackedTimeDataWithZeroMinutes = (
  array: { date: string; minutes: number }[]
) => {
  array.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const startDate = new Date(array[0].date);
  const endDate = new Date(array[array.length - 1].date);

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

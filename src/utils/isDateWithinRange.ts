export const isDateWithinRange = (
  startDate: Date,
  endDate: Date,
  _date: Date,
): boolean => {
  const dateStart = new Date(
    startDate?.getFullYear(),
    startDate?.getMonth(),
    startDate?.getDate(),
  );
  const dateEnd = new Date(
    endDate?.getFullYear(),
    endDate?.getMonth(),
    endDate?.getDate(),
  );
  const targetDate = new Date(
    _date?.getFullYear(),
    _date?.getMonth(),
    _date?.getDate(),
  );

  return targetDate >= dateStart && targetDate <= dateEnd;
};

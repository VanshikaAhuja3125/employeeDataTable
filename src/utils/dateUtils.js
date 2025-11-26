import { parse, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export const parseDate = (dateString) => {
  if (!dateString) return null;
  try {
    return parse(dateString, 'dd-MM-yyyy', new Date());
  } catch (error) {
    return null;
  }
};

export const isDateInRange = (dateString, dateRange) => {
  if (!dateRange || !dateRange.from) return true;
  const date = parseDate(dateString);
  if (!date) return false;
  const from = startOfDay(dateRange.from);
  const to = dateRange.to ? endOfDay(dateRange.to) : endOfDay(dateRange.from);
  return isWithinInterval(date, { start: from, end: to });
};

import { addMinutes, format, isAfter, isBefore, parseISO, startOfDay } from "date-fns";
import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";

export const DEFAULT_TIMEZONE = "Asia/Seoul";

export function nowInTz(timeZone: string = DEFAULT_TIMEZONE): Date {
  return toZonedTime(new Date(), timeZone);
}

export function formatTz(
  date: Date | string,
  pattern: string,
  timeZone: string = DEFAULT_TIMEZONE,
): string {
  const value = typeof date === "string" ? parseISO(date) : date;
  return formatInTimeZone(value, timeZone, pattern);
}

export function zonedToUtc(date: Date, timeZone: string = DEFAULT_TIMEZONE): Date {
  return fromZonedTime(date, timeZone);
}

export type TimeSlot = {
  start: Date;
  end: Date;
  label: string;
};

export function buildSlots(options: {
  date: Date;
  startHour: number;
  endHour: number;
  intervalMinutes: number;
  timeZone?: string;
}): TimeSlot[] {
  const { date, startHour, endHour, intervalMinutes, timeZone = DEFAULT_TIMEZONE } = options;
  const dayStart = startOfDay(date);
  const slots: TimeSlot[] = [];
  let cursor = addMinutes(dayStart, startHour * 60);
  const limit = addMinutes(dayStart, endHour * 60);

  while (isBefore(cursor, limit)) {
    const next = addMinutes(cursor, intervalMinutes);
    if (isAfter(next, limit)) break;
    slots.push({
      start: cursor,
      end: next,
      label: `${format(cursor, "HH:mm")} – ${format(next, "HH:mm")}`,
    });
    cursor = next;
  }

  void timeZone;
  return slots;
}

"use client";

import "temporal-polyfill/global";

import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createCurrentTimePlugin } from "@schedule-x/current-time";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { ScheduleXCalendar, useNextCalendarApp } from "@schedule-x/react";
import "@schedule-x/theme-default/dist/index.css";
import { useMemo } from "react";

import { DEFAULT_TIMEZONE } from "@/lib/date";

export type CalendarEvent = {
  id: string;
  title: string;
  start: string | Date;
  end: string | Date;
  description?: string;
};

type EventCalendarProps = {
  events: CalendarEvent[];
  defaultView?: "month-grid" | "week" | "day" | "month-agenda";
  selectedDate?: string | Date;
  timeZone?: string;
};

function toMillis(value: string | Date): number {
  return value instanceof Date ? value.getTime() : new Date(value).getTime();
}

function toZdt(value: string | Date, timeZone: string): Temporal.ZonedDateTime {
  return Temporal.Instant.fromEpochMilliseconds(toMillis(value)).toZonedDateTimeISO(timeZone);
}

function toPlainDate(value: string | Date, timeZone: string): Temporal.PlainDate {
  return toZdt(value, timeZone).toPlainDate();
}

export function EventCalendar({
  events,
  defaultView = "month-grid",
  selectedDate,
  timeZone = DEFAULT_TIMEZONE,
}: EventCalendarProps) {
  const eventsService = useMemo(() => createEventsServicePlugin(), []);
  const currentTime = useMemo(() => createCurrentTimePlugin(), []);

  const sxEvents = useMemo(
    () =>
      events.map((e) => ({
        id: e.id,
        title: e.title,
        description: e.description,
        start: toZdt(e.start, timeZone),
        end: toZdt(e.end, timeZone),
      })),
    [events, timeZone],
  );

  const sxSelectedDate = useMemo(
    () => (selectedDate ? toPlainDate(selectedDate, timeZone) : undefined),
    [selectedDate, timeZone],
  );

  const calendar = useNextCalendarApp({
    views: [createViewMonthGrid(), createViewWeek(), createViewDay(), createViewMonthAgenda()],
    defaultView,
    selectedDate: sxSelectedDate,
    events: sxEvents,
    plugins: [eventsService, currentTime],
    locale: "ko-KR",
  });

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden h-[640px]">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

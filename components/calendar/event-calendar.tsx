"use client";

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

export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
};

type EventCalendarProps = {
  events: CalendarEvent[];
  defaultView?: "month-grid" | "week" | "day" | "month-agenda";
  selectedDate?: string;
};

export function EventCalendar({
  events,
  defaultView = "month-grid",
  selectedDate,
}: EventCalendarProps) {
  const eventsService = useMemo(() => createEventsServicePlugin(), []);
  const currentTime = useMemo(() => createCurrentTimePlugin(), []);

  const calendar = useNextCalendarApp({
    views: [createViewMonthGrid(), createViewWeek(), createViewDay(), createViewMonthAgenda()],
    defaultView,
    selectedDate,
    events,
    plugins: [eventsService, currentTime],
    locale: "ko-KR",
  });

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden h-[640px]">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

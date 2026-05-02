import { addDays, format } from "date-fns";

import { type CalendarEvent, EventCalendar } from "@/components/calendar/event-calendar";

function buildSampleEvents(): CalendarEvent[] {
  const base = new Date();
  base.setMinutes(0, 0, 0);
  const fmt = (d: Date) => format(d, "yyyy-MM-dd HH:mm");

  return [
    {
      id: "1",
      title: "팀 스탠드업",
      start: fmt(addDays(base, 0)),
      end: fmt(addDays(new Date(base.getTime() + 30 * 60_000), 0)),
      description: "매일 아침 데일리 스탠드업",
    },
    {
      id: "2",
      title: "디자인 리뷰",
      start: fmt(addDays(base, 1)),
      end: fmt(addDays(new Date(base.getTime() + 60 * 60_000), 1)),
    },
    {
      id: "3",
      title: "고객사 미팅",
      start: fmt(addDays(base, 2)),
      end: fmt(addDays(new Date(base.getTime() + 90 * 60_000), 2)),
    },
  ];
}

export default function HomePage() {
  const events = buildSampleEvents();
  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="grid gap-4">
      <div>
        <h1 className="font-heading text-2xl font-semibold">일정 캘린더</h1>
        <p className="text-sm text-muted-foreground">
          Schedule-X 기반 · 월/주/일/아젠다 뷰 전환 가능
        </p>
      </div>
      <EventCalendar events={events} selectedDate={today} />
    </div>
  );
}

import { addDays } from "date-fns";

import { EventCalendar, type CalendarEvent } from "@/components/calendar/event-calendar";

function buildSampleEvents(): CalendarEvent[] {
  const base = new Date();
  base.setMinutes(0, 0, 0);
  const at = (daysFromNow: number, durationMin: number) => {
    const start = addDays(base, daysFromNow);
    const end = new Date(start.getTime() + durationMin * 60_000);
    return { start: start.toISOString(), end: end.toISOString() };
  };

  return [
    { id: "1", title: "팀 스탠드업", description: "데일리 스탠드업", ...at(0, 30) },
    { id: "2", title: "디자인 리뷰", ...at(1, 60) },
    { id: "3", title: "고객사 미팅", ...at(2, 90) },
  ];
}

export default function HomePage() {
  const events = buildSampleEvents();

  return (
    <div className="grid gap-4">
      <div>
        <h1 className="font-heading text-2xl font-semibold">일정 캘린더</h1>
        <p className="text-sm text-muted-foreground">
          Schedule-X 기반 · 월/주/일/아젠다 뷰 전환 가능
        </p>
      </div>
      <EventCalendar events={events} selectedDate={new Date().toISOString()} />
    </div>
  );
}

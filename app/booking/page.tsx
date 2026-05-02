import { BookingSlots } from "@/components/calendar/booking-slots";

export default function BookingPage() {
  return (
    <div className="grid gap-4">
      <div>
        <h1 className="font-heading text-2xl font-semibold">예약 슬롯</h1>
        <p className="text-sm text-muted-foreground">
          react-day-picker로 날짜 선택 · 30분 단위 슬롯 · zod로 폼 검증
        </p>
      </div>
      <BookingSlots />
    </div>
  );
}

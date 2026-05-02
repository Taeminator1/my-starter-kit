"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CheckIcon, ClockIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildSlots, type TimeSlot } from "@/lib/date";
import { type BookingInput, bookingSchema } from "@/lib/schemas/booking";

type ConfirmedBooking = BookingInput & { id: string };

export function BookingSlots() {
  const [date, setDate] = useState<Date>(() => new Date());
  const [activeSlot, setActiveSlot] = useState<TimeSlot | null>(null);
  const [confirmed, setConfirmed] = useState<ConfirmedBooking[]>([]);

  const slots = useMemo(
    () => buildSlots({ date, startHour: 9, endHour: 18, intervalMinutes: 30 }),
    [date],
  );

  const bookedKeys = useMemo(() => new Set(confirmed.map((b) => b.slotStart)), [confirmed]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
  });

  function openSlot(slot: TimeSlot) {
    setActiveSlot(slot);
    reset({
      name: "",
      email: "",
      note: "",
      slotStart: slot.start.toISOString(),
      slotEnd: slot.end.toISOString(),
    });
  }

  function onSubmit(values: BookingInput) {
    setConfirmed((prev) => [...prev, { ...values, id: `${values.slotStart}-${values.email}` }]);
    setActiveSlot(null);
  }

  return (
    <div className="grid gap-6 md:grid-cols-[auto_1fr]">
      <div className="rounded-xl border border-border bg-card p-3 w-fit">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => d && setDate(d)}
          locale={ko}
          disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
        />
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-heading text-lg font-medium">
              {format(date, "yyyy년 M월 d일 (eee)", { locale: ko })}
            </h2>
            <p className="text-sm text-muted-foreground">30분 단위 · 09:00 – 18:00 (KST)</p>
          </div>
          <span className="text-sm text-muted-foreground">
            예약{" "}
            {confirmed.filter((c) => c.slotStart.startsWith(format(date, "yyyy-MM-dd"))).length}건
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {slots.map((slot) => {
            const key = slot.start.toISOString();
            const isBooked = bookedKeys.has(key);
            return (
              <Button
                key={key}
                type="button"
                variant={isBooked ? "secondary" : "outline"}
                disabled={isBooked}
                onClick={() => openSlot(slot)}
                className="justify-start h-9"
              >
                {isBooked ? <CheckIcon /> : <ClockIcon />}
                {slot.label}
              </Button>
            );
          })}
        </div>
      </div>

      <Dialog open={Boolean(activeSlot)} onOpenChange={(open) => !open && setActiveSlot(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>예약 정보 입력</DialogTitle>
            <DialogDescription>
              {activeSlot
                ? `${format(activeSlot.start, "yyyy년 M월 d일", { locale: ko })} · ${activeSlot.label}`
                : null}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
            <input type="hidden" {...register("slotStart")} />
            <input type="hidden" {...register("slotEnd")} />

            <div className="grid gap-1.5">
              <Label htmlFor="name">이름</Label>
              <Input id="name" autoComplete="name" {...register("name")} />
              {errors.name ? (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              ) : null}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" autoComplete="email" {...register("email")} />
              {errors.email ? (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              ) : null}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="note">메모 (선택)</Label>
              <Input id="note" {...register("note")} />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                예약 확정
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { create } from "zustand";

export type CalendarView = "month-grid" | "week" | "day";

type CalendarState = {
  view: CalendarView;
  selectedDate: string;
  setView: (view: CalendarView) => void;
  setSelectedDate: (date: string) => void;
};

const today = new Date().toISOString().slice(0, 10);

export const useCalendarStore = create<CalendarState>((set) => ({
  view: "month-grid",
  selectedDate: today,
  setView: (view) => set({ view }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
}));

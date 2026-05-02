import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요").max(40),
  email: z.string().email("올바른 이메일을 입력해주세요"),
  note: z.string().max(200).optional().or(z.literal("")),
  slotStart: z.string().datetime({ message: "슬롯이 선택되지 않았습니다" }),
  slotEnd: z.string().datetime({ message: "슬롯이 선택되지 않았습니다" }),
});

export type BookingInput = z.infer<typeof bookingSchema>;

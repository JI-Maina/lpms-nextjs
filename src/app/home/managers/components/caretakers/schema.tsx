import { z } from "zod";

export const CaretakerSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Please provide a valid firstname" })
    .max(15),
  lastName: z
    .string()
    .min(3, { message: "Please provide a valid lastname" })
    .max(15),
  username: z
    .string()
    .min(3, { message: "Please provide a valid username" })
    .max(15),
  phoneNo: z
    .string()
    .min(10, { message: "Please provide a valid username" })
    .max(10),
});

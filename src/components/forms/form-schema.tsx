import * as z from "zod";

export const regSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "Enter a valid firstname" })
      .max(100),
    lastName: z.string().min(3, { message: "Enter a valid lastname" }).max(100),
    phoneNo: z
      .string()
      .min(10, { message: "Phone no. must be exactly 10 characters" })
      .max(10, { message: "Phone no. must be exactly 10 characters" })
      .refine((val) => !isNaN(val as unknown as number), {
        message: "Phone number should be in figures",
      }),
    password: z.string().min(6).max(100),
    cfmPassword: z.string().min(6).max(100),
  })
  .refine((data) => data.password === data.cfmPassword, {
    message: "Passwords do not much",
    path: ["cfmPassword"],
  });

export const propertySchema = z.object({
  name: z.string().min(3, { message: "Property name is required" }),
  lrl: z
    .string()
    .min(4)
    .max(10, { message: "Property lrl must be between 4-10 characters" }),
  units: z.number().nonnegative({ message: "Enter a valid figure" }),
  floors: z.number().nonnegative({ message: "Enter a valid figure" }),
});

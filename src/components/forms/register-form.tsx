"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const regSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "Enter a valid firstname" })
      .max(100),
    lastName: z
      .string()
      .min(3, { message: "Enter a valid firstname" })
      .max(100),
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

const RegisterForm = () => {
  const form = useForm<z.infer<typeof regSchema>>({
    resolver: zodResolver(regSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNo: "",
      password: "",
      cfmPassword: "",
    },
  });

  // type CreateUserResponse = {
  //   first_name: string;
  //   last_name: string;
  //   phone_no: string;
  //   password: string;
  //   is_owner: boolean;
  //   is_caretaker: boolean;
  //   is_tenant: boolean;
  // };

  const onSubmit = async (values: z.infer<typeof regSchema>) => {
    const user = {
      first_name: values.firstName,
      last_name: values.lastName,
      phone_no: values.phoneNo,
      password: values.password,
      is_owner: true,
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/register/",
        user,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname:</FormLabel>
              <FormControl>
                <Input placeholder="john" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname:</FormLabel>
              <FormControl>
                <Input placeholder="Doe" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number:</FormLabel>
              <FormControl>
                <Input placeholder="0700000000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input placeholder="your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cfmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password:</FormLabel>
              <FormControl>
                <Input
                  placeholder="re-enter password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Sign-up
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;

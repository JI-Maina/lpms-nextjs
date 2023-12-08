"use client";

import * as z from "zod";
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

const regSchema = z.object({
  firstName: z.string().min(4).max(100),
  lastName: z.string().min(4).max(100),
  phoneNo: z.string().min(10).max(10),
  password: z.string().min(6).max(100),
  cfmPassword: z.string().min(6).max(100),
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

  const onSubmit = (values: z.infer<typeof regSchema>) => {
    console.log(values);
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

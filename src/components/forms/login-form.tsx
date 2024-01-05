"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const loginSchema = z.object({
  phoneNo: z.string().min(10, { message: "Invalid phone number" }).max(10),
  password: z.string().min(4, { message: "Must be greater than 4 characters" }),
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phoneNo: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const res = await signIn("credentials", {
      phone_no: values.phoneNo,
      password: values.password,
      redirect: false,
    });

    if (res && res.ok) {
      console.log(res);
      router.push("/home");
      router.refresh();
    } else if (res?.status === 401) {
      toast({
        description: "Invalid login credentials",
        variant: "destructive",
      });
    }

    console.log(res);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md w-full space-y-8"
      >
        <FormField
          control={form.control}
          name="phoneNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number:</FormLabel>
              <FormControl>
                <Input {...field} type="phoneNo" placeholder="0700000000" />
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
                <Input
                  {...field}
                  type="password"
                  placeholder="enter your password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Log-in
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;

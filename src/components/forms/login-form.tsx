"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn, useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Please enter a valid username" })
    .max(10),
  password: z.string().min(4, { message: "Must be greater than 4 characters" }),
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const res = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    if (res && res.ok) {
      console.log(res);
      router.refresh();
      if (session?.user.userRole === "owner") {
        router.push("/managers");
      } else {
        router.push("/tenants");
      }
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username:</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="jonte" />
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

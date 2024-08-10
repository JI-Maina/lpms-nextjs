"use client";

import * as z from "zod";
import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "../ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiService from "@/lib/services/api-service";
import { getUserRole, handleLogin } from "@/actions/actions";
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

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userRole = await getUserRole();

        if (userRole === "owner") {
          router.push("/managers");
        } else if (userRole === "tenant") {
          router.push("/tenants");
        }
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchUserRole();
  }, [router]);

  // useEffect(() => {
  //   if (userRole === "owner") {
  //     router.push("/managers");
  //   } else if (userRole === "tenant") {
  //     router.push("/tenants");
  //   }
  // }, [status, session]);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const user = {
      username: values.username,
      password: values.password,
    };

    const res = await apiService.post("/auth/login/", user);

    if (res.access_token) {
      handleLogin(
        res.username,
        res.user_role,
        res.access_token,
        res.refresh_token
      );

      if (res.user_role === "owner") {
        router.push("/managers");
      } else if (res.user_role === "tenant") {
        router.push("/tenants");
      }
    } else {
      Object.values(res).map((error: any) => {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      });
    }
  };

  // const onSubmit = async (values: z.infer<typeof loginSchema>) => {
  //   const res = await signIn("credentials", {
  //     username: values.username,
  //     password: values.password,
  //     redirect: false,
  //   });

  //   if (res && !res.ok) {
  //     if (res.status === 401) {
  //       toast({
  //         description: "Invalid login credentials",
  //         variant: "destructive",
  //       });
  //     }
  //   }
  // };

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

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Log-in{" "}
          {form.formState.isSubmitting && (
            <RotateCcw className="ml-2 h-4 w-4 animate-spin" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;

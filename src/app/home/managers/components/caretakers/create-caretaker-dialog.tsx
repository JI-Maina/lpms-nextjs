"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { CaretakerSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormInput = z.infer<typeof CaretakerSchema>;

const CreateCaretakerDialog = () => {
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<FormInput>({
    resolver: zodResolver(CaretakerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phoneNo: "",
    },
  });

  const onSubmit = async (values: FormInput) => {
    const caretaker = {
      user: {
        first_name: values.firstName,
        last_name: values.lastName,
        username: values.username,
        phone_no: values.phoneNo,
        password: "caretaker",
        is_owner: false,
        is_caretaker: true,
        is_tenant: false,
      },
    };

    try {
      const res = await axiosAuth.post("/users/caretakers/", caretaker);

      if (res.status === 201) {
        toast({
          variant: "default",
          description: `Caretaker ${res.data.user.username} has been created`,
        });
        setOpen(false);
        router.refresh();
        form.reset();
        console.log(res);
      }
    } catch (err: any) {
      if (!err.response) {
        toast({
          description:
            "Failed to create a caretaker! Check your internet connection",
          variant: "destructive",
        });
      } else if (err?.response?.status === 400) {
        const error = err?.response?.data?.user as any;
        if (error.phone_no && error.username) {
          toast({
            description: `${error.phone_no[0]} ${error.username[0]}`,
            variant: "destructive",
          });
        } else if (error.phone_no) {
          toast({
            description: `${error.phone_no[0]}`,
            variant: "destructive",
          });
        } else if (error.username) {
          toast({
            description: `${error.username[0]}`,
            variant: "destructive",
          });
        }
      }
    }
  };

  const openChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusCircle className="h-4 w-4 mr-2" /> Create
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Caretaker</DialogTitle>
          <DialogDescription>
            Caretakers default password is &apos;caretaker&apos;
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="caretaker" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="phoneNo"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="0713111111" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCaretakerDialog;

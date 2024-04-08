"use client";

import { z } from "zod";
import { PenSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CaretakerSchema } from "./schema";
import { Caretaker } from "@/types/property";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

type EditProps = {
  caretaker: Caretaker;
};

type FormInput = z.infer<typeof CaretakerSchema>;

const EditCaretakersDialog = ({ caretaker }: EditProps) => {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const user = caretaker.user;

  const form = useForm<FormInput>({
    resolver: zodResolver(CaretakerSchema),
    defaultValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      phoneNo: user.phone_no,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: FormInput) => {
    const data = {
      user: {
        first_name: values.firstName,
        last_name: values.lastName,
        username: values.username,
        phone_no: values.phoneNo,
        // password: "caretaker",
        // is_owner: false,
        // is_caretaker: true,
        // is_tenant: false,
      },
    };

    try {
      const res = await axiosAuth.patch(
        `/users/caretakers/${caretaker.id}/`,
        data
      );

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
        <Button variant="ghost" size="icon">
          <PenSquare color="#25f609" className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCaretakersDialog;

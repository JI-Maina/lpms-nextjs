"use client";

import { z } from "zod";
import { useState } from "react";
import { UserPlus2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const tenantSchema = z.object({
  firstName: z.string().min(3, { message: "Enter a valid first name" }),
  lastName: z.string().min(3, { message: "Enter a valid last name" }),
  username: z.string().min(3, { message: "Enter a valid username" }),
  phoneNo: z
    .string()
    .min(10, { message: "Provide a valid phone number" })
    .max(10),
  idNumber: z.string().min(8, { message: "Provide a valid ID number" }).max(10),
  nokFirstName: z.string().min(3, { message: "Enter a valid first name" }),
  nokLastName: z.string().min(3, { message: "Enter a valid last name" }),
  nokPhoneNo: z
    .string()
    .min(10, { message: "Provide a valid phone number" })
    .max(10),
});

const CreateTenantSheet = () => {
  // const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof tenantSchema>>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phoneNo: "",
      idNumber: "",
      nokFirstName: "",
      nokLastName: "",
      nokPhoneNo: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof tenantSchema>) => {
    const tenant = {
      user: {
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.username,
        phone_no: data.phoneNo,
        password: "tenant",
        title: "tenant",
        is_owner: false,
        is_caretaker: false,
        is_tenant: true,
      },
      id_number: data.idNumber,
      nok_first_name: data.nokFirstName,
      nok_last_name: data.nokLastName,
      nok_phone_no: data.nokPhoneNo,
    };

    try {
      const res = await axiosAuth.post("/users/tenants/", tenant);

      if (res.status === 201) {
        toast({ description: "Tenant created", title: "Success" });
        setOpen(false);
        router.push("/managers/units");
        form.reset();
      }
    } catch (err: any) {
      console.log(err);
      if (!err?.response) {
        toast({
          description:
            "Failed to create tenant! check your internet connection",
          variant: "destructive",
        });
      } else if (err.response.status === 400) {
        if (err.response?.data) {
          toast({ description: err.response.data[0], variant: "destructive" });
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
        <Button>
          <UserPlus2 className="mr-2 w-4 h-4" />
          Tenant
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Tenant</DialogTitle>
          <DialogDescription>Enter Tenant details below</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John" {...field} />
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
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="mjomba" {...field} />
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
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="0700000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identification Number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="00000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogDescription className="mt-4">
              Enter next of kin details below
            </DialogDescription>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="nokFirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NOK Firstname</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nokLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NOK Lastname</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nokPhoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NOK Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="0700000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Create Tenant
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTenantSheet;

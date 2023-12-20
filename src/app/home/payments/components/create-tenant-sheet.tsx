"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import axiosPrivate from "@/lib/axios-private";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const tenantSchema = z.object({
  firstName: z.string().min(3, { message: "Enter a valid first name" }),
  lastName: z.string().min(3, { message: "Enter a valid last name" }),
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
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof tenantSchema>>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
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
        phone_no: data.phoneNo,
        password: "tenant",
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
      const res = await axiosPrivate.post("/users/tenants/", tenant, {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });

      if (res.status === 201) {
        toast({ description: "Tenant created", title: "Success" });
        setOpen(false);
        router.refresh();
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
    <Sheet open={open} onOpenChange={openChangeWrapper}>
      <SheetTrigger asChild>
        <Button>
          <UserPlus2 className="mr-2 w-4 h-4" />
          Tenant
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new Tenant</SheetTitle>
          <SheetDescription>Enter Tenant details below</SheetDescription>
        </SheetHeader>

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

            <SheetDescription className="mt-4">
              Enter next of kin details below
            </SheetDescription>

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

        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Create Tenant
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTenantSheet;

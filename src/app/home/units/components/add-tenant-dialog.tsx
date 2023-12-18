"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosPrivate from "@/lib/axios-private";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { UserPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AddProps = {
  unit: UnitInput;
  tenants: Tenant[];
};

const tenantSchema = z.object({
  tenant: z.string(),
});

const AddTenantDialog = ({ unit, tenants }: AddProps) => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof tenantSchema>>({
    resolver: zodResolver(tenantSchema),
    defaultValues: { tenant: "" },
    // mode: "onChange",
  });

  const propertyId = unit.property;
  const unitId = unit.id;

  const onsubmit = async (data: z.infer<typeof tenantSchema>) => {
    try {
      const res = await axiosPrivate.patch(
        `/property/properties/${propertyId}/units/${unitId}/`,
        { ...unit, tenant: parseInt(data.tenant) },
        { headers: { Authorization: `Bearer ${session?.access_token}` } }
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <UserPlus className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Tenant</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)}>
            <FormField
              control={form.control}
              name="tenant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Tenant</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tenant" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tenants.map((tenant) => (
                        <SelectItem key={tenant.id} value={String(tenant.id)}>
                          {tenant.user.first_name} {tenant.user.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={form.handleSubmit(onsubmit)}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTenantDialog;

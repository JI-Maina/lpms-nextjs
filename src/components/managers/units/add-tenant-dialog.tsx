"use client";

import { z } from "zod";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
import { useState } from "react";
import { Tenant, UnitInput } from "@/types/property";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";

type AddProps = {
  unit: UnitInput;
  tenants: Tenant[];
};

const tenantSchema = z.object({
  tenant: z.string(),
});

const AddTenantDialog = ({ unit, tenants }: AddProps) => {
  const [open, setOpen] = useState(false);
  // const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof tenantSchema>>({
    resolver: zodResolver(tenantSchema),
    defaultValues: { tenant: "" },
    // mode: "onChange",
  });

  const propertyId = unit.property;
  const unitId = unit.id;

  const onsubmit = async (data: z.infer<typeof tenantSchema>) => {
    try {
      await axiosAuth.patch(
        `/property/properties/${propertyId}/units/${unitId}/`,
        { ...unit, tenant: parseInt(data.tenant) }
      );
      //   console.log(res);
      setOpen(false);
      toast({ description: "Success" });
      router.refresh();
    } catch (err: any) {
      //   console.log(err);
      if (!err?.response) {
        toast({
          description: "Creation Failed! Check your internet connection",
          variant: "destructive",
        });
      } else if (err?.response?.status === 400) {
        if (err.response.data) {
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
        <Button size="sm">
          <UserPlus className="w-5 h-5 mr-2" /> Add tenant
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a tenant to unit {unit.unit_name}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="py-8">
            <FormField
              control={form.control}
              name="tenant"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Select Tenant</FormLabel> */}
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

"use client";

import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Edit, RotateCcw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Maintenance } from "../../../../types/property";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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

const MAINTENANCETYPES = ["Routine", "Preventive", "Corrective"] as const;
const MAINTENANCESTATUS = ["Done", "Ongoing"] as const;

const maintenanceSchema = z.object({
  type: z.enum(MAINTENANCETYPES),
  fee: z.string().min(2, { message: "Please enter a valid amount" }),
  date: z.string().min(3, { message: "Please input a valid date" }),
  unit: z.string().min(1, { message: "Please select a unit" }),
  status: z.enum(MAINTENANCESTATUS),
  description: z.string().min(3, { message: "Description is required" }),
});

export const EditMaintenanceModal = ({
  maintenance,
}: {
  maintenance: Maintenance;
}) => {
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const type = MAINTENANCETYPES.find((t) => t === maintenance.maintenance_type);
  const status = MAINTENANCESTATUS.find(
    (s) => s === maintenance.maintenance_status
  );

  const form = useForm<z.infer<typeof maintenanceSchema>>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      type: type,
      unit: maintenance.unit.id.toString(),
      fee: maintenance.maintenance_fee,
      date: maintenance.maintenance_date,
      status: status,
      description: maintenance.description,
    },
    mode: "onChange",
  });

  const id = maintenance.id;
  const unitId = maintenance.unit.id;
  const propertyId = maintenance.unit.property;

  const onSubmit = async (data: z.infer<typeof maintenanceSchema>) => {
    const updatedMaintenance = {
      maintenance_type: data.type,
      maintenance_fee: data.fee,
      maintenance_date: data.date,
      description: data.description,
      maintenance_status: data.status,
    };

    try {
      await axiosAuth.put(
        `/property/properties/${propertyId}/units/${unitId}/maintenances/${id}/`,
        { ...updatedMaintenance, ...data }
      );

      // console.log(res);
      toast({ description: "Success" });
      setOpen(false);
      router.refresh();
    } catch (err: any) {
      //   console.log(err);
      if (!err.response) {
        toast({
          description: "Edit failed! please check your internet connection",
          variant: "destructive",
        });
      } else if (err?.response?.status === 400) {
        if (err.response.data) {
          toast({ description: err.response.data[0], variant: "destructive" });
        }
      }
    }
  };

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger>
        <Button size="icon" variant="outline">
          <Edit className="w-5 h-5" color="#25f609" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            Edit maintenance for unit {maintenance?.unit?.unit_name}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit:</FormLabel>
                  <Select onValueChange={(unit) => field.onChange(unit)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {occupiedUnits.map((unit) => (
                        <SelectItem key={unit.id} value={unit.id.toString()}>
                          {unit.unit_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={type} />
                    </SelectTrigger>

                    <SelectContent>
                      {MAINTENANCETYPES.map((type, idx) => (
                        <SelectItem key={idx} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>

                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance Cost</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="3000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance Status</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={status ?? "Select status"} />
                    </SelectTrigger>

                    <SelectContent>
                      {MAINTENANCESTATUS.map((type, idx) => (
                        <SelectItem key={idx} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>

                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Replaced liking sink"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="p-0">
              <Button
                className="w-full"
                onClick={form.handleSubmit(onSubmit)}
                disabled={form.formState.isSubmitting}
              >
                Create{" "}
                {form.formState.isSubmitting && (
                  <RotateCcw className="ml-2 h-4 w-4" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

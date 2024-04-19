"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { Unit } from "../../../../types/property";
import { useState } from "react";
import useAxiosAuth from "@/hooks/use-axios-auth";

const MAINTENANCETYPES = ["Routine", "Preventive", "Corrective"] as const;

const maintenanceSchema = z.object({
  type: z.enum(MAINTENANCETYPES),
  fee: z.string().min(2, { message: "Please enter a valid amount" }),
  date: z.string().min(3, { message: "Please input a valid date" }),
  unit: z.string().min(1, { message: "Please select a unit" }),
  description: z.string().min(3, { message: "Description is required" }),
});

const AddUnitMaintenanceModal = ({ units }: { units: Unit[] }) => {
  // const { data: session } = useSession();
  const { toast } = useToast();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof maintenanceSchema>>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      type: "Routine",
      unit: "",
      fee: "",
      date: "",
      description: "",
    },
  });

  const occupiedUnits = units.filter((unit) => unit.tenant);

  const onSubmit = async (data: z.infer<typeof maintenanceSchema>) => {
    const maintenance = {
      maintenance_type: data.type,
      maintenance_fee: data.fee,
      maintenance_date: data.date,
      description: data.description,
      maintenance_status: "false",
    };

    const propertyId = units[0].property;
    const unitId = data.unit;

    try {
      const res = await axiosAuth.post(
        `/property/properties/${propertyId}/units/${unitId}/maintenances/`,
        maintenance
      );

      if (res.status === 201) {
        form.reset();
        toast({
          title: "Success",
          description: "Maintenance updated successfully",
        });
        router.refresh();
        setOpen(false);
      }
    } catch (err: any) {
      console.log(err?.response.data);
      if (!err.response) {
        toast({
          description:
            "Failed to add maintenance! Check your internet connection",
          variant: "destructive",
        });
      } else if (err?.response.status === 400) {
        if (err.response?.data) {
          toast({
            description: `Error`,
            variant: "destructive",
          });
        }
      }
    }
  };

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 w-4 h-4" /> Maintenance
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            Select a unit and then record a maintenance to it
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
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
            />

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
                      <SelectValue placeholder="select type" />
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

export default AddUnitMaintenanceModal;

"use client";

import { z } from "zod";
import { useState } from "react";
import { format } from "date-fns";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { UnitInput } from "@/types/property";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
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

type AddProps = {
  unit: UnitInput;
};

const tenantSchema = z.object({
  meterReading: z.string().refine((value) => /^\d+(\.\d+)?$/.test(value), {
    message: "Invalid decimal format for meter reading",
  }),
});

const AddMeterReading = ({ unit }: AddProps) => {
  const [open, setOpen] = useState(false);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof tenantSchema>>({
    resolver: zodResolver(tenantSchema),
    defaultValues: { meterReading: "" },
  });

  const propertyId = unit.property;
  const unitId = unit.id;
  const date = new Date();

  const onsubmit = async (data: z.infer<typeof tenantSchema>) => {
    const reading = {
      reading_date: format(date, "yyyy-MM-dd"),
      meter_reading: data.meterReading,
    };

    try {
      await axiosAuth.post(
        `/property/properties/${propertyId}/units/${unitId}/meter_readings/`,
        reading
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
      } else {
        toast({
          description: `${err.response.status} ${err.response.statusText}`,
          variant: "destructive",
        });
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
          <PlusCircle className="w-5 h-5 mr-2" /> Add Reading
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add meter reading for unit {unit.unit_name}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="py-8">
            <FormField
              control={form.control}
              name="meterReading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meter reading</FormLabel>
                  <FormControl>
                    <Input placeholder="0727.0000" type="text" {...field} />
                  </FormControl>
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

export default AddMeterReading;

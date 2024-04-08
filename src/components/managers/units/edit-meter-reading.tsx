"use client";

import { z } from "zod";
import { useState } from "react";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { MeterReading } from "@/types/property";
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
  reading: MeterReading;
};

const readingSchema = z.object({
  meterReading: z.string().refine((value) => /^\d+(\.\d+)?$/.test(value), {
    message: "Invalid decimal format for meter reading",
  }),
});

const EditMeterReading = ({ reading }: AddProps) => {
  const [open, setOpen] = useState(false);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof readingSchema>>({
    resolver: zodResolver(readingSchema),
    defaultValues: {
      meterReading: reading?.meter_reading,
    },
    mode: "onChange",
  });

  const onsubmit = async (data: z.infer<typeof readingSchema>) => {
    try {
      const res = await axiosAuth.patch(
        `/property/meter_readings/${reading.id}/`,
        { ...reading, meter_reading: data.meterReading }
      );

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
          <Edit className="w-5 h-5 mr-2" /> Edit Reading
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update meter reading</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="py-8">
            <FormField
              control={form.control}
              name="meterReading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current meter reading</FormLabel>
                  <FormControl>
                    <Input placeholder="527.0000" type="text" {...field} />
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
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditMeterReading;

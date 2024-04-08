"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import { z } from "zod";
import { RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { Unit } from "@/types/property";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";

const FORTYPES = ["rent", "deposit", "maintenance"] as const;
const METHODTYPES = ["cash", "m-pesa", "bank"] as const;

const paymentSchema = z.object({
  date: z.string().min(3, { message: "Please enter a valid date" }),
  method: z.enum(METHODTYPES),
  amount: z.number().min(2, { message: "Please enter a valid fee" }),
  receipt: z
    .string()
    .min(10, { message: "Please enter a valid receipt number" })
    .max(15),
  paymentFor: z.enum(FORTYPES),
  unit: z.string().min(1, { message: "Please select a unit" }),
});

const AddUnitPaymentDialog = ({ units }: { units: Unit[] }) => {
  // const { data: session } = useSession();
  const { toast } = useToast();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const occupiedUnits = units.filter((unit) => unit.tenant);

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      unit: "",
      date: "",
      method: "cash",
      receipt: "",
      amount: 0,
      paymentFor: "rent",
    },
  });

  const onSubmit = async (data: z.infer<typeof paymentSchema>) => {
    const pay = {
      payment_date: data.date,
      payment_method: data.method,
      payment_amount: data.amount,
      payment_for: data.paymentFor,
      receipt_no: data.receipt,
    };

    const propertyId = units[0].property;
    const unitId = data.unit;

    try {
      const res = await axiosAuth.post(
        `/property/properties/${propertyId}/units/${unitId}/payments/`,
        pay
      );

      if (res.status === 201) {
        form.reset();
        toast({ description: "Payment updated successfully" });
        router.push("/home/managers/finances/payments");
        router.refresh();
        setOpen(false);
      }
    } catch (err: any) {
      console.log(err?.response.data);
      if (!err.response) {
        toast({
          description: "Failed to make payment! Check your internet connection",
          variant: "destructive",
        });
      } else if (err?.response.status === 400) {
        if (err.response?.data) {
          toast({
            description: `${err.response.data[0]}`,
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
          <Plus className="mr-2 w-4 h-4" />
          Payment
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make a payment for a unit</DialogTitle>
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
                  <FormLabel>Payment Date:</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="12/12/1919" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment For:</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="The payment is for?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FORTYPES.map((pay, idx) => (
                        <SelectItem
                          key={idx}
                          value={pay}
                          className="capitalize"
                        >
                          {pay}
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
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Amount:</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="3000"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method:</FormLabel>
                  <Select onValueChange={(method) => field.onChange(method)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {METHODTYPES.map((method, idx) => (
                        <SelectItem
                          key={idx}
                          value={method}
                          className="capitalize"
                        >
                          {method}
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
              name="receipt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receipt Number:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="SC524HUUTM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="p-0 mt-8">
              <Button className="w-full" disabled={form.formState.isSubmitting}>
                Pay{" "}
                {form.formState.isSubmitting && (
                  <RotateCcw className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUnitPaymentDialog;

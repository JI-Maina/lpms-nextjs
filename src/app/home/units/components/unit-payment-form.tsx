"use client";

import { z } from "zod";
import { RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import axiosPrivate from "@/lib/axios-private";
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

const FORTYPES = ["rent", "deposit", "maintenance"] as const;
const METHODTYPES = ["cash", "m-pesa", "bank"] as const;

const paymentSchema = z.object({
  date: z.string(),
  method: z.enum(METHODTYPES),
  amount: z.number(),
  paymentFor: z.enum(FORTYPES),
});

const UnitPaymentForm = ({ unit }: { unit: Unit }) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      date: "",
      method: "cash",
      amount: 0,
      paymentFor: "rent",
    },
  });

  const propertyId = unit.property;
  const unitId = unit.id;

  const onSubmit = async (data: z.infer<typeof paymentSchema>) => {
    const pay = {
      payment_date: data.date,
      payment_method: data.method,
      payment_amount: data.amount,
      payment_for: data.paymentFor,
    };

    try {
      const res = await axiosPrivate.post(
        `/property/properties/${propertyId}/units/${unitId}/payments/`,
        pay,
        {
          headers: { Authorization: `Bearer ${session?.access_token}` },
        }
      );

      if (res.status === 201) {
        form.reset();
        toast({ description: "Payment updated successfully" });
        router.refresh();
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

  return (
    <Card>
      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <CardFooter className="p-0 mt-8">
              <Button className="w-full" disabled={form.formState.isSubmitting}>
                Pay{" "}
                {form.formState.isSubmitting && (
                  <RotateCcw className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UnitPaymentForm;

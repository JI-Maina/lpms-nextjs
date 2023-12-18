"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type Params = {
  params: {
    unitId: string;
  };
};

const UnitPayment = () => {
  const form = useForm({
    defaultValues: {
      paymentDate: "",
      paymentMethod: "",
      paymentAmount: "",
      paymentFor: "",
    },
  });

  return (
    <Card>
      <CardContent className="mt-4">
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="paymentDate"
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
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="M-pesa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Amount:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="M-pesa" {...field} />
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
                  <FormControl>
                    <Input type="text" placeholder="rent" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="p-0">
              <Button className="w-full">Pay</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UnitPayment;

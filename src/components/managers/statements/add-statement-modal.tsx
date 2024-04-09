"use client";

import { z } from "zod";
import { useState } from "react";
import { Plus } from "lucide-react";
import { RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
// import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Property } from "@/types/property";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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

const MONTHTYPES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

const paymentSchema = z.object({
  // year: z.string().min(2, { message: "Please enter a valid year" }),
  year: z.number().min(2, { message: "Please enter a valid year" }),
  month: z.enum(MONTHTYPES),
});

const AddStatementDialog = ({ property }: { property: Property }) => {
  // const { data: session } = useSession();
  const { toast } = useToast();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const mont = new Date().getMonth();

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      month: MONTHTYPES[mont],
    },
  });

  const onSubmit = async (data: z.infer<typeof paymentSchema>) => {
    const statement = {
      statement_year: data.year,
      statement_month: MONTHTYPES.indexOf(data.month) + 1,
    };

    try {
      const res = await axiosAuth.post(
        `/property/properties/${property?.id}/statements/`,
        statement
      );

      if (res.status === 201) {
        form.reset();
        toast({ description: "Statement generated successfully" });
        // location.reload();
        router.refresh();
        setOpen(false);
      }
    } catch (err: any) {
      console.log(err?.response.data);
      if (!err.response) {
        toast({
          description:
            "Failed to generate statement! Check your internet connection",
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
          Statement
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            Generate statement for {property.property_name}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={MONTHTYPES[mont]}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="The statement is for?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MONTHTYPES.map((pay, idx) => (
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

            <DialogFooter className="p-0 mt-8">
              <Button className="w-full" disabled={form.formState.isSubmitting}>
                Generate statement{" "}
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

export default AddStatementDialog;

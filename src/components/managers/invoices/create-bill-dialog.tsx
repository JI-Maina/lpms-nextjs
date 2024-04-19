"use client";

import { z } from "zod";
import { Dispatch, SetStateAction, useState } from "react";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Bill, Unit } from "../../../../types/property";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/hooks/use-axios-auth";
import {
  Dialog,
  DialogClose,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  unit: Unit;
  setNewBills: Dispatch<SetStateAction<Bill[]>>;
  waterBill: Bill;
};

const UNITTYPES = ["water", "garbage", "parking"] as const;

const unitSchema = z.object({
  billType: z.enum(UNITTYPES),
  billAmount: z.string().min(1, { message: "unit name is required" }),
});

const CreateBillsDialog = ({ unit, setNewBills, waterBill }: Props) => {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof unitSchema>>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      billAmount: "",
      billType: "garbage",
    },
  });

  const onSubmit = async (data: z.infer<typeof unitSchema>) => {
    const bill = {
      bill_amount: data.billAmount,
      bill_date: format(new Date(), "yyyy-MM-dd"),
      bill_type: data.billType,
      unit: unit?.id,
      meter_reading: null,
    };

    // console.log(bill);

    try {
      const res = await axiosAuth.post(
        `/property/properties/${unit.property}/units/${unit.id}/bills/`,
        bill
      );
      console.log(res);
      if (res.status === 201) {
        const newBill: Bill = res.data;
        setNewBills((prevBills) => [...prevBills, newBill, waterBill]);

        setOpen(false);
        router.refresh();
        toast({ description: "Bill added" });
        form.reset();
      }
    } catch (err: any) {
      console.log(err);
      if (!err?.response) {
        toast({
          description: "Creation Failed! Check your internet connection",
          variant: "destructive",
        });
      } else if (err?.response?.status === 400) {
        if (err.response.data) {
          toast({
            description: err.response.data[0],
            variant: "destructive",
            title: "Error",
          });
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
          <Plus className="h-4 w-4 mr-2" />
          Bill
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            Add a new bill for tenant {unit?.tenant?.user.first_name}{" "}
            {unit?.tenant?.user.last_name} occupying unit {unit?.unit_name}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="billType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bill</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bill type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {UNITTYPES.map((type, idx) => (
                        <SelectItem
                          key={idx}
                          value={type}
                          className="capitalize"
                        >
                          {type}
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
              name="billAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="3500.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBillsDialog;

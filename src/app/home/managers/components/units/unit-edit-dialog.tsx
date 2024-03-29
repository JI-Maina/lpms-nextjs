"use client";

import { z } from "zod";
import { useState } from "react";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
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
import { Unit } from "@/types/property";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";

const UNITTYPES = [
  "single-room",
  "double-room",
  "bedsitter",
  "1-bedroom",
  "2-bedroom",
] as const;

const unitSchema = z.object({
  unit_name: z.string().min(1, { message: "unit name is required" }),
  unit_type: z.string(),
  unit_deposit: z.number().positive({ message: "Deposit is required" }),
  unit_size: z.string().min(1, { message: "unit size is required" }),
  unit_rent: z.number().positive({ message: "enter valid rent" }),
  // unit_img: z.string().nullable(),
});

const UnitEditDialog = ({ unit }: { unit: Unit }) => {
  // const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof unitSchema>>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      unit_name: unit.unit_name,
      unit_type: unit.unit_type,
      unit_deposit: parseInt(unit.unit_deposit),
      unit_size: unit.unit_size,
      unit_rent: parseInt(unit.unit_rent),
      // unit_img: unit.unit_img,
    },
    mode: "onChange",
  });

  // console.log(unit.tenant?.id);
  const tenant = unit.tenant?.id;
  const propertyId = unit.property;
  const unitId = unit.id;

  const onsubmit = async (data: z.infer<typeof unitSchema>) => {
    const updatedUnit = { ...unit, tenant };

    try {
      await axiosAuth.patch(
        `/property/properties/${propertyId}/units/${unitId}/`,
        { ...updatedUnit, ...data }
      );

      // console.log(res);
      toast({ description: "Success" });
      setOpen(false);
      router.refresh();
    } catch (err: any) {
      console.log(err);
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
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Edit className="w-5 h-5" color="#25f609" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit unit</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="unit_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="A001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size (sq meters)</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="10 by 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="unit_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={unit.unit_type} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {UNITTYPES.map((type, idx) => (
                        <SelectItem key={idx} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="unit_deposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
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
                name="unit_rent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rent</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
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
            </div>
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

export default UnitEditDialog;

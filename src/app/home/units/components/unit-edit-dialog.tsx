"use client";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UNITTYPES = [
  "single-room",
  "double-room",
  "bedsitter",
  "1-bedroom",
  "2-bedroom",
] as const;

const unitSchema = z.object({
  unit_name: z.string().min(1, { message: "unit name is required" }),
  unit_type: z.enum(UNITTYPES),
  unit_deposit: z.number().positive({ message: "Deposit is required" }),
  unit_size: z.string().min(1, { message: "unit size is required" }),
  unit_rent: z.number().positive({ message: "enter valid rent" }),
  unit_img: z.string(),
});

const UnitEditDialog = ({ unit }: { unit: Unit }) => {
  const form = useForm({
    defaultValues: {
      unit_name: unit.unit_name,
      unit_type: unit.unit_type,
      unit_deposit: unit.unit_deposit,
      unit_size: unit.unit_size,
      unit_rent: unit.unit_rent,
      unit_img: unit.unit_img,
    },
    mode: "onChange",
  });

  const onsubmit = (data) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Edit className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit unit</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)}>
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
                    <FormLabel>Size</FormLabel>
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

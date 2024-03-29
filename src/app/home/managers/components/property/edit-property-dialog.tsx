"use client";

import { z } from "zod";
import { useState } from "react";
import { FileEdit } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Property } from "@/types/property";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROPERTYTYPE = ["Residential", "Commercial"] as const;

const EditSchema = z.object({
  property_name: z.string().min(3).max(20),
  property_lrl: z.string().min(3).max(10),
  property_type: z.string(),
  number_of_units: z.number(),
  number_of_floors: z.number(),
  water_rate_per_unit: z
    .string()
    .refine((value) => /^\d+(\.\d+)?$/.test(value), {
      message: "Invalid decimal format for water_rate_per_unit",
    }),
});

type EditInput = z.infer<typeof EditSchema>;

const EditPropertyDialog = ({ property }: { property: Property }) => {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<EditInput>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      property_name: property.property_name,
      property_lrl: property.property_lrl,
      property_type: property.property_type,
      number_of_units: property.number_of_units,
      water_rate_per_unit: property.water_rate_per_unit,
      number_of_floors:
        property.number_of_floors === null ? 0 : property.number_of_floors,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: EditInput) => {
    try {
      const res = await axiosAuth.patch(
        `/property/properties/${property.id}/`,
        { ...property, ...data }
      );

      if (res.status === 200) {
        toast({ description: `${property.property_name} details updated` });
        router.refresh();
        setOpen(false);
      }
    } catch (error: any) {
      if (!error.response) {
        toast({
          description: "Update Failed! Check your internet connection",
          variant: "destructive",
        });
      } else if (error.response.status === 400) {
        if (error.response?.data?.water_rate_per_unit) {
          toast({
            description: `On water rate ${error.response.data.water_rate_per_unit[0]}`,
            variant: "destructive",
          });
        }
      } else {
        toast({
          description: `${error.response.status} ${error.response.statusText}`,
          variant: "destructive",
        });
      }
    }
  };

  const onOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <FileEdit color="#25f609" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
          <DialogDescription>
            Make changes to your property here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="property_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ABC apartments"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="property_lrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LR Number</FormLabel>
                  <FormControl>
                    <Input placeholder="D0064" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="property_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROPERTYTYPE.map((type, idx) => (
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

            <FormField
              control={form.control}
              name="water_rate_per_unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Water Rate per Unit</FormLabel>
                  <FormControl>
                    <Input placeholder="27.00" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number_of_floors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Floors</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number_of_units"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Units</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPropertyDialog;

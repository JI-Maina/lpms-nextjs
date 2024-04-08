"use client";

import { z } from "zod";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import { PROPERTYTYPE, propertySchema } from "@/components/forms/form-schema";
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

export const CreatePropertyDialog = () => {
  const [open, setOpen] = useState(false);
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: "",
      lrl: "",
      type: "Residential",
      units: 0,
      floors: 0,
      water_rate: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof propertySchema>) => {
    const property = {
      property_name: data.name,
      property_lrl: data.lrl,
      property_type: data.type,
      number_of_units: data.units,
      number_of_floors: data.floors,
      water_rate_per_unit: data.water_rate,
    };

    try {
      await axiosAuth.post("/property/properties/", property);

      location.reload();
      form.reset();
      toast({ title: "Success", description: "Property created" });
      setOpen(false);
    } catch (err: any) {
      // console.log(err);
      if (!err?.response) {
        toast({
          description: "Creation Failed! Check your internet connection",
          variant: "destructive",
        });
      } else if (err.response.status === 400) {
        if (err.response?.data?.water_rate_per_unit) {
          toast({
            description: `On water rate ${err.response.data.water_rate_per_unit[0]}`,
            variant: "destructive",
          });
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
          <Plus className="h-5 w-5 mr-2" />
          Property
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new property</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
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
              name="lrl"
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
              name="type"
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
              name="water_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Water Rate per unit</FormLabel>
                  <FormControl>
                    <Input placeholder="15.00" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="floors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Floors</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="units"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Units</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Create
                  {form.formState.isSubmitting && (
                    <ReloadIcon className="animate-spin h-3 w-3" />
                  )}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import { Caretaker, Property } from "@/types/property";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = { caretakers: Caretaker[]; property: Property };

const AddCaretakerDialog = ({ caretakers, property }: Props) => {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      caretaker: caretakers[0]?.id.toString(),
    },
  });

  const onSubmit = async (data: { caretaker: string }) => {
    const caretaker = parseInt(data.caretaker);

    try {
      const res = await axiosAuth.patch(
        `/property/properties/${property.id}/`,
        { ...property, caretaker }
      );

      if (res.status === 200) {
        toast({ description: "Caretaker assigned", title: "Success" });
        router.refresh();
        setOpen(false);
      }
    } catch (error: any) {
      if (!error.response) {
        toast({
          description:
            "Operation Failed! Please check your internet connection",
          variant: "destructive",
        });
      } else {
        toast({
          description: `${error?.status} ${error?.statusText}`,
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
        <Button size="sm">Assign</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Select caretaker and assign to {property.property_name}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-8 mt-3"
          >
            <FormField
              control={form.control}
              name="caretaker"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a caretaker to assign" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {caretakers.map((caretaker) => (
                        <SelectItem
                          value={caretaker.id.toString()}
                          key={caretaker.id}
                        >
                          {caretaker.user.first_name} {caretaker.user.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit">Assign</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCaretakerDialog;

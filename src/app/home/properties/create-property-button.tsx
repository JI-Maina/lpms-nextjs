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
import { Plus, RotateCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { propertySchema } from "@/components/forms/form-schema";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const CreatePropertyButton = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: "",
      lrl: "",
      units: 0,
      floors: 0,
      image: "",
      caretaker: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof propertySchema>) => {
    const property = {
      property_name: data.name,
      property_lrl: data.lrl,
      number_of_units: data.units,
      number_of_floors: data.floors,
      property_img: data.image ? 0 : null,
      care_taker: data.caretaker ? 0 : null,
    };
    console.log(property);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/property/properties/",
        property,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast({ description: res.statusText });
      router.refresh();
      setOpen(false);
    } catch (err: any) {
      console.log(err);
      if (!err?.response) {
        toast({
          description: "Registration Failed! Check your internet connection",
          variant: "destructive",
        });
      } else if (err?.response?.status === 400) {
        if (err.response?.data.number_of_units) {
          toast({
            description: `Units - ${err.response.data?.number_of_units[0]}`,
            variant: "destructive",
          });
        }
      } else if (err?.response?.status === 404) {
        toast({ description: `404 - ${err.code}`, variant: "destructive" });
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
          Add
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new property</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                  <FormLabel>LRL</FormLabel>
                  <FormControl>
                    <Input placeholder="D0064" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="floors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Floors</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="caretaker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caretaker</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>image</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
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
                  Create {form.formState.isSubmitting && <RotateCw />}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePropertyButton;

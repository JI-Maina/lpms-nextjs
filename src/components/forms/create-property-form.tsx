"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogFooter } from "../ui/dialog";
import { z } from "zod";
import { propertySchema } from "./form-schema";
import { zodResolver } from "@hookform/resolvers/zod";

const CreatePropertyForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: "",
      lrl: "",
      units: 0,
      floors: 0,
      // image: "",
      // caretaker: 0,
    },
  });

  const onSubmit = (data: z.infer<typeof propertySchema>) => {
    console.log(data);
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="ABC apartments" type="text" {...field} />
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

        {/* <FormField
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
        /> */}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </Dialog>
      </form>
    </Form>
  );
};

export default CreatePropertyForm;

"use client";

import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { Unit } from "@/types/property";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";

const MAINTENANCETYPES = ["Routine", "Preventive", "Corrective"] as const;

const maintenanceSchema = z.object({
  type: z.enum(MAINTENANCETYPES),
  fee: z.string().min(2, { message: "Please enter a valid amount" }),
  date: z.string().min(3, { message: "Please input a valid date" }),
});

const UnitMaintenanceForm = ({ unit }: { unit: Unit }) => {
  // const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof maintenanceSchema>>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      type: "Routine",
      fee: "",
      date: "",
    },
  });

  const propertyId = unit.property;
  const unitId = unit.id;

  const onSubmit = async (data: z.infer<typeof maintenanceSchema>) => {
    const maintenance = {
      maintenance_type: data.type,
      maintenance_fee: data.fee,
      maintenance_date: data.date,
    };

    try {
      const res = await axiosAuth.post(
        `/property/properties/${propertyId}/units/${unitId}/maintenances/`,
        maintenance
      );

      if (res.status === 201) {
        form.reset();
        toast({
          title: "Success",
          description: "Maintenance updated successfully",
        });
        router.refresh();
      }
    } catch (err: any) {
      // console.log(err?.response.data);
      if (!err.response) {
        toast({
          description: "Failed to make payment! Check your internet connection",
          variant: "destructive",
        });
      } else if (err?.response.status === 400) {
        if (err.response?.data) {
          toast({
            description: `Error`,
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <Card>
      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
                  <FormLabel>Maintenance Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="select type" />
                    </SelectTrigger>

                    <SelectContent>
                      {MAINTENANCETYPES.map((type, idx) => (
                        <SelectItem key={idx} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>

                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance Cost</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="3000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="p-0">
              <Button
                className="w-full"
                onClick={form.handleSubmit(onSubmit)}
                disabled={form.formState.isSubmitting}
              >
                Create{" "}
                {form.formState.isSubmitting && (
                  <RotateCcw className="ml-2 h-4 w-4" />
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UnitMaintenanceForm;

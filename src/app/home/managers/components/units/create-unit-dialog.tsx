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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

const CreateUnitDialog = ({ propertyId }: { propertyId: string }) => {
  // const { data: session } = useSession();
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  //   const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof unitSchema>>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      unit_name: "",
      unit_type: "single-room",
      unit_deposit: 0,
      unit_size: "",
      unit_rent: 0,
      unit_img: "",
    },
  });

  //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //       setSelectedFile(file);
  //     }
  //   };

  const onSubmit = async (data: z.infer<typeof unitSchema>) => {
    const unitData = {
      unit_name: data.unit_name,
      unit_type: data.unit_type,
      unit_deposit: data.unit_deposit,
      unit_size: data.unit_size,
      unit_rent: data.unit_rent,
    };

    // const formData = new FormData();
    // formData.append("unit_name", data.unit_name);
    // formData.append("unit_type", data.unit_type);
    // formData.append("unit_size", data.unit_size);
    // formData.append("unit_rent", String(data.unit_rent));
    // formData.append("unit_deposit", String(data.unit_deposit));
    // formData.append("unit_img", selectedFile);
    // console.log(selectedFile[0]);
    // console.log([...formData.entries()]);

    try {
      const res = await axiosAuth.post(
        `/property/properties/${propertyId}/units/`,
        unitData
      );

      //   console.log(res);
      setOpen(false);
      // location.reload();
      // router.push("/home/managers/units");
      router.refresh();
      toast({ description: "Unit created" });
      form.reset();
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
          // } else if (err.response.data?.user.id_number) {
          //   toast({
          //     description: err.response.data.user.id_number[0],
          //     variant: "destructive",
          //   });
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
          <Plus className="h-4 w-4" />
          Unit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new unit</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                        <SelectValue placeholder="Select a unit type" />
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

            {/* <FormField
              control={form.control}
              name="unit_img"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} onChange={handleFileChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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

export default CreateUnitDialog;

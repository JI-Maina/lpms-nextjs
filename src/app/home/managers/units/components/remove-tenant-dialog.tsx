"use client";

import { UserX } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Unit } from "@/types/property";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";

const RemoveTenantDialog = ({ unit }: { unit: Unit }) => {
  // const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();

  const propertyId = unit.property;
  const unitId = unit.id;

  const onsubmit = async () => {
    try {
      await axiosAuth.patch(
        `/property/properties/${propertyId}/units/${unitId}/`,
        { ...unit, tenant: null }
      );
      //   console.log(res);
      toast({ description: "Success" });
      router.refresh();
    } catch (err: any) {
      //   console.log(err);
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
          });
        }
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="outline">
          <UserX className="h-5 w-5" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          Are you absolutely sure?
          <AlertDialogDescription className="mt-4">
            This action cannot be undone. This will remove{" "}
            {unit.tenant?.user.first_name} {unit.tenant?.user.last_name} from
            unit {unit.unit_name}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onsubmit}>Proceed</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveTenantDialog;

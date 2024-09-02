"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Maintenance } from "../../../../types/property";

export const DeleteMaintenanceModal = ({
  maintenance,
}: {
  maintenance: Maintenance;
}) => {
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();

  const id = maintenance.id;
  const unitId = maintenance.unit.id;
  const propertyId = maintenance.unit.property;

  const handleDelete = async () => {
    try {
      await axiosAuth.delete(
        `/property/properties/${propertyId}/units/${unitId}/maintenances/${id}/`
      );

      toast({ description: `Success! maintenance deleted` });
      router.refresh();
    } catch (err: any) {
      //   console.log(err);
      if (!err?.response) {
        toast({
          description: "Deletion Failed! Check your internet connection",
          variant: "destructive",
        });
      } else {
        toast({
          description: "Maintenance deletion failed!",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button size="icon" variant="outline">
          <Trash2 className="w-5 h-5" color="#f60909" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>Are you absolutly sure?</AlertDialogHeader>

        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          maintenace for unit
          {maintenance.unit.unit_name} and its related data.
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Proceed</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

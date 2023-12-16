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
import axiosPrivate from "@/lib/axios-private";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UnitDeleteDialog = ({ unit }: { unit: Unit }) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axiosPrivate.delete(
        `/property/properties/${unit.property}/units/${unit.id}/`,
        {
          headers: { Authorization: `Bearer ${session?.access_token}` },
        }
      );

      toast({ description: `Success! unit ${unit.unit_name} deleted` });
      router.refresh();
    } catch (err: any) {
      console.log(err);
      if (!err?.response) {
        toast({
          description: "Deletion Failed! Check your internet connection",
          variant: "destructive",
        });
      } else {
        toast({
          description: "Property deletion failed!",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Trash2 className="w-5 h-5" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>Are you absolutly sure?</AlertDialogHeader>

        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your unit{" "}
          {unit.unit_name} and its related data.
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Proceed</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UnitDeleteDialog;

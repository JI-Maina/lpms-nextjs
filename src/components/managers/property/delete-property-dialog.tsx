"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
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

const DeletePropertyDialog = ({ id }: { id: string }) => {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const res = await axiosAuth.delete(`/property/properties/${id}`);

      if (res.status === 204) {
        toast({ description: "Success! property deleted" });
        location.reload();
      }
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
        <Button variant="outline" size="icon">
          <Trash2 color="#f60909" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>Are you absolutey sure?</AlertDialogHeader>

        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          property and its related data.
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Proceed</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePropertyDialog;

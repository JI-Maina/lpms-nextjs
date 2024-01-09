"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
import useAxiosAuth from "@/lib/hooks/use-axios-auth";

const PropertyDeleteDialog = ({ id }: { id: string }) => {
  // const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await axiosAuth.delete(`/property/properties/${id}`);

      router.refresh();
      toast({ description: "Success! property deleted" });
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
          <Trash2 />
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

export default PropertyDeleteDialog;

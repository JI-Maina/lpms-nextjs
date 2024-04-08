"use client";

import { Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { Caretaker } from "@/types/property";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/use-axios-auth";
import {
  AlertDialogAction,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

type DeleteProps = {
  caretaker: Caretaker;
};

const DeleteCaretakersDialog = ({ caretaker }: DeleteProps) => {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const res = await axiosAuth.delete(`/users/caretakers/${caretaker.id}/`);

      if (res.status === 204) {
        toast({ description: "Caretaker Deleted", title: "Success" });
        router.refresh();
      }
    } catch (error: any) {
      if (!error.response) {
        toast({
          description:
            "Failed to remove caretaker, Please check your internet connection!",
          variant: "destructive",
        });
      } else if (error.response.status === 404) {
        toast({
          title: "Error!",
          variant: "destructive",
          description: `Caretaker ${error.response.statusText}`,
        });
      } else {
        toast({
          title: `Error! ${error.response.status}`,
          variant: "destructive",
          description: `${error.response.statusText}`,
        });
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="w-4 h-4" color="#f60909" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete caretaker{" "}
            {caretaker.user.username} and remove his/her data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCaretakersDialog;

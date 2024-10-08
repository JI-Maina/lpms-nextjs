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
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tenant } from "../../../../types/property";
import useAxiosAuth from "@/hooks/use-axios-auth";

const DeleteTenantModal = ({ tenant }: { tenant: Tenant }) => {
  // const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();

  const onDelete = async () => {
    try {
      const res = await axiosAuth.delete(`/users/tenants/${tenant.id}/`);

      if (res.status === 204) {
        toast({ title: "success", description: "Tenant  deleted" });
        router.refresh();
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Tenant deletion failed! Check your internet connection",
        variant: "destructive",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Trash2 className="w-5 h-5" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete tenant{" "}
            {tenant.user.first_name} {tenant.user.last_name} and remove his/her
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Proceed</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTenantModal;

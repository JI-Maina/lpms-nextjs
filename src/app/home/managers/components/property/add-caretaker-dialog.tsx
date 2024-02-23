import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Caretaker } from "@/types/property";
import { PlusCircle, UserPlus } from "lucide-react";

const AddCaretakerDialog = ({ caretakers }: { caretakers: Caretaker[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">add</Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default AddCaretakerDialog;

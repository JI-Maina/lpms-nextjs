import PropertyDeleteDialog from "@/components/home/property/property-delete-dialog";
import PropertyEditDialog from "@/components/home/property/property-edit-dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const SinglePropertyPage = () => {
  return (
    <main>
      <header className="bg-card text-card-foreground p-4 pb-2 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Image
            src="/property-1.jpg"
            alt=""
            width={120}
            height={120}
            className="rounded-sm"
          />

          <div>
            <h2 className="text-lg font-semibold">Django Apartments</h2>
            <p className="text-muted-foreground text-sm">residential</p>
            <p className="text-muted-foreground text-sm">D0065</p>
          </div>
        </div>

        <div className="flex items-center justify-between relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 text-muted-foreground">
            <div className="flex gap-4">
              <h4>no floors</h4>
              <h4>9 units</h4>
            </div>
            <h4>caretaker: James Odipo</h4>
          </div>

          <div className="flex gap-1 absolute right-0 bottom-0">
            buttons
            {/* <PropertyEditDialog />
            <PropertyDeleteDialog /> */}
          </div>
        </div>
      </header>

      <div>Units table</div>
    </main>
  );
};

export default SinglePropertyPage;

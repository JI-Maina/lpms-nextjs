import { Caretaker } from "../../../../../types/property";

import { getUserRole } from "@/actions/actions";
import { columns } from "@/components/managers/caretakers/columns";
import { getAllCaretakers } from "@/lib/data-fetching/fetch-caretakers";
import { CaretakersTable } from "@/components/managers/caretakers/caretakers-table";
import CreateCaretakerDialog from "@/components/managers/caretakers/create-caretaker-dialog";

const CaretakersPage = async () => {
  const caretakersData: Promise<Caretaker[]> = getAllCaretakers();
  const caretakers = await caretakersData;

  const userRole = await getUserRole();

  return (
    <main className="space-y-4">
      <div className="h-36 bg-property bg-cover bg-center bg-no-repeat bg-opacity-5 relative">
        <div className="flex justify-end absolute right-0 bottom-0 p-1">
          {userRole === "owner" && <CreateCaretakerDialog />}
        </div>
      </div>

      <div className="max-w-[360px] sm:max-w-full">
        <CaretakersTable data={caretakers} columns={columns} />
      </div>
    </main>
  );
};

export default CaretakersPage;

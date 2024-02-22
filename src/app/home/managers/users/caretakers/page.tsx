import { Caretaker } from "@/types/property";
import { columns } from "../../components/caretakers/columns";
import { getAllCaretakers } from "@/lib/data-fetching/fetch-caretakers";
import { CaretakersTable } from "../../components/caretakers/caretakers-table";

const CaretakersPage = async () => {
  const caretakersData: Promise<Caretaker[]> = getAllCaretakers();
  const caretakers = await caretakersData;

  return (
    <main className="max-w-[360px] sm:max-w-full">
      <CaretakersTable data={caretakers} columns={columns} />
    </main>
  );
};

export default CaretakersPage;

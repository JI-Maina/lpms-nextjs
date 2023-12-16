import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import { columns } from "./columns";
import { DataTable } from "../components/unit-table";
import PropertyEditDialog from "../components/property-edit-dialog";
import PropertyDeleteDialog from "../components/property-delete-dialog";

type Params = {
  params: {
    propertyId: string;
  };
};

export const getProperty = async (id: string) => {
  const session = await getServerSession(authOptions);

  const res = await fetch(`http://127.0.0.1:8000/property/properties/${id}/`, {
    headers: { Authorization: `Bearer ${session?.access_token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
};

const SinglePropertyPage = async ({ params: { propertyId } }: Params) => {
  const propertyData: Promise<Property> = getProperty(propertyId);
  const property = await propertyData;

  const { unit_set: units } = property;
  console.log(units);

  return (
    <main className="">
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
            <PropertyEditDialog property={property} />
            <PropertyDeleteDialog id={propertyId} />
          </div>
        </div>
      </header>

      <div className="max-w-[360px] sm:max-w-full">
        <DataTable columns={columns} data={units} propertyId={propertyId} />
      </div>
    </main>
  );
};

export default SinglePropertyPage;

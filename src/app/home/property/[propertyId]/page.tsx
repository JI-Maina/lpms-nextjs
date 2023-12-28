import { getProperty } from "@/lib/data-fetching/fetch-property";
import Image from "next/image";
import { UnitsTable } from "../components/unit-table";
import { columns } from "../components/columns";
import { Property } from "@/types/property";

type Props = {
  params: {
    propertyId: string;
  };
};

const PropertyUnitsPage = async ({ params: { propertyId } }: Props) => {
  const propertyData: Promise<Property> = getProperty(propertyId);
  const property = await propertyData;

  const { unit_set: units } = property;

  return (
    <main className="">
      <header className="border text-card-foreground p-4 pb-2 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Image
            src="/property-1.jpg"
            alt={property.property_name}
            width={120}
            height={120}
            priority
            className="rounded-sm"
          />

          <div>
            <h2 className="text-lg font-semibold">{property.property_name}</h2>
            <p className="text-muted-foreground text-sm">residential</p>
            <p className="text-muted-foreground text-sm">
              {property.property_lrl}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between relative">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-muted-foreground">
            <div className="flex gap-4">
              <DetailsCard event="floors" detail={property.number_of_floors} />
              <DetailsCard event="units" detail={property.number_of_units} />
            </div>
            <DetailsCard
              event="caretaker"
              detail={
                property.care_taker
                  ? `${property.care_taker.user.first_name} ${property.care_taker.user.last_name}`
                  : "None"
              }
            />
          </div>

          <div className="flex gap-1 absolute right-0 bottom-0">
            {/* <PropertyEditDialog property={property} /> */}
          </div>
        </div>
      </header>

      <div className="max-w-[360px] sm:max-w-full">
        <UnitsTable columns={columns} data={units} propertyId={propertyId} />
      </div>
    </main>
  );
};

export default PropertyUnitsPage;

const DetailsCard = ({ event, detail }: { event: any; detail: any }) => {
  return (
    <div className="flex items-center justify-between border mb-1 px-1">
      <h1 className="font-semibold text-muted-foreground capitalize">
        {event}:
      </h1>
      <h1 className="ml-2">{detail}</h1>
    </div>
  );
};

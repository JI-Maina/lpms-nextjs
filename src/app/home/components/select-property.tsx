import { getAllProperties } from "@/lib/data-fetching/fetch-property";

import PropertyCard from "./property-card";
import { Property } from "@/types/property";

const SelectProperty = async ({ path }: { path: string }) => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  return (
    <div className="flex flex-col">
      <h1 className="text-xl">Select a property to view it&apos;s payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} path={path} property={property} />
        ))}
      </div>
    </div>
  );
};

export default SelectProperty;

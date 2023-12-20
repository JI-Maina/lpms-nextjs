import PropertyCard from "./property-card";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";

const SelectProperty = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  return (
    <div className="flex flex-col">
      <h1 className="text-xl">Select a property to view it&apos;s payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default SelectProperty;

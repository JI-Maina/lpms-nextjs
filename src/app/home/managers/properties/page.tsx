import PropertyCard from "./components/property-card";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";
import { CreatePropertyDialog } from "./components/CreatePropertyDialog";
import { Property } from "@/types/property";

const PropertyPage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  // console.log(properties[0]);

  return (
    <main className="flex flex-col gap-2">
      <header className="flex items-center justify-between py-4 px-2 rounded-lg border bg-card text-card-foreground shadow-sm">
        <h2 className="text-lg font-semibold">
          {properties && properties.length > 1
            ? `You have ${properties.length} properties`
            : `You have ${properties.length} property`}
        </h2>

        <CreatePropertyDialog />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </main>
  );
};

export default PropertyPage;

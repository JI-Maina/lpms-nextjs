import { PropertyStatements } from "@/components/managers/statements/property-statements";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";
import { Property } from "@/types/property";

const StatementsPage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  return <PropertyStatements properties={properties} />;
};

export default StatementsPage;

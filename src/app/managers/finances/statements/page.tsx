import { Property } from "../../../../../types/property";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";
import { PropertyStatements } from "@/components/managers/statements/property-statements";

const StatementsPage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  return <PropertyStatements properties={properties} />;
};

export default StatementsPage;

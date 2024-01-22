import { Property } from "@/types/property";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";
import PropertyUnits from "./components/property-units";

const UnitsPage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  return <PropertyUnits properties={properties} />;
};

export default UnitsPage;

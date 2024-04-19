import { Property } from "../../../../types/property";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";
import PropertyMaintenances from "@/components/managers/maintenances/property-maintenances";

const MaintenancesPage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  return <PropertyMaintenances properties={properties} />;
};

export default MaintenancesPage;

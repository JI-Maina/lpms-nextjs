import { getAllProperties } from "@/lib/data-fetching/fetch-property";
import { Property } from "@/types/property";
import PropertyMaintenances from "../components/maintenances/property-maintenances";

const MaintenancesPage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  return <PropertyMaintenances properties={properties} />;
};

export default MaintenancesPage;

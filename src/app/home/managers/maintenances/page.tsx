import { Property } from "@/types/property";
import SelectProperty from "../components/select-property";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";
import MaintenanceNavigation from "./components/maintenance-navigation";

const MaintenancePage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  const propertyId = properties.length === 1 && properties[0].id;

  // console.log(payments);
  // console.log(properties.length);

  if (properties.length === 0) {
    return <div>No payments to view, create a property first.</div>;
  }

  return (
    <>
      {properties.length === 1 ? (
        <MaintenanceNavigation property={propertyId as string} />
      ) : (
        <SelectProperty path="/home/managers/maintenances" />
      )}
    </>
  );
};

export default MaintenancePage;

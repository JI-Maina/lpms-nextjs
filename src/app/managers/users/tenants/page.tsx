import { Property } from "@/types/property";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";
import PropertyTenants from "@/components/managers/tenants/property-tenants";

const TenantsPage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  return <PropertyTenants properties={properties} />;
};

export default TenantsPage;

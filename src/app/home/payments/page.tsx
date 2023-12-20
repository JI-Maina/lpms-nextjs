import SelectProperty from "./components/select-property";
import PaymentsNavigation from "./components/payment-navigation";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";

const TenantsPage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  const propertyId = properties.length === 1 && properties[0].id;

  // console.log(payments);
  // console.log(properties.length);

  return (
    <>
      {properties.length === 1 ? (
        <PaymentsNavigation property={propertyId as string} />
      ) : (
        <SelectProperty />
      )}
    </>
  );
};

export default TenantsPage;

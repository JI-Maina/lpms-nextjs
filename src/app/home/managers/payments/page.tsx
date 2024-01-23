import { Property } from "@/types/property";
import SelectProperty from "../components/select-property";
import PaymentsNavigation from "./components/payment-navigation";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";

const TenantsPage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  const propertyId = properties.length === 1 && properties[0].id;

  // console.log(payments);
  // console.log(properties);

  if (properties.length === 0) {
    return <div>No payments to view, create a property first.</div>;
  }

  return (
    <>
      {/* <div>properties page</div> */}
      {properties.length === 1 ? (
        <PaymentsNavigation property={propertyId as string} />
      ) : (
        <SelectProperty path="/home/managers/payments" />
      )}
    </>
  );
};

export default TenantsPage;

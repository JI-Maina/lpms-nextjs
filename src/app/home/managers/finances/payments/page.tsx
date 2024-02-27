import { Property } from "@/types/property";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";
import PropertyPayments from "../../components/payments/property-payments";

const PaymentsPage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  console.log(properties);
  return <PropertyPayments properties={properties} />;
};

export default PaymentsPage;

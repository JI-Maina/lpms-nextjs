import { Property } from "@/types/property";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";
import PropertyInvoices from "@/components/managers/invoices/property-invoices";

const InvoicesPage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  return <PropertyInvoices properties={properties} />;
};

export default InvoicesPage;

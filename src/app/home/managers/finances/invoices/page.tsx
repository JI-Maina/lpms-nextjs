import { Invoice, Property } from "@/types/property";
import PropertyInvoices from "../../components/invoices/property-invoices";
import { getPropertyInvoices } from "@/lib/data-fetching/fetch-invoices";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";

const InvoicesPage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  // const invoiceData: Promise<Invoice[]> = getPropertyInvoices()
  // const invoices = await invoiceData
  return <PropertyInvoices properties={properties} />;
};

export default InvoicesPage;

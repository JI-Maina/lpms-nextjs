import { Property } from "@/types/property";
import CreateInvoiceCard from "@/components/managers/invoices/create-invoice-card";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";

const CreateInvoice = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  return (
    <main className="space-y-6">
      <div className="h-36 bg-property bg-cover bg-center bg-no-repeat bg-opacity-5 relative"></div>

      <CreateInvoiceCard properties={properties} />
    </main>
  );
};

export default CreateInvoice;

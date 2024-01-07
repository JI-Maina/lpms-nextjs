import { columns } from "../components/columns";
import { PaymentsTable } from "../components/payments-table";
import AddUnitPaymentDialog from "../components/add-unit-payment-dialog";
import { getProperty } from "@/lib/data-fetching/fetch-property";
import { Payment, Property } from "@/types/property";
import PropertyHeader from "../../components/property-header";
import { getAllPayments } from "@/lib/data-fetching/fetch-payments";

type Props = {
  params: {
    propertyId: string;
  };
};

const PropertPaymentsPage = async ({ params: { propertyId } }: Props) => {
  const paymentData: Promise<Payment[]> = getAllPayments(propertyId as string);
  const payments = await paymentData;

  const propertyData: Promise<Property> = getProperty(propertyId as string);
  const property = await propertyData;
  const units = property.unit_set;

  return (
    <main>
      <PropertyHeader
        property={property}
        title="Payments Data"
        actionModal={<AddUnitPaymentDialog units={units} />}
      />

      <PaymentsTable data={payments} columns={columns} />
    </main>
  );
};

export default PropertPaymentsPage;

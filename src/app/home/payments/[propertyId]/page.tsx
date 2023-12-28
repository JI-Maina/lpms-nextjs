import { getServerSession } from "next-auth";

import { columns } from "../components/columns";
import { PaymentsTable } from "../components/payments-table";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import AddUnitPaymentDialog from "../components/add-unit-payment-dialog";
import { getProperty } from "@/lib/data-fetching/fetch-property";
import { Property } from "@/types/property";
import PropertyHeader from "../../components/property-header";

type Props = {
  params: {
    propertyId: string;
  };
};

const getAllPayments = async (id: string) => {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `http://127.0.0.1:8000/property/properties/${id}/payments/`,
    {
      headers: { Authorization: `Bearer ${session?.access_token}` },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch payments data");

  return res.json();
};

const PropertPaymentsPage = async ({ params: { propertyId } }: Props) => {
  const paymentData = getAllPayments(propertyId as string);
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

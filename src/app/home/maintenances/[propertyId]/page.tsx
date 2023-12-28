import { getServerSession } from "next-auth";

import { columns } from "../components/columns";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { MaintenancesTable } from "../components/maintenances-table";
import { Maintenance, Property } from "@/types/property";
import AddUnitMaintenanceDialog from "../components/add-unit-maintenance-dialog";
import { getProperty } from "@/lib/data-fetching/fetch-property";
import PropertyHeader from "../../components/property-header";

type Props = {
  params: {
    propertyId: string;
  };
};

const getAllMaintenances = async (id: string) => {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `http://127.0.0.1:8000/property/properties/${id}/maintenances/`,
    {
      headers: { Authorization: `Bearer ${session?.access_token}` },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch payments data");

  return res.json();
};

const PropertMaintenancesPage = async ({ params: { propertyId } }: Props) => {
  const maintenanceData: Promise<Maintenance[]> =
    getAllMaintenances(propertyId);
  const maintenances = await maintenanceData;

  const propertyData: Promise<Property> = getProperty(propertyId);
  const property = await propertyData;
  const units = property.unit_set;
  // console.log(property);

  // console.log(maintenances);
  // console.log(propertyId);

  return (
    <>
      <PropertyHeader
        property={property}
        title="Maintenance Data"
        actionModal={<AddUnitMaintenanceDialog units={units} />}
      />

      <MaintenancesTable data={maintenances} columns={columns} />
    </>
  );
};

export default PropertMaintenancesPage;

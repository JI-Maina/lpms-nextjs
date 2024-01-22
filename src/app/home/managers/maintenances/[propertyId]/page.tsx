import { columns } from "../components/columns";
import { MaintenancesTable } from "../components/maintenances-table";
import { Maintenance, Property } from "@/types/property";
import AddUnitMaintenanceDialog from "../components/add-unit-maintenance-dialog";
import { getProperty } from "@/lib/data-fetching/fetch-property";
import PropertyHeader from "../../components/property-header";
import { getAllMaintenances } from "@/lib/data-fetching/fetch-maintenances";

type Props = {
  params: {
    propertyId: string;
  };
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

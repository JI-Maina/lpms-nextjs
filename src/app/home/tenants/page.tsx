import { Tenant } from "@/types/property";
import { columns } from "./components/columns";
import { TenantsTable } from "./components/tenants-table";
import { getAllTenants } from "@/lib/data-fetching/fetch-tenants";

const TenantsPage = async () => {
  const tenantData: Promise<Tenant[]> = getAllTenants();
  const tenants = await tenantData;

  // console.log(tenants);

  return (
    <div>
      <TenantsTable columns={columns} data={tenants} />
    </div>
  );
};

export default TenantsPage;

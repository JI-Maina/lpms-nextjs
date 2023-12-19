import { getServerSession } from "next-auth";

import { columns } from "./components/columns";
import { TenantsTable } from "./components/tenants-table";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const getAllTenants = async () => {
  const session = await getServerSession(authOptions);

  const res = await fetch("http://127.0.0.1:8000/users/tenants/", {
    headers: { Authorization: `Bearer ${session?.access_token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch tenants data");

  return res.json();
};

const TenantsPage = async () => {
  const tenantData = getAllTenants();
  const tenants = await tenantData;

  console.log(tenants);

  return (
    <div>
      <TenantsTable columns={columns} data={tenants} />
    </div>
  );
};

export default TenantsPage;

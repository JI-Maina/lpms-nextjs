import { getAccessToken } from "@/actions/actions";

const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

export const getAllTenants = async () => {
  const session = await getAccessToken();

  const res = await fetch(`${url}/users/tenants/`, {
    headers: { Authorization: `Bearer ${session}` },
  });

  if (!res.ok) throw new Error("Failed to fetch tenants data");

  return res.json();
};

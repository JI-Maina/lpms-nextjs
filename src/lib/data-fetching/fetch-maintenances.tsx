import { getAccessToken } from "@/actions/actions";

const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

export const getAllMaintenances = async (id: string) => {
  const session = await getAccessToken();

  const res = await fetch(`${url}/property/properties/${id}/maintenances/`, {
    headers: { Authorization: `Bearer ${session}` },
  });

  if (!res.ok) throw new Error("Failed to fetch payments data");

  return res.json();
};

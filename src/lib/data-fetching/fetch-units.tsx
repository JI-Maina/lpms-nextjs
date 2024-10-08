import { getAccessToken } from "@/actions/actions";

const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

export const getUnit = async (unitId: string) => {
  const session = await getAccessToken();

  const res = await fetch(`${url}/property/units/${unitId}/`, {
    headers: { Authorization: `Bearer ${session}` },
  });

  if (!res.ok) throw new Error("Failed to fetch property units");

  return res.json();
};

export const getAllUnits = async () => {
  const session = await getAccessToken();

  const res = await fetch(`${url}/property/units/`, {
    headers: { Authorization: `Bearer ${session}` },
  });

  if (!res.ok) throw new Error("Failed to fetch all units");

  return res.json();
};

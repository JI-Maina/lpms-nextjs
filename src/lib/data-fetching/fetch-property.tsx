import { getAccessToken } from "@/actions/actions";

const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

export const getAllProperties = async () => {
  const session = await getAccessToken();

  const res = await fetch(`${url}/property/properties/`, {
    headers: { Authorization: `Bearer ${session}` },
  });

  if (!res.ok) throw new Error("Failed to fetch property data");

  return res.json();
};

export const getProperty = async (id: string) => {
  const session = await getAccessToken();

  const res = await fetch(`${url}/property/properties/${id}/`, {
    headers: { Authorization: `Bearer ${session}` },
  });

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
};

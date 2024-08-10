import { getAccessToken } from "@/actions/actions";

const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

export const getAllStatements = async () => {
  const session = await getAccessToken();

  const res = await fetch(`${url}/property/statements/`, {
    headers: { Authorization: `Bearer ${session}` },
  });

  if (!res.ok) throw new Error("Failed to fetch statements data");

  return res.json();
};

export const getPropertyStatements = async (id: string) => {
  const session = await getAccessToken();

  const res = await fetch(`${url}/property/properties/${id}/statements/`, {
    headers: { Authorization: `Bearer ${session}` },
  });

  if (!res.ok) throw new Error("Failed to fetch property statements");

  return res.json();
};

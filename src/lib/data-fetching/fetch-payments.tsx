import { getAccessToken } from "@/actions/actions";

const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

export const getAllPayments = async () => {
  const session = await getAccessToken();

  const res = await fetch(`${url}/property/payments/`, {
    headers: { Authorization: `Bearer ${session}` },
  });

  if (!res.ok) throw new Error("Failed to fetch payments data");

  return res.json();
};

export const getPropertyPayments = async (id: string) => {
  const session = await getAccessToken();

  const res = await fetch(`${url}/property/properties/${id}/payments/`, {
    headers: { Authorization: `Bearer ${session}` },
  });

  if (!res.ok) throw new Error("Failed to fetch property payments");

  return res.json();
};

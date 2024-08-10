import { getAccessToken } from "@/actions/actions";

const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

// export const getAllInvoices = async () => {
//   const session = await getCurrentSession();

//   const res = await fetch(`${url}/property/payments/`, {
//     headers: { Authorization: `Bearer ${session?.accessToken}` },
//   });

//   if (!res.ok) throw new Error("Failed to fetch payments data");

//   return res.json();
// };

export const getPropertyInvoices = async (id: string) => {
  const session = await getAccessToken();

  const res = await fetch(`${url}/property/properties/${id}/invoices/`, {
    headers: { Authorization: `Bearer ${session}` },
  });

  if (!res.ok) throw new Error("Failed to fetch property invoices");

  return res.json();
};

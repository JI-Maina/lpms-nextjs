import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

const getCurrentSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

// export const getAllInvoices = async () => {
//   const session = await getCurrentSession();

//   const res = await fetch(`${url}/property/payments/`, {
//     headers: { Authorization: `Bearer ${session?.accessToken}` },
//   });

//   if (!res.ok) throw new Error("Failed to fetch payments data");

//   return res.json();
// };

export const getPropertyInvoices = async (id: string) => {
  const session = await getCurrentSession();

  const res = await fetch(`${url}/property/properties/${id}/invoices/`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch property invoices");

  return res.json();
};

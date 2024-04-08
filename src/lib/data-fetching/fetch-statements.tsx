import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

const getCurrentSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const getAllStatements = async () => {
  const session = await getCurrentSession();

  const res = await fetch(`${url}/property/statements/`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch statements data");

  return res.json();
};

export const getPropertyStatements = async (id: string) => {
  const session = await getCurrentSession();

  const res = await fetch(`${url}/property/properties/${id}/statements/`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch property statements");

  return res.json();
};

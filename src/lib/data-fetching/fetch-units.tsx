import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

const getCurrentSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const getUnit = async (unitId: string) => {
  const session = await getCurrentSession();

  const res = await fetch(`${url}/property/units/${unitId}/`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch property units");

  return res.json();
};

export const getAllUnits = async () => {
  const session = await getCurrentSession();

  const res = await fetch(`${url}/property/units/`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch all units");

  return res.json();
};

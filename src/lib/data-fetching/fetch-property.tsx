import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const getCurrentSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const getAllProperties = async () => {
  const session = await getCurrentSession();

  const res = await fetch("http://127.0.0.1:8000/property/properties/", {
    headers: { Authorization: `Bearer ${session?.access_token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch property data");

  return res.json();
};

export const getProperty = async (id: string) => {
  const session = await getCurrentSession();

  const res = await fetch(`http://127.0.0.1:8000/property/properties/${id}/`, {
    headers: { Authorization: `Bearer ${session?.access_token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
};

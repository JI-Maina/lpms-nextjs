import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

const getCurrentSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const getMeterReading = async (propertyId: string, unitId: string) => {
  const session = await getCurrentSession();

  const res = await fetch(
    `${url}/property/properties/${propertyId}/units/${unitId}/meter_readings/`,
    {
      headers: { Authorization: `Bearer ${session?.accessToken}` },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch meter reading units");

  return res.json();
};

export const getAllMeterReadings = async () => {
  const session = await getCurrentSession();

  const res = await fetch(`${url}/property/meter_readings/`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch all meter readings");

  return res.json();
};

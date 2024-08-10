import { getAccessToken } from "@/actions/actions";

const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

export const getMeterReading = async (propertyId: string, unitId: string) => {
  const session = await getAccessToken();

  const res = await fetch(
    `${url}/property/properties/${propertyId}/units/${unitId}/meter_readings/`,
    {
      headers: { Authorization: `Bearer ${session}` },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch meter reading units");

  return res.json();
};

export const getAllMeterReadings = async () => {
  const session = await getAccessToken();

  const res = await fetch(`${url}/property/meter_readings/`, {
    headers: { Authorization: `Bearer ${session}` },
  });

  if (!res.ok) throw new Error("Failed to fetch all meter readings");

  return res.json();
};

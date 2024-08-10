import { getAccessToken } from "@/actions/actions";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  const { propertyId: id } = params;

  const session = await getAccessToken();
  const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

  const res = await fetch(`${url}/property/properties/${id}/maintenances/`, {
    headers: { Authorization: `Bearer ${session}` },
  });

  const maintenanceData = await res.json();

  return NextResponse.json(maintenanceData);
}

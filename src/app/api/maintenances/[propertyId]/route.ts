import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  const { propertyId: id } = params;

  const session = await getServerSession(authOptions);
  const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

  const res = await fetch(`${url}/property/properties/${id}/maintenances/`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });

  const maintenanceData = await res.json();

  return NextResponse.json(maintenanceData);
}

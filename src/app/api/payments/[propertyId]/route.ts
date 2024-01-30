import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET(request: Request, { params }: any) {
  const { propertyId: id } = params;

  const session = await getServerSession(authOptions);
  const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

  const res = await fetch(`${url}/property/properties/${id}/payments/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const product = await res.json();

  return NextResponse.json(product);
}

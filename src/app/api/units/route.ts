import { getAccessToken } from "@/actions/actions";

export async function GET(request: Request) {
  const session = await getAccessToken();
  const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

  const res = await fetch(`${url}/property/units/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
  });

  const product = await res.json();

  return Response.json(product);
}

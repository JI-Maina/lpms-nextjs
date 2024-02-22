import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

const getCurrentSession = async () => {
  return await getServerSession(authOptions);
};

export const getAllCaretakers = async () => {
  const session = await getCurrentSession();

  const res = await fetch(`${url}/users/caretakers/`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch caretakers data");

  return await res.json();
};

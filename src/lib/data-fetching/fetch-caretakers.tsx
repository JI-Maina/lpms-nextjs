import { getAccessToken } from "@/actions/actions";

const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

// const getCurrentSession = async () => {
//   return await getServerSession(authOptions);
// };

export const getAllCaretakers = async () => {
  const session = await getAccessToken();

  const res = await fetch(`${url}/users/caretakers/`, {
    headers: { Authorization: `Bearer ${session}` },
  });

  if (!res.ok) throw new Error("Failed to fetch caretakers data");

  return await res.json();
};

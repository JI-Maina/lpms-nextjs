import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  console.log(session?.access_token);
  return <div>HomePage</div>;
};

export default HomePage;

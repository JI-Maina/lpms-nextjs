import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import NavigationCard from "@/components/shared/navigation-card";

// edit color="#25f609"
// delete color="#f60909"

const RoleNavigationPage = async () => {
  const session = await getServerSession(authOptions);

  // console.log(session);

  if (session?.user) {
    const {
      user: { userRole },
    } = session;

    if (userRole === "owner") {
      return <NavigationCard />;
    } else if (userRole === "tenant") {
      return <div>Tenant</div>;
    }
  }

  return (
    <div className="space-y-2">
      <span className="font-bold text-4xl">Home, you have properties</span>
      <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
    </div>
  );
};

export default RoleNavigationPage;

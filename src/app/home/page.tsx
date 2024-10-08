import { getUserRole } from "@/actions/actions";
import NavigationCard from "@/components/shared/navigation-card";
import TenantNavigationCard from "@/components/shared/tenant-navigation-card";

// edit color="#25f609"
// delete color="#f60909"

const RoleNavigationPage = async () => {
  const userRole = await getUserRole();

  // console.log(session);

  if (userRole === "owner" || userRole === "caretaker") {
    return <NavigationCard />;
  } else if (userRole === "tenant") {
    return <TenantNavigationCard />;
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

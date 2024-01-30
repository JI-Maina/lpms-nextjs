import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "./components/cards/overview";
import RevenueCard from "./components/cards/revenue-card";
import BalanceCard from "./components/cards/balance-card";
import TenantsCard from "./components/cards/tenants-card";
import VacantsCard from "./components/cards/vacants-card";
import { RecentMaintenances } from "./components/cards/recent-maintenances";

const ManagersHomePage = () => {
  return (
    <div className="mt-3 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <RevenueCard />
        <BalanceCard />
        <TenantsCard />
        <VacantsCard />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Maintenances</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentMaintenances />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagersHomePage;

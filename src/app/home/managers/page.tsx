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
import { getAllPayments } from "@/lib/data-fetching/fetch-payments";
import { YearlyPayments } from "@/types/property";

const ManagersHomePage = async () => {
  const payments: Promise<YearlyPayments> = getAllPayments();
  const paymentData = await payments;

  const payData = getTotalPayments(paymentData);

  console.log(payData);
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
            <Overview data={payData} />
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

type MontlyPayments = { [year: string]: { name: string; total: number }[] };

const getTotalPayments = (paymentData: YearlyPayments): MontlyPayments => {
  const totalPaymentsByYearAndMonth: MontlyPayments = {};

  // Iterate over each year
  for (const year in paymentData) {
    // Initialize an array for the current year
    totalPaymentsByYearAndMonth[year] = [];

    // Iterate over each month within the year
    for (let month = 1; month <= 12; month++) {
      // Find payments for the current month
      const paymentsForMonth = paymentData[year][month.toString()] || [];

      // Calculate total payments for the current month
      const totalPayments = paymentsForMonth.reduce(
        (accumulator, payment) =>
          accumulator + parseFloat(payment.payment_amount),
        0
      );

      // Add an object for the current month to the array
      totalPaymentsByYearAndMonth[year].push({
        name: getMonthName(month),
        total: totalPayments,
      });
    }
  }

  return totalPaymentsByYearAndMonth;
};

function getMonthName(monthNumber: number) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthNumber - 1];
}

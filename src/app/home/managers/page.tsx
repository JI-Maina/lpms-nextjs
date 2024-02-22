import { YearlyPayments } from "@/types/property";
import { Overview } from "./components/cards/overview";
import RevenueCard from "./components/cards/revenue-card";
import BalanceCard from "./components/cards/balance-card";
import TenantsCard from "./components/cards/tenants-card";
import VacantsCard from "./components/cards/vacants-card";
import RecentPayments from "./components/cards/recent-payments";
import { getAllPayments } from "@/lib/data-fetching/fetch-payments";

const ManagersHomePage = async () => {
  const payments: Promise<YearlyPayments> = getAllPayments();
  const paymentData = await payments;

  const payData = getTotalPayments(paymentData);

  return (
    <div className="mt-3 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <RevenueCard />
        <BalanceCard />
        <TenantsCard />
        <VacantsCard />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Overview data={payData} />

        <RecentPayments payments={paymentData} />
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

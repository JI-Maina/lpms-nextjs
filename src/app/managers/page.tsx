import { YearlyPayments } from "../../../types/property";

import { Overview } from "@/components/managers/cards/overview";
import BalanceCard from "@/components/managers/cards/balance-card";
import TenantsCard from "@/components/managers/cards/tenants-card";
import VacantsCard from "@/components/managers/cards/vacants-card";
import RevenueCard from "@/components/managers/cards/revenue-card";
import { getAllPayments } from "@/lib/data-fetching/fetch-payments";
import RecentPayments from "@/components/managers/cards/recent-payments";

const ManagersHomePage = async () => {
  const payments: Promise<YearlyPayments> = getAllPayments();
  const paymentData = await payments;

  const payData = getTotalPayments(paymentData);

  // console.log(payData);
  // console.log(paymentData);

  return (
    <>
      {Object.keys(paymentData).length <= 0 ? (
        <div className="mt-3 space-y-4 flex items-center justify-center h-96 text-2xl">
          No data found! Please create a property first
        </div>
      ) : (
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
      )}
    </>
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

import { YearlyPayments } from "../../../../types/property";
import { getAllPayments } from "@/lib/data-fetching/fetch-payments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RevenueCard = async () => {
  const paymentsData: Promise<YearlyPayments> = getAllPayments();
  const payments = await paymentsData;

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  // Calculate total payents for the year
  const calculateYearlyPayments = (year: number) => {
    const yearPayments = payments?.[year] || {};
    let totalPayments = 0;

    Object.values(yearPayments).forEach((monthlyPayments) => {
      const payments = monthlyPayments.reduce((accumulator, payment) => {
        if (payment.payment_for !== "maintenance") {
          return accumulator + parseInt(payment.payment_amount, 10);
        }
        return accumulator;
      }, 0);
      totalPayments += payments;
    });

    return totalPayments;
  };

  const thisYearsPayments = calculateYearlyPayments(year);
  const lastYearsPayments = calculateYearlyPayments(year - 1);

  const yearIncrement =
    lastYearsPayments !== 0
      ? (
          ((thisYearsPayments - lastYearsPayments) / lastYearsPayments) *
          100
        ).toFixed(2)
      : "0";

  const percentIncrement = yearIncrement.toString();

  // Calculate total payments for the current month
  // const currentMonthPayments = payments[year]?.[month] || [];
  // const currentMonth = currentMonthPayments.reduce(
  //   (accumulator, payment) => accumulator + parseInt(payment.payment_amount),
  //   0
  // );

  // Calculate total payments for the previous month
  // const prevMonthNumber = month - 1 === 0 ? 12 : month - 1;
  // const prevYear = month - 1 === 0 ? year - 1 : year;

  // const prevMonthPayments = payments[prevYear]?.[prevMonthNumber] || [];
  // const prevMonth = prevMonthPayments.reduce(
  //   (accumulator, payment) => accumulator + parseInt(payment.payment_amount),
  //   0
  // );

  // const increment =
  //   prevMonth !== 0
  //     ? (((currentMonth - prevMonth) / prevMonth) * 100).toFixed(2)
  //     : "0";

  // const percentIncrement = increment.toString();
  // console.log(payments);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">KSh{thisYearsPayments}</div>
        <p className="text-xs text-muted-foreground">
          {percentIncrement.startsWith("-") ? `` : `+`}
          {percentIncrement}% from last year
        </p>
      </CardContent>
    </Card>
  );
};

export default RevenueCard;

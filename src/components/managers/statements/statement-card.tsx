import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Statement } from "@/types/property";

export const StatementCard = ({ statement }: { statement: Statement }) => {
  const { statement_month, total_income, total_expenses, net_income } =
    statement;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{months[statement_month - 1]}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <div>Total Income</div>
          <div>{total_income}</div>
        </div>

        <div className="flex justify-between">
          <div>Total Expenses</div>
          <div>{total_expenses}</div>
        </div>

        <div className="flex justify-between">
          <div>Total Income</div>
          <div>{net_income}</div>
        </div>
      </CardContent>
    </Card>
  );
};

import { Statement } from "../../../../types/property";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteStatementDialog from "@/components/managers/statements/delete-statement-dialog";

export const StatementCard = ({ statement }: { statement: Statement }) => {
  const {
    id,
    property,
    net_income,
    total_income,
    statement_month,
    total_expenses,
  } = statement;
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{months[statement_month - 1]}</CardTitle>
        <DeleteStatementDialog id={id} propertyId={property} />
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

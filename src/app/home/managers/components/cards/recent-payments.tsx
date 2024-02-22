import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { YearlyPayments } from "@/types/property";

type PaymentsProps = {
  payments: YearlyPayments;
};

const RecentPayments = ({ payments }: PaymentsProps) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const monthPayments = payments[year][month];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
        <CardDescription>
          {monthPayments.length} payments have been made this month.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-8">
          {monthPayments.map((payments) => (
            <div className="flex items-center" key={payments.id}>
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>{payments.unit.unit_name}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {payments.tenant?.user.first_name}{" "}
                  {payments.tenant?.user.last_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {payments.payment_method}
                </p>
              </div>
              <div className="ml-auto font-medium">
                +KSh {payments.payment_amount}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPayments;

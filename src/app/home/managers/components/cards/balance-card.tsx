import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllUnits } from "@/lib/data-fetching/fetch-units";
import { Unit } from "@/types/property";

const BalanceCard = async () => {
  const unitsData: Promise<Unit[]> = getAllUnits();
  const units = await unitsData;

  const balance = units.reduce(
    (accumulator, unit) => accumulator + unit.balance,
    0
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Unpaid Balance</CardTitle>
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
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">KSh{balance}</div>
        <p className="text-xs text-muted-foreground">+201 from last month</p>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;

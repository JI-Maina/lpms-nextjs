import UnitEditDialog from "./unit-edit-dialog";
import AddTenantDialog from "./add-tenant-dialog";
import UnitDeleteDialog from "./unit-delete-dialog";
import { Separator } from "@/components/ui/separator";
import RemoveTenantDialog from "./remove-tenant-dialog";
import { MeterReading, Tenant, Unit, UnitInput } from "@/types/property";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddMeterReading from "./add-meter-reading";

type UnitProps = { unit: Unit; tenants: Tenant[]; meterReading: MeterReading };

const UnitCard = async ({ unit, tenants, meterReading }: UnitProps) => {
  const firstName = unit.tenant?.user.first_name;
  const lastName = unit.tenant?.user.last_name;
  const tenant = `${firstName} ${lastName}`;

  const dateObject = new Date(meterReading?.reading_date);
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // console.log(formattedDate);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-3xl">
          {unit.unit_name} - {unit.unit_type}
        </CardTitle>

        <div className="flex items-center justify-end gap-2">
          <UnitEditDialog unit={unit} />
          <UnitDeleteDialog unit={unit} />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-3 gap-4">
        <div className="flex-1 grid gap-4">
          <DetailsCard event="size" detail={unit.unit_size} />
          <DetailsCard event="deposit" detail={unit.unit_deposit} />
          <DetailsCard event="rent" detail={unit.unit_rent} />

          {unit.is_rent_paid && unit.tenant ? (
            <DetailsCard event="payment" detail="Paid" />
          ) : (
            <DetailsCard event="balance" detail={unit.balance} />
          )}

          {unit.tenant ? (
            <DetailsCard event="tenant" detail={tenant} />
          ) : (
            <div className="flex items-center justify-center bg-accent border mt-3 px-1">
              <h1 className="font-semibold text-center">Vacant</h1>
            </div>
          )}

          <DetailsCard
            event={`Meter reading as at ${formattedDate}`}
            detail={meterReading.meter_reading}
          />
        </div>

        {/* <Separator /> */}

        <CardFooter className="flex items-center md:justify-end justify-between mt-2 gap-3 p-0">
          {!unit.tenant ? (
            <AddTenantDialog unit={unit as UnitInput} tenants={tenants} />
          ) : (
            <RemoveTenantDialog unit={unit} />
          )}

          <AddMeterReading unit={unit as UnitInput} />
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default UnitCard;

const DetailsCard = ({ event, detail }: { event: any; detail: any }) => {
  return (
    <div className="flex items-center justify-between border mb-3 p-2">
      <h1 className="font-semibold text-muted-foreground capitalize">
        {event}:
      </h1>
      <h1 className="">{detail}</h1>
    </div>
  );
};

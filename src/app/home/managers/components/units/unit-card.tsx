import Image from "next/image";

import UnitEditDialog from "./unit-edit-dialog";
import AddTenantDialog from "./add-tenant-dialog";
import UnitDeleteDialog from "./unit-delete-dialog";
import { Separator } from "@/components/ui/separator";
import RemoveTenantDialog from "./remove-tenant-dialog";
import { Tenant, Unit, UnitInput } from "@/types/property";
import { getAllTenants } from "@/lib/data-fetching/fetch-tenants";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UnitCard = async ({ unit }: { unit: Unit }) => {
  const tenantData: Promise<Tenant[]> = getAllTenants();
  const tenants = await tenantData;

  const firstName = unit.tenant?.user.first_name;
  const lastName = unit.tenant?.user.last_name;
  const tenant = `${firstName} ${lastName}`;

  // console.log(tenant);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {unit.unit_name} - {unit.unit_type}
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col p-3 gap-1">
        <div className="flex-1 rounded-md">
          <Image
            src="/empty-unit.jpg"
            alt={unit.unit_name}
            width={500}
            height={500}
            priority
          />
        </div>

        <div className="flex-1 grid p-2 px-0">
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
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex items-center justify-end gap-1 p-2">
        {!unit.tenant ? (
          <AddTenantDialog unit={unit as UnitInput} tenants={tenants} />
        ) : (
          <RemoveTenantDialog unit={unit} />
        )}

        <UnitEditDialog unit={unit} />
        <UnitDeleteDialog unit={unit} />
      </CardFooter>
    </Card>
  );
};

export default UnitCard;

const DetailsCard = ({ event, detail }: { event: any; detail: any }) => {
  return (
    <div className="flex items-center justify-between border mb-1 px-1">
      <h1 className="font-semibold text-muted-foreground capitalize">
        {event}:
      </h1>
      <h1 className="">{detail}</h1>
    </div>
  );
};

import { getUnit } from "@/lib/data-fetching/fetch-units";
import UnitCard from "@/components/managers/units/unit-card";
import { MeterReading, Tenant, Unit } from "@/types/property";
import { getAllTenants } from "@/lib/data-fetching/fetch-tenants";
import { getMeterReading } from "@/lib/data-fetching/fetch-meter-readings";

type Params = {
  params: {
    unitId: string;
  };
};

const SingleUnit = async ({ params: { unitId } }: Params) => {
  const unitData: Promise<Unit> = getUnit(unitId);
  const unit = await unitData;

  const tenantData: Promise<Tenant[]> = getAllTenants();
  const tenants = await tenantData;

  const meterReadingsData: Promise<MeterReading[]> = await getMeterReading(
    unit.property,
    unit.id.toString()
  );
  const meterReading = await meterReadingsData;

  return (
    <main>
      <div className="h-36 bg-property bg-no-repeat bg-cover bg-center bg-opacity-0"></div>

      <section className="mt-4">
        <UnitCard
          unit={unit}
          tenants={tenants}
          meterReading={meterReading[meterReading.length - 1]}
        />
      </section>
    </main>
  );
};

export default SingleUnit;

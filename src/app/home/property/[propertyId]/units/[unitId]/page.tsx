import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getServerSession } from "next-auth";

import UnitCard from "../../../components/unit-card";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Unit } from "@/types/property";

type Params = {
  params: {
    propertyId: string;
    unitId: string;
  };
};

const getUnit = async (propertyId: string, unitId: string) => {
  const session = await getServerSession(authOptions);

  const res = await fetch(`http://127.0.0.1:8000/property/units/${unitId}/`, {
    headers: { Authorization: `Bearer ${session?.access_token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch unit");

  return res.json();
};

const UnitPage = async (params: Params) => {
  const { propertyId, unitId } = params.params;
  const unitData: Promise<Unit> = getUnit(propertyId, unitId);
  const unit = await unitData;

  return (
    <main>
      <section className="flex flex-col lg:flex-row gap-4 md:pt-4">
        <div className="flex-1 w-full md:max-w-[400px] md:mx-auto">
          <UnitCard unit={unit} />
        </div>

        {/* <div className="flex-1 w-full md:max-w-[400px] md:mx-auto">
          <Tabs defaultValue="payment" className=" ">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="payment">Make payment</TabsTrigger>
              <TabsTrigger value="maintenance">Create maintenance</TabsTrigger>
            </TabsList>

            <TabsContent value="payment">
              <UnitPaymentForm unit={unit} />
            </TabsContent>
            <TabsContent value="maintenance">
              <UnitMaintenanceForm unit={unit} />
            </TabsContent>
          </Tabs>
        </div> */}
      </section>
    </main>
  );
};

export default UnitPage;

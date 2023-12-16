import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";
import React from "react";
import UnitCard from "../components/unit-card";

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
  const unitData = getUnit(propertyId, unitId);
  const unit = await unitData;

  console.log(typeof propertyId);
  console.log(typeof unitId);

  return (
    <main>
      <Tabs defaultValue="unit" className="w-full">
        <TabsList>
          <TabsTrigger value="unit">Unit</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="unit">
          <UnitCard unit={unit} />
        </TabsContent>
        <TabsContent value="payment">payment</TabsContent>
        <TabsContent value="maintenance">maintenance</TabsContent>
      </Tabs>
    </main>
  );
};

export default UnitPage;

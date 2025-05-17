import { Suspense } from "react";

import Loading from "../loading";
import { Caretaker, Property } from "../../../../types/property";
import { getAllProperties } from "@/lib/data-fetching/fetch-property";
import { getAllCaretakers } from "@/lib/data-fetching/fetch-caretakers";
import PropertyDetailsPage from "@/components/managers/property/property-details-page";

const PropertyPage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const caretakersData: Promise<Caretaker[]> = getAllCaretakers();

  const properties = await propertyData;
  const caretakers = await caretakersData;

  console.log(caretakers);
  console.log(properties);

  return (
    <Suspense fallback={<Loading />}>
      <PropertyDetailsPage properties={properties} caretakers={caretakers} />
    </Suspense>
  );
};

export default PropertyPage;

"use client";

import { useState } from "react";

import { Caretaker, Property } from "@/types/property";
import PropertiesHeader from "../shared/properties-header";
import PropertyCard from "./property-card";
import { CreatePropertyDialog } from "./create-property-dialog";
import { useSession } from "next-auth/react";

type DetailsProps = {
  properties: Property[];
  caretakers: Caretaker[];
};

const PropertyDetailsPage = ({ properties, caretakers }: DetailsProps) => {
  const [id, setId] = useState(properties[0]?.id);
  const { data: session } = useSession();

  const property = properties.find((property) => property.id === id);

  const onChange = (value: string) => {
    setId(value);
  };

  return (
    <main className="flex flex-col gap-2">
      <PropertiesHeader
        properties={properties}
        onChange={onChange}
        dialog={session?.user.userRole === "owner" && <CreatePropertyDialog />}
      />

      {property ? (
        <PropertyCard property={property as Property} caretakers={caretakers} />
      ) : (
        <div className="flex justify-center items-center pt-[200px] text-3xl">
          No property to display
        </div>
      )}
    </main>
  );
};

export default PropertyDetailsPage;

"use client";

import { useEffect, useState } from "react";

import { Caretaker, Property } from "../../../../types/property";
import PropertiesHeader from "../shared/properties-header";
import PropertyCard from "./property-card";
import { CreatePropertyDialog } from "./create-property-dialog";
import { getUserRole } from "@/actions/actions";

type DetailsProps = {
  properties: Property[];
  caretakers: Caretaker[];
};

const PropertyDetailsPage = ({ properties, caretakers }: DetailsProps) => {
  const [id, setId] = useState(properties[0]?.id);
  const [userRole, setUserRole] = useState("");

  const property = properties.find((property) => property.id === id);

  const onChange = (value: string) => {
    setId(value);
  };

  useEffect(() => {
    const getRole = async () => {
      const role = await getUserRole();
      setUserRole(role as string);
    };

    getRole();
  }, []);

  return (
    <main className="flex flex-col gap-2">
      <PropertiesHeader
        properties={properties}
        onChange={onChange}
        dialog={userRole === "owner" && <CreatePropertyDialog />}
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

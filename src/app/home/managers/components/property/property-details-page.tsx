"use client";

import { useState } from "react";

import { Caretaker, Property } from "@/types/property";
import PropertiesHeader from "./properties-header";
import PropertyCard from "./property-card";

type DetailsProps = {
  properties: Property[];
  caretakers: Caretaker[];
};

const PropertyDetailsPage = ({ properties, caretakers }: DetailsProps) => {
  const [id, setId] = useState(properties[0]?.id);

  const property = properties.find((property) => property.id === id);

  const onChange = (value: string) => {
    setId(value);
  };

  return (
    <main className="flex flex-col gap-2">
      <PropertiesHeader properties={properties} onChange={onChange} />

      <PropertyCard property={property as Property} caretakers={caretakers} />
    </main>
  );
};

export default PropertyDetailsPage;

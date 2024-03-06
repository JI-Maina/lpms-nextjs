"use client";

import { useEffect, useState } from "react";

import { columns } from "./columns";
import UnitsHeader from "./units-header";
import { UnitsTable } from "./units-table";
import { Property, Unit } from "@/types/property";
import SelectProperty from "../shared/select-property";

type SelectProps = {
  properties: Property[];
};

const PropertyUnits = ({ properties }: SelectProps) => {
  const [id, setId] = useState(properties[0]?.id);
  const [units, setUnits] = useState<Unit[] | undefined>([]);

  const handleSelectChange = (value: string) => {
    setId(value);
  };

  const property = properties.find((property) => property.id === id);

  useEffect(() => {
    setUnits(property?.unit_set);
  }, [property]);

  return (
    <main>
      {property && (
        <div className="flex gap-3 flex-col md:flex-row">
          {properties.length > 1 && (
            <SelectProperty
              properties={properties}
              onChange={handleSelectChange}
            />
          )}

          <div className="md:w-full">
            <UnitsHeader property={property} />
          </div>
        </div>
      )}

      <div className="max-w-[360px] sm:max-w-full">
        <UnitsTable
          data={units as Unit[]}
          columns={columns}
          propertyId={property?.id}
        />
      </div>
    </main>
  );
};

export default PropertyUnits;

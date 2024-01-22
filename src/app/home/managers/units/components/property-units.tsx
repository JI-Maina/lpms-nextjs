"use client";

import { useState } from "react";

import UnitsHeader from "./units-header";
import { Property } from "@/types/property";
import { columns } from "./columns";
import { UnitsTable } from "../../property/components/unit-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectProps = {
  properties: Property[];
};

const PropertyUnits = ({ properties }: SelectProps) => {
  const [id, setId] = useState(properties[0].id);

  const handleSelectChange = (value: string) => {
    setId(value);
  };

  const property = properties.find((property) => property.id === id);
  const units = property?.unit_set;

  return (
    <main>
      <div className="flex gap-3 flex-col md:flex-row">
        <div className="md:w-1/4 flex justify-center items-center border rounded-sm p-2">
          <div className="w-full space-y-4">
            <p>Filter property</p>
            <Select
              onValueChange={handleSelectChange}
              defaultValue={properties[0].id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a property" />
              </SelectTrigger>

              <SelectContent>
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.property_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="md:w-3/4">
          {property && <UnitsHeader property={property} />}
        </div>
      </div>

      <div className="max-w-[360px] sm:max-w-full">
        {units && (
          <UnitsTable data={units} columns={columns} propertyId={property.id} />
        )}
      </div>
    </main>
  );
};

export default PropertyUnits;

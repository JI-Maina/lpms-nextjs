"use client";

import { useState } from "react";

import { columns } from "./columns";
import { Property } from "@/types/property";
import { TenantsTable } from "./tenants-table";
import CreateTenantSheet from "./create-tenant-sheet";
import SelectPropertyHeader from "../shared/select-property-header";

type TenantsProps = {
  properties: Property[];
};

const PropertyTenants = ({ properties }: TenantsProps) => {
  const [id, setId] = useState(properties[0]?.id);

  const property = properties.find((property) => property.id === id);
  const units = property?.unit_set;
  const tenants = units
    ?.filter((unit) => unit.tenant)
    .map((unit) => unit.tenant);

  const onChange = (value: string) => {
    setId(value);
  };

  return (
    <main>
      <SelectPropertyHeader
        id={id}
        title="Tenants Data"
        properties={properties}
        onChange={onChange}
        actionModal={units && <CreateTenantSheet />}
      />

      <div className="max-w-[360px] sm:max-w-full">
        {tenants && <TenantsTable data={tenants} columns={columns} />}
      </div>
    </main>
  );
};

export default PropertyTenants;

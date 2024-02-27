"use client";

import { useEffect, useState } from "react";

import { columns } from "./columns";
import { Maintenance, Property } from "@/types/property";
import { MaintenancesTable } from "./maintenances-table";
import AddUnitMaintenanceModal from "./add-unit-maintenance-modal";
import PropertyDetailsHeader from "../shared/property-details-header";

type MaintenanceProps = {
  properties: Property[];
};

const PropertyMaintenances = ({ properties }: MaintenanceProps) => {
  const [id, setId] = useState(properties[0]?.id);
  const [maintenaces, setMaintenances] = useState([]);

  const property = properties.find((property) => property.id === id);
  const units = property?.unit_set;

  const onChange = (value: string) => {
    setId(value);
  };

  useEffect(() => {
    const getMaintenances = async () => {
      const res = await fetch(`/api/maintenances/${id}/`);
      const data = await res.json();
      setMaintenances(data);
    };

    if (id) getMaintenances();
  }, [id, properties]);

  const year = new Date().getFullYear();
  let recentMaintenances: Maintenance[] = [];

  if (year in maintenaces) {
    const keys = Object.keys(maintenaces[year]);
    recentMaintenances = maintenaces[year][keys[keys.length - 1]];
  } else if (year - 1 in maintenaces) {
    const keys = Object.keys(maintenaces[year - 1]);
    recentMaintenances = maintenaces[year - 1][keys[keys.length - 1]];
  }

  return (
    <main>
      <PropertyDetailsHeader
        id={id}
        title="Maintenances Data"
        properties={properties}
        onChange={onChange}
        actionModal={units && <AddUnitMaintenanceModal units={units} />}
      />

      <div className="max-w-[360px] sm:max-w-full">
        <MaintenancesTable data={recentMaintenances} columns={columns} />
      </div>
    </main>
  );
};

export default PropertyMaintenances;

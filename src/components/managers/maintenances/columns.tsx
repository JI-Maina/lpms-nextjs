"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Maintenance } from "../../../../types/property";
import { EditMaintenanceModal } from "./edit-maintenance-modal";
import { DeleteMaintenanceModal } from "./delete-maintenance-modal";

export const columns: ColumnDef<Maintenance>[] = [
  {
    accessorKey: "maintenance_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Maintenance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    // cell: ({ row }) => {
    //   const maintenance = row.original;

    //   <div>{maintenance.description}</div>;
    // },
  },
  {
    accessorKey: "maintenance_date",
    header: "Date",
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => {
      const maintenance = row.original;

      return <div>{maintenance.unit.unit_name}</div>;
    },
  },
  {
    accessorKey: "maintenance_status",
    header: "Status",
    cell: ({ row }) => {
      const maintenance = row.original;
      const status = maintenance.maintenance_status;

      return (
        <div className={status === "Done" ? "text-green-400" : ""}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "maintenance_fee",
    header: "Amount",
  },

  {
    accessorKey: "actions",
    cell: ({ row }) => {
      const maintenance = row.original;

      return (
        <div className="flex gap-2">
          <EditMaintenanceModal maintenance={maintenance} />
          <DeleteMaintenanceModal maintenance={maintenance} />
        </div>
      );
    },
  },
];

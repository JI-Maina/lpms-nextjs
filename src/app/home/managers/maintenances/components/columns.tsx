"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Maintenance } from "@/types/property";

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
    accessorKey: "maintenance_date",
    header: "Date",
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => {
      const payment = row.original;

      return <div>{payment.unit.unit_name}</div>;
    },
  },
  {
    accessorKey: "maintenance_fee",
    header: "Amount",
  },
  // {
  //   accessorKey: "actions",
  //   cell: ({ row }) => {
  //     const tenant = row.original;

  //     return <DeleteTenantModal tenant={tenant} />;
  //   },
  // },
];

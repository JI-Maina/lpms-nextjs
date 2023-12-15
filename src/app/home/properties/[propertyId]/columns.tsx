"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import UnitDeleteDialog from "../components/unit-delete-dialog";
import UnitEditDialog from "../components/unit-edit-dialog";

// status: "pending" | "processing" | "success" | "failed";

export const columns: ColumnDef<Unit>[] = [
  {
    accessorKey: "unit_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "unit_type",
    header: "Type",
  },
  {
    accessorKey: "unit_rent",
    header: "Rent",
    // cell: ({ row }) => {
    //   const amount = parseFloat(row.getValue("unit_rent"));
    //   const formatted = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "KES",
    //   }).format(amount);

    //   return <div className="font-medium">{formatted}</div>;
    // },
  },
  {
    accessorKey: "tenant",
    header: "Tenant",
  },
  {
    accessorKey: "is_rent_paid",
    header: "Payment",
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("balance"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const unit = row.original;

      return (
        <div className="flex items-center justify-center gap-2">
          <UnitEditDialog unit={unit} />
          <UnitDeleteDialog unit={unit} />
        </div>
      );
    },
  },
];

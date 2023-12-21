"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import UnitDeleteDialog from "../../units/components/unit-delete-dialog";
import UnitEditDialog from "../../units/components/unit-edit-dialog";

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
    accessorKey: "tenant",
    header: "Tenant",
    cell: ({ row }) => {
      const unit = row.original;

      return (
        <div>
          {unit.tenant ? (
            <p>
              {unit.tenant?.user.first_name} {unit.tenant?.user.last_name}
            </p>
          ) : (
            "Vacant"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "unit_rent",
    header: "Rent",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("unit_rent"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "is_rent_paid",
    header: "Paid",
    cell: ({ row }) => {
      const unit = row.original;

      return (
        <>
          {unit.is_rent_paid ? (
            <Check color="#0ef11d" className="h-4 w-4" />
          ) : (
            <X color="#f10e0e" className="h-4 w-4" />
          )}
        </>
      );
    },
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const unit = row.original;

  //     return (
  //       <div className="flex items-center justify-center gap-2">
  //         <UnitEditDialog unit={unit} />
  //         <UnitDeleteDialog unit={unit} />
  //       </div>
  //     );
  //   },
  // },
];
